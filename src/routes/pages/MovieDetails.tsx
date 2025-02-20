import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from '@/components/Modal'

export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
export interface Rating {
  Source: string
  Value: string
}

export default function MovieDetails() {
  // console.log(params) // { movieId: 'tt084822' }
  const { movieId } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null) // 제네릭(Generic)
  // const [GETTER, SETTER] = useState()

  useEffect(() => {
    fetchMovie()
  }, [])

  async function fetchMovie() {
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${movieId}`)
    const movie = await res.json()
    setMovie(movie)
  }

  return (
    <Modal>
      <h1>Movie Details</h1>
      {movie && (
        <>
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} />
        </>
      )}
    </Modal>
  )
}
