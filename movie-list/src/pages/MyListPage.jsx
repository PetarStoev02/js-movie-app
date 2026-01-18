import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { removeFromMyList } from '@/reducers/myListReducer'
import MovieModal from '@/components/movie/MovieModal'

const MyListPage = () => {
  const dispatch = useDispatch()
  const myList = useSelector((state) => state.myList.movies)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const handleRemove = (e, movieId) => {
    e.stopPropagation()
    dispatch(removeFromMyList(movieId))
  }

  return (
    <div className="min-h-screen bg-netflix-black pt-20 px-4 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">My List</h1>

      {myList.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-netflix-gray-light text-lg mb-4">
            Your list is empty
          </p>
          <p className="text-netflix-gray-light">
            Add movies to your list by clicking the + button on any movie.
          </p>
        </div>
      ) : (
        <>
          <p className="text-netflix-gray-light mb-6">
            {myList.length} {myList.length === 1 ? 'title' : 'titles'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myList.map((movie) => (
              <div
                key={movie.id}
                className="relative group cursor-pointer"
                onClick={() => handleMovieClick(movie)}
              >
                <div className="aspect-[2/3] rounded-md overflow-hidden bg-netflix-gray-dark">
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-center p-2">
                      <span className="text-sm text-netflix-gray-light">{movie.title}</span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="rounded-full"
                      onClick={(e) => handleRemove(e, movie.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <p className="mt-2 text-sm truncate">{movie.title}</p>
                <p className="text-xs text-netflix-gray-light">{movie.year}</p>
              </div>
            ))}
          </div>
        </>
      )}

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

export default MyListPage
