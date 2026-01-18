import { Play, Info, Plus, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useSelector, useDispatch } from 'react-redux'
import { addToMyList, removeFromMyList } from '@/reducers/myListReducer'

const HeroSection = ({ movie, onMoreInfo }) => {
  const dispatch = useDispatch()
  const myList = useSelector((state) => state.myList.movies)

  const isInMyList = movie ? myList.some(m => m.id === movie.id) : false

  const handleMyListToggle = () => {
    if (!movie) return

    if (isInMyList) {
      dispatch(removeFromMyList(movie.id))
    } else {
      dispatch(addToMyList({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        year: movie.year,
        plot: movie.plot,
        rating: movie.rating,
      }))
    }
  }

  if (!movie) {
    return (
      <div className="relative h-[56.25vw] max-h-[80vh] w-full bg-netflix-gray-dark">
        <div className="absolute bottom-[35%] left-4 md:left-12 space-y-4">
          <Skeleton className="h-12 w-64 md:w-96" />
          <Skeleton className="h-20 w-80 md:w-[500px]" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    )
  }

  // Use a larger poster or backdrop if available
  const backgroundImage = movie.poster && movie.poster !== 'N/A'
    ? movie.poster.replace('SX300', 'SX1200')
    : null

  return (
    <div className="relative h-[56.25vw] max-h-[80vh] w-full">
      {/* Background Image */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-netflix-gray-dark" />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-netflix-black/30 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-[25%] md:bottom-[35%] left-4 md:left-12 max-w-xl z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 text-shadow">
          {movie.title}
        </h1>

        {movie.year && (
          <div className="flex items-center gap-3 mb-3 text-sm md:text-base">
            {movie.rating && movie.rating !== 'N/A' && (
              <span className="text-green-500 font-semibold">{movie.rating}/10</span>
            )}
            <span className="text-netflix-gray-light">{movie.year}</span>
            {movie.runtime && movie.runtime !== 'N/A' && (
              <span className="text-netflix-gray-light">{movie.runtime}</span>
            )}
          </div>
        )}

        {movie.plot && movie.plot !== 'N/A' && (
          <p className="text-sm md:text-lg text-gray-200 mb-4 md:mb-6 line-clamp-3 text-shadow">
            {movie.plot}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button variant="netflix" size="lg" className="gap-2">
            <Play className="h-5 w-5 fill-current" />
            Play
          </Button>
          <Button
            variant="netflixSecondary"
            size="lg"
            className="gap-2"
            onClick={() => onMoreInfo?.(movie)}
          >
            <Info className="h-5 w-5" />
            More Info
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-white/50 hover:border-white bg-black/30"
            onClick={handleMyListToggle}
          >
            {isInMyList ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </Button>
        </div>

        {movie.genre && movie.genre !== 'N/A' && (
          <div className="mt-4 flex items-center gap-2 text-sm text-netflix-gray-light">
            <span>Genres:</span>
            <span className="text-white">{movie.genre}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection
