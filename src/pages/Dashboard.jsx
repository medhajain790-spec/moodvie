import { useState, useEffect } from 'react'
import { getTrendingMovies, getTopRated, IMG_BASE_URL } from '../api'
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

function Dashboard() {
  const [trending, setTrending] = useState([])
  const [topRated, setTopRated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getTrendingMovies(), getTopRated()])
      .then(([trendRes, topRes]) => {
        setTrending(trendRes.data.results.slice(0, 6))
        setTopRated(topRes.data.results.slice(0, 5))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const ratingData = topRated.map((m) => ({
    name: m.title.slice(0, 15),
    rating: m.vote_average,
  }))

  const genreData = [
    { name: 'Action', value: 30 },
    { name: 'Drama', value: 25 },
    { name: 'Comedy', value: 20 },
    { name: 'Thriller', value: 15 },
    { name: 'Horror', value: 10 },
  ]

  if (loading) return <p className="p-6 text-gray-500 dark:text-gray-400">Loading dashboard...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🏠 Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Trending Movies', value: '20+', color: 'bg-red-500' },
          { label: 'Top Rated', value: '100+', color: 'bg-blue-500' },
          { label: 'Genres', value: '18', color: 'bg-green-500' },
          { label: 'New This Week', value: '10+', color: 'bg-yellow-500' },
        ].map((card) => (
          <div key={card.label} className={`${card.color} rounded-xl p-4 text-white`}>
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="text-sm mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
          <h3 className="text-gray-800 dark:text-white font-semibold mb-4">⭐ Top Rated Movies</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ratingData}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis domain={[8, 10]} tick={{ fill: '#9ca3af' }} />
              <Tooltip />
              <Bar dataKey="rating" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
          <h3 className="text-gray-800 dark:text-white font-semibold mb-4">🎭 Genre Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={genreData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {genreData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trending Movies */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">🔥 Trending This Week</h3>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {trending.map((movie) => (
          <div key={movie.id} className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow">
            <img
              src={`${IMG_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="text-gray-800 dark:text-white text-xs font-medium truncate">{movie.title}</p>
              <p className="text-yellow-500 text-xs">⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard