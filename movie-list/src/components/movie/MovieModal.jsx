import { useState, useEffect } from 'react'
import { X, Play, Plus, Check, ThumbsUp, ThumbsDown, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSelector, useDispatch } from 'react-redux'
import { addToMyList, removeFromMyList } from '@/reducers/myListReducer'
import { OMDB_API_KEY, OMDB_BASE_URL } from '@/api/config'

const MovieModal = ({ movie, isOpen, onClose }) => {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [addedAnimation, setAddedAnimation] = useState(false)
  const dispatch = useDispatch()
  const myList = useSelector((state) => state.myList.movies)

  const isInMyList = movie ? myList.some(m => m.id === movie.id) : false

  useEffect(() => {
    const fetchDetails = async () => {
      if (!movie?.id) return

      setLoading(true)
      setDetails(null)
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

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleMyListToggle = () => {
    if (!movie) return

    const title = details?.Title || movie?.title || movie?.originalTitleText?.text
    const posterUrl = details?.Poster || movie?.poster || movie?.primaryImage?.url
    const year = details?.Year || movie?.year || movie?.releaseYear?.year

    if (isInMyList) {
      dispatch(removeFromMyList(movie.id))
    } else {
      dispatch(addToMyList({
        id: movie.id,
        title: title,
        poster: posterUrl,
        year: year,
        plot: details?.Plot,
        rating: details?.imdbRating,
      }))
      // Show added animation
      setAddedAnimation(true)
      setTimeout(() => setAddedAnimation(false), 1500)
    }
  }

  if (!isOpen) return null

  const posterUrl = details?.Poster || movie?.poster || movie?.primaryImage?.url
  const title = details?.Title || movie?.title || movie?.originalTitleText?.text

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-12 md:pt-16">
        <div className="relative w-full max-w-4xl bg-netflix-gray-dark rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-netflix-black/80 rounded-full hover:bg-netflix-black transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Hero Image */}
          <div className="relative h-[35vh] md:h-[50vh]">
            {posterUrl && posterUrl !== 'N/A' ? (
              <img
                src={posterUrl.replace('SX300', 'SX1200')}
                alt={title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-netflix-gray-medium flex items-center justify-center">
                <span className="text-4xl text-netflix-gray-light">{title?.[0]}</span>
              </div>
            )}

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-gray-dark via-netflix-gray-dark/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-netflix-gray-dark/60 via-transparent to-transparent" />

            {/* Title and buttons */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-shadow drop-shadow-lg">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="netflix" size="lg" className="gap-2 font-semibold">
                  <Play className="h-5 w-5 fill-current" />
                  Play
                </Button>

                {/* Add to My List Button - More prominent */}
                <Button
                  variant={isInMyList ? "default" : "netflixSecondary"}
                  size="lg"
                  className={`gap-2 transition-all duration-300 ${
                    isInMyList
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : ''
                  } ${addedAnimation ? 'scale-110' : ''}`}
                  onClick={handleMyListToggle}
                >
                  {isInMyList ? (
                    <>
                      <Check className="h-5 w-5" />
                      In My List
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Add to My List
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/50 hover:border-white hover:bg-white/10 h-11 w-11"
                >
                  <ThumbsUp className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/50 hover:border-white hover:bg-white/10 h-11 w-11"
                >
                  <ThumbsDown className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Added to list notification */}
            {addedAnimation && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-top duration-300">
                Added to My List!
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 bg-netflix-gray-medium rounded w-16" />
                  <div className="h-6 bg-netflix-gray-medium rounded w-12" />
                  <div className="h-6 bg-netflix-gray-medium rounded w-20" />
                </div>
                <div className="h-24 bg-netflix-gray-medium rounded" />
                <div className="h-4 bg-netflix-gray-medium rounded w-3/4" />
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {/* Left column - Main info */}
                <div className="md:col-span-2 space-y-4">
                  {/* Metadata row */}
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {details?.imdbRating && details.imdbRating !== 'N/A' && (
                      <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                        <Star className="h-4 w-4 fill-current" />
                        {details.imdbRating}/10
                      </span>
                    )}
                    {details?.Year && (
                      <span className="text-white">{details.Year}</span>
                    )}
                    {details?.Runtime && details.Runtime !== 'N/A' && (
                      <span className="text-netflix-gray-light">{details.Runtime}</span>
                    )}
                    {details?.Rated && details.Rated !== 'N/A' && (
                      <span className="border border-netflix-gray-light px-2 py-0.5 text-xs rounded">
                        {details.Rated}
                      </span>
                    )}
                  </div>

                  {/* Plot */}
                  {details?.Plot && details.Plot !== 'N/A' && (
                    <p className="text-white/90 leading-relaxed text-base">
                      {details.Plot}
                    </p>
                  )}

                  {/* Genre tags */}
                  {details?.Genre && details.Genre !== 'N/A' && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {details.Genre.split(', ').map((genre) => (
                        <span
                          key={genre}
                          className="bg-netflix-gray-medium px-3 py-1 rounded-full text-sm text-netflix-gray-light"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right column - Details */}
                <div className="space-y-3 text-sm border-t md:border-t-0 md:border-l border-netflix-gray-medium pt-4 md:pt-0 md:pl-6">
                  {details?.Director && details.Director !== 'N/A' && (
                    <div>
                      <span className="text-netflix-gray-light block text-xs uppercase tracking-wide mb-1">Director</span>
                      <span className="text-white">{details.Director}</span>
                    </div>
                  )}
                  {details?.Actors && details.Actors !== 'N/A' && (
                    <div>
                      <span className="text-netflix-gray-light block text-xs uppercase tracking-wide mb-1">Cast</span>
                      <span className="text-white">{details.Actors}</span>
                    </div>
                  )}
                  {details?.Writer && details.Writer !== 'N/A' && (
                    <div>
                      <span className="text-netflix-gray-light block text-xs uppercase tracking-wide mb-1">Writers</span>
                      <span className="text-white">{details.Writer}</span>
                    </div>
                  )}
                  {details?.Awards && details.Awards !== 'N/A' && (
                    <div>
                      <span className="text-netflix-gray-light block text-xs uppercase tracking-wide mb-1">Awards</span>
                      <span className="text-yellow-500">{details.Awards}</span>
                    </div>
                  )}
                  {details?.BoxOffice && details.BoxOffice !== 'N/A' && (
                    <div>
                      <span className="text-netflix-gray-light block text-xs uppercase tracking-wide mb-1">Box Office</span>
                      <span className="text-green-500 font-semibold">{details.BoxOffice}</span>
                    </div>
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
