import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  return (
    <div className='movie-card'>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
      />
      <Link to={`/movie-detail/${movie.id}`}>
        <button>
          <FaPlay />
        </button>
      </Link>
    </div>
  );
};

export default MovieCard;
