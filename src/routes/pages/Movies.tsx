import { Link, Outlet } from 'react-router-dom'
import { useMovieStore } from '@/stores/movie'

export default function Movies() {
  const movies = useMovieStore(state => state.movies)
  const searchText = useMovieStore(state => state.searchText)
  const setSearchText = useMovieStore(state => state.setSearchText)
  const fetchMovies = useMovieStore(state => state.fetchMovies)

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
