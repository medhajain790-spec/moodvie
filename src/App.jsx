import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppContext } from './AppContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Movies from './pages/Movies'
import Search from './pages/Search'
import Watchlist from './pages/Watchlist'

function App() {
  const { darkMode, toggleDarkMode } = useAppContext()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <div className="flex">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App