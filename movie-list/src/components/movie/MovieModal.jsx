import { useState, useEffect } from 'react'
import { X, Play, Plus, Check, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSelector, useDispatch } from 'react-redux'
import { addToMyList, removeFromMyList } from '@/reducers/myListReducer'
import { OMDB_API_KEY, OMDB_BASE_URL } from '@/api/config'

const MovieModal = ({ movie, isOpen, onClose }) => {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const myList = useSelector((state) => state.myList.movies)

  const isInMyList = movie ? myList.some(m => m.id === movie.id) : false

  useEffect(() => {
    const fetchDetails = async () => {
      if (!movie?.id) return

      setLoading(true)
      try {
        const response = await fetch(
          `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${movie.id}&plot=full`
        )
        const data = await response.json()
        if (data.Response === 'True') {
          setDetails(data)
        }
      } catch (error) {
        console.error('Error fetching movie details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isOpen && movie) {
      fetchDetails()
    }
  }, [isOpen, movie])

  const handleMyListToggle = () => {
    if (!movie) return

    if (isInMyList) {
      dispatch(removeFromMyList(movie.id))
    } else {
      dispatch(addToMyList({
        id: movie.id,
        title: movie.title || movie.originalTitleText?.text,
        poster: movie.poster || movie.primaryImage?.url,
        year: movie.year || movie.releaseYear?.year,
      }))
    }
  }

  if (!isOpen) return null

  const posterUrl = details?.Poster || movie?.poster || movie?.primaryImage?.url
  const title = details?.Title || movie?.title || movie?.originalTitleText?.text

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16">
        <div className="relative w-full max-w-4xl bg-netflix-gray-dark rounded-lg overflow-hidden shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-netflix-gray-dark rounded-full hover:bg-netflix-gray-medium transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Hero Image */}
          <div className="relative h-[40vh] md:h-[50vh]">
            {posterUrl && posterUrl !== 'N/A' ? (
              <img
                src={posterUrl.replace('SX300', 'SX1200')}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-netflix-gray-medium" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-gray-dark via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-netflix-gray-dark/50 via-transparent to-transparent" />

            {/* Title and buttons */}
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-shadow">{title}</h1>
              <div className="flex flex-wrap gap-3">
                <Button variant="netflix" size="lg" className="gap-2">
                  <Play className="h-5 w-5 fill-current" />
                  Play
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/50 hover:border-white h-11 w-11"
                  onClick={handleMyListToggle}
                >
                  {isInMyList ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/50 hover:border-white h-11 w-11"
                >
                  <ThumbsUp className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/50 hover:border-white h-11 w-11"
                >
                  <ThumbsDown className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-netflix-gray-medium rounded w-1/4" />
                <div className="h-20 bg-netflix-gray-medium rounded" />
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left column - Main info */}
                <div className="md:col-span-2 space-y-4">
                  {/* Metadata row */}
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {details?.imdbRating && details.imdbRating !== 'N/A' && (
                      <span className="text-green-500 font-semibold">
                        {details.imdbRating}/10
                      </span>
                    )}
                    {details?.Year && (
                      <span className="text-netflix-gray-light">{details.Year}</span>
                    )}
                    {details?.Runtime && details.Runtime !== 'N/A' && (
                      <span className="text-netflix-gray-light">{details.Runtime}</span>
                    )}
                    {details?.Rated && details.Rated !== 'N/A' && (
                      <span className="border border-netflix-gray-light px-2 py-0.5 text-xs">
                        {details.Rated}
                      </span>
                    )}
                  </div>

                  {/* Plot */}
                  {details?.Plot && details.Plot !== 'N/A' && (
                    <p className="text-netflix-gray-light leading-relaxed">
                      {details.Plot}
                    </p>
                  )}
                </div>

                {/* Right column - Details */}
                <div className="space-y-4 text-sm">
                  {details?.Director && details.Director !== 'N/A' && (
                    <p>
                      <span className="text-netflix-gray-light">Director: </span>
                      <span>{details.Director}</span>
                    </p>
                  )}
                  {details?.Actors && details.Actors !== 'N/A' && (
                    <p>
                      <span className="text-netflix-gray-light">Cast: </span>
                      <span>{details.Actors}</span>
                    </p>
                  )}
                  {details?.Genre && details.Genre !== 'N/A' && (
                    <p>
                      <span className="text-netflix-gray-light">Genres: </span>
                      <span>{details.Genre}</span>
                    </p>
                  )}
                  {details?.Awards && details.Awards !== 'N/A' && (
                    <p>
                      <span className="text-netflix-gray-light">Awards: </span>
                      <span>{details.Awards}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
