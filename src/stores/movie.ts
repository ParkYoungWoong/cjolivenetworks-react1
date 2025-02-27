import { create } from 'zustand'
import { combine } from 'zustand/middleware'

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
      movies: [] as Movie[], // 타입 단언!
      searchText: '',
      isLoading: false
    },
    (set, get) => {
      return {
        setSearchText: (text: string) => {
          set({
            searchText: text
          })
        },
        fetchMovies: async () => {
          const { searchText, isLoading } = get()
          if (isLoading) return

          set({ isLoading: true })
          const res = await fetch(
            `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
          )
          const { Search } = await res.json()
          set({
            movies: Search,
            isLoading: false
          })
        }
      }
    }
  )
)

// 1)
// const state = get()
// set({ a: state.a + 1 })

// 2)
// set(state => ({ a: state.a + 1 }))
