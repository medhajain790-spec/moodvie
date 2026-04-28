import { useState, useEffect } from 'react'
import { getPopularMovies, IMG_BASE_URL } from '../api'
import { useAppContext } from '../AppContext'

function Movies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const { watchlist, addToWatchlist, removeFromWatchlist } = useAppContext()

  useEffect(() => {
    getPopularMovies()
      .then((res) => {
        setMovies(res.data.results)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🎥 Popular Movies</h2>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow">
              <img
                src={`${IMG_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-3">
                <h3 className="text-gray-800 dark:text-white font-semibold text-sm truncate">{movie.title}</h3>
                <p className="text-yellow-500 text-sm">⭐ {movie.vote_average.toFixed(1)}</p>
                <button
                  onClick={() =>
                    isInWatchlist(movie.id)
                      ? removeFromWatchlist(movie.id)
                      : addToWatchlist(movie)
                  }
                  className={`mt-2 w-full py-1 rounded-lg text-sm font-medium ${
                    isInWatchlist(movie.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {isInWatchlist(movie.id) ? '❌ Remove' : '❤️ Watchlist'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Movies