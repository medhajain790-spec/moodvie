import { useState } from 'react'
import { searchMovies, IMG_BASE_URL } from '../api'
import { useAppContext } from '../AppContext'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const { watchlist, addToWatchlist, removeFromWatchlist } = useAppContext()

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)
    if (value.length < 2) return
    setLoading(true)
    searchMovies(value)
      .then((res) => {
        setResults(res.data.results)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🔍 Search Movies</h2>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Type a movie name..."
        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white mb-6 outline-none"
      />
      {loading && <p className="text-gray-500 dark:text-gray-400">Searching...</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((movie) => (
          <div key={movie.id} className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow">
            {movie.poster_path ? (
              <img
                src={`${IMG_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
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
    </div>
  )
}

export default Search