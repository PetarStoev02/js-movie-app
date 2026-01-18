import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import HeroSection from '@/components/hero/HeroSection'
import MovieCarousel from '@/components/carousel/MovieCarousel'
import MovieModal from '@/components/movie/MovieModal'
import { fetchAllCategories, fetchMovieDetails, searchMovies, CATEGORY_NAMES } from '@/api/moviesAPI'

const HomePage = () => {
  const [categories, setCategories] = useState({})
  const [featured, setFeatured] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchQuery = useSelector((state) => state.searchQuery)
  const myList = useSelector((state) => state.myList.movies)

  // Fetch all categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true)
      try {
        const allCategories = await fetchAllCategories()
        setCategories(allCategories)

        // Pick a random movie for the hero section
        const allMovies = Object.values(allCategories).flat()
        if (allMovies.length > 0) {
          const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)]
          const details = await fetchMovieDetails(randomMovie.id)
          if (details) {
            setFeatured(details)
          }
        }
      } catch (error) {
        console.error('Error loading categories:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery && searchQuery.trim().length >= 2) {
        const results = await searchMovies(searchQuery)
        setSearchResults(results)
      } else {
        setSearchResults([])
      }
    }

    const debounceTimer = setTimeout(performSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const handleMoreInfo = (movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const isSearching = searchQuery && searchQuery.trim().length >= 2

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Section */}
      {!isSearching && (
        <HeroSection
          movie={featured}
          onMoreInfo={handleMoreInfo}
        />
      )}

      {/* Content - Offset to overlap hero slightly */}
      <div className={isSearching ? "pt-24" : "-mt-32 relative z-10"}>
        {/* Search Results */}
        {isSearching && (
          <div className="px-4 md:px-12 py-8">
            <h2 className="text-2xl font-semibold mb-6">
              Search results for "{searchQuery}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="cursor-pointer"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <div className="aspect-[2/3] rounded-md overflow-hidden bg-netflix-gray-dark">
                      {movie.poster ? (
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-center p-2">
                          <span className="text-sm text-netflix-gray-light">{movie.title}</span>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm truncate">{movie.title}</p>
                    <p className="text-xs text-netflix-gray-light">{movie.year}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-netflix-gray-light">No results found. Try a different search term.</p>
            )}
          </div>
        )}

        {/* Category Carousels */}
        {!isSearching && (
          <>
            {/* My List - Only show if user has items */}
            {myList.length > 0 && (
              <MovieCarousel
                title="My List"
                movies={myList}
                loading={false}
                onMovieClick={handleMovieClick}
              />
            )}

            {/* All Categories */}
            {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
              <MovieCarousel
                key={key}
                title={name}
                movies={categories[key] || []}
                loading={loading}
                onMovieClick={handleMovieClick}
              />
            ))}
          </>
        )}
      </div>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedMovie(null)
        }}
      />
    </div>
  )
}

export default HomePage
