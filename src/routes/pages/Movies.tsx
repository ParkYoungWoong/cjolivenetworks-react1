import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useMovieStore } from '@/stores/movie'
import type { Movie } from '@/stores/movie'
import { useQuery } from '@tanstack/react-query'

export default function Movies() {
  const [inputText, setInputText] = useState('')
  // const movies = useMovieStore(state => state.movies)
  const searchText = useMovieStore(state => state.searchText)
  const setSearchText = useMovieStore(state => state.setSearchText)
  // const fetchMovies = useMovieStore(state => state.fetchMovies)

  // ['movies', 'abc']
  // ['movies', 'frozen']

  const { data: movies } = useQuery<Movie[]>({
    queryKey: ['movies', searchText],
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      return Search
    },
    staleTime: 1000 * 60 * 5 // 5분
  })

  function handleSearch() {
    setSearchText(inputText)
  }

  return (
    <>
      <h1>Movies Page!</h1>
      <div>
        <input
          value={inputText}
          onChange={e => setInputText(e.currentTarget.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <ul>
        {movies &&
          movies.map(movie => {
            return (
              <li key={movie.imdbID}>
                <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
              </li>
            )
          })}
      </ul>

      <Outlet />
    </>
  )
}

// Next.js
// 서버 컴포넌트 vs 클라이언트 컴포넌트

const obj = {
  a: 1,
  b: 2
}
console.log(obj.a) // 1

const { a } = obj
console.log(a) // 1

const { a: count } = obj
console.log(count) // 1
console.log(a) // undefined
