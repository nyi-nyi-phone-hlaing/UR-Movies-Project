import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const PopularPreshow = ({ movie }) => {
  return (
    <div className='pre-show'>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt=''
      />
      <div className='movie-cnt'>
        <div className='right'>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <Link to={`/movie-detail/${movie.id}`}>
            <button>
              <FaPlay /> Watch Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularPreshow;
