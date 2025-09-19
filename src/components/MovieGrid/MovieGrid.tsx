import type { Movie } from "../../types/movie"
import css from './MovieGrid.module.css'
interface MovieGridProps{
    onSelect: (movie: Movie) => void,
    movies: Movie[]
}

const MovieGrid = ({movies, onSelect}: MovieGridProps) => {
    return <ul className={css.grid}>
  {/* Набір елементів списку з фільмами */}
        {movies.map((movie) => (<li key={movie.id}> 
            <div className={css.card} onClick={() => onSelect(movie)}>
                <img
                    className={css.image}
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.overview}
                    loading="lazy"
                />
                <h2 className={css.title}>{movie.title}</h2>
            </div>
        </li>))}
</ul>
}

export default MovieGrid