import { useState } from 'react'
import { Play, Plus, ThumbsUp, ChevronDown, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSelector, useDispatch } from 'react-redux'
import { addToMyList, removeFromMyList } from '@/reducers/myListReducer'

const MovieCard = ({ movie, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useDispatch()
  const myList = useSelector((state) => state.myList.movies)

  const isInMyList = myList.some(m => m.id === movie.id)

  const posterUrl = movie.primaryImage?.url || movie.poster
  const title = movie.originalTitleText?.text || movie.title
  const year = movie.releaseYear?.year || movie.year

  const handleMyListToggle = (e) => {
    e.stopPropagation()
    if (isInMyList) {
      dispatch(removeFromMyList(movie.id))
    } else {
      dispatch(addToMyList({
        id: movie.id,
        title: title,
        poster: posterUrl,
        year: year,
      }))
    }
  }

  const handleMoreInfo = (e) => {
    e.stopPropagation()
    onClick?.()
  }

  return (
    <div
      className="relative flex-shrink-0 w-[150px] md:w-[200px] cursor-pointer group/card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Card */}
      <div
        className={cn(
          "relative rounded-md overflow-hidden transition-all duration-300 ease-in-out",
          isHovered && "md:scale-125 md:z-50 md:shadow-2xl md:shadow-black/80"
        )}
        style={{
          transformOrigin: 'center center',
        }}
      >
        {/* Poster Image */}
        {posterUrl && posterUrl !== 'N/A' ? (
          <img
            src={posterUrl}
            alt={title}
            className="w-full aspect-[2/3] object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-netflix-gray-dark flex items-center justify-center">
            <span className="text-netflix-gray-light text-xs text-center px-2">
              {title}
            </span>
          </div>
        )}

        {/* Hover Content - Only on desktop */}
        <div
          className={cn(
            "hidden md:block absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Expanded Info Panel */}
        <div
          className={cn(
            "hidden md:block absolute left-0 right-0 bg-netflix-gray-dark transition-all duration-300 overflow-hidden",
            isHovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          )}
          style={{ bottom: 0, transform: 'translateY(100%)' }}
        >
          <div className="p-3">
            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2">
                <Button
                  size="iconSm"
                  className="rounded-full bg-white text-black hover:bg-white/80"
                >
                  <Play className="h-4 w-4 fill-current" />
                </Button>
                <Button
                  size="iconSm"
                  variant="outline"
                  className="rounded-full border-gray-400 hover:border-white"
                  onClick={handleMyListToggle}
                >
                  {isInMyList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </Button>
                <Button
                  size="iconSm"
                  variant="outline"
                  className="rounded-full border-gray-400 hover:border-white"
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="iconSm"
                variant="outline"
                className="rounded-full border-gray-400 hover:border-white"
                onClick={handleMoreInfo}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Movie Info */}
            <p className="text-sm font-semibold truncate">{title}</p>
            <div className="flex items-center gap-2 text-xs text-netflix-gray-light mt-1">
              {year && <span>{year}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile title - always visible */}
      <div className="md:hidden mt-2">
        <p className="text-xs text-netflix-gray-light truncate">{title}</p>
      </div>
    </div>
  )
}

export default MovieCard
