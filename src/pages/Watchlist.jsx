import { useAppContext } from '../AppContext'
import { IMG_BASE_URL } from '../api'

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useAppContext()

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">❤️ My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No movies added yet. Go to Movies and add some!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
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
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="mt-2 w-full py-1 rounded-lg text-sm font-medium bg-red-500 text-white"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist