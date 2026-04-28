import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-gray-100 dark:bg-gray-800 p-6 flex flex-col gap-4">
      <nav className="flex flex-col gap-3">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-medium text-lg"
        >
          🏠 Dashboard
        </Link>
        <Link
          to="/movies"
          className="text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-medium text-lg"
        >
          🎥 Movies
        </Link>
        <Link
          to="/search"
          className="text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-medium text-lg"
        >
          🔍 Search
        </Link>
        <Link
          to="/watchlist"
          className="text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 font-medium text-lg"
        >
          ❤️ Watchlist
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar