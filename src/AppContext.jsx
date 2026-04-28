import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const [watchlist, setWatchlist] = useState([])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const addToWatchlist = (movie) => {
    setWatchlist((prev) =>
      prev.find((m) => m.id === movie.id) ? prev : [...prev, movie]
    )
  }

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)