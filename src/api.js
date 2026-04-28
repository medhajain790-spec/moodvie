import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export const getTrendingMovies = () => api.get('/trending/movie/week')
export const getPopularMovies = () => api.get('/movie/popular')
export const searchMovies = (query) => api.get('/search/movie', { params: { query } })
export const getMovieDetails = (id) => api.get(`/movie/${id}`)
export const getTopRated = () => api.get('/movie/top_rated')

export default api