import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export type Movies = Movie[]
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const [searchText, setSearchText] = useState('') // 타입 추론!
  const [movies, setMovies] = useState<Movies>([])

  async function fetchMovies() {
    const res = await fetch(
      `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
    )
    const { Search } = await res.json()
    setMovies(Search)
  }

  return (
    <>
      <h1>Movies Page!</h1>
      <div>
        <input
          value={searchText}
          onChange={e => setSearchText(e.currentTarget.value)}
          onKeyDown={e => e.key === 'Enter' && fetchMovies()}
        />
        <button onClick={fetchMovies}>검색</button>
      </div>
      <ul>
        {movies.map(movie => {
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
