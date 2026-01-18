import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import MovieCard from '@/components/movie/MovieCard'
import { Skeleton } from '@/components/ui/skeleton'

const MovieCarousel = ({ title, movies, loading, onMovieClick }) => {
  const scrollRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const updateArrows = () => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [movies])

  const scroll = (direction) => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  if (loading) {
    return (
      <div className="px-4 md:px-12 mb-8">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="flex-shrink-0 w-[150px] md:w-[200px] aspect-[2/3]" />
          ))}
        </div>
      </div>
    )
  }

  if (!movies || movies.length === 0) return null

  return (
    <div
      className="relative group px-4 md:px-12 mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Title */}
      <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-white hover:text-netflix-gray-light transition-colors cursor-pointer">
        {title}
        <ChevronRight className={cn(
          "inline h-5 w-5 ml-1 transition-all duration-300",
          isHovered ? "opacity-100 translate-x-1" : "opacity-0 -translate-x-2"
        )} />
      </h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className={cn(
          "absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 h-[calc(100%-60px)] w-10 md:w-12 flex items-center justify-center bg-black/50 hover:bg-black/80 transition-all duration-300 rounded-r",
          showLeftArrow && isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-1 md:gap-2 overflow-x-scroll scrollbar-hide scroll-smooth pb-4"
        onScroll={updateArrows}
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id || index}
            movie={movie}
            onClick={() => onMovieClick?.(movie)}
          />
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className={cn(
          "absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 h-[calc(100%-60px)] w-10 md:w-12 flex items-center justify-center bg-black/50 hover:bg-black/80 transition-all duration-300 rounded-l",
          showRightArrow && isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </div>
  )
}

export default MovieCarousel
