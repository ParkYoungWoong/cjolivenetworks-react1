import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export type Movies = Movie[]
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const useMovieStore = create(
  combine(
    {
      searchText: '',
      movies: [] as Movies
    },
    (set, get) => ({
      setSearchText: (searchText: string) => set({ searchText }),
      fetchMovies: async () => {
        const { searchText } = get()
        const res = await fetch(
          `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
        )
        const { Search } = await res.json()
        set({ movies: Search })
      }
    })
  )
)
