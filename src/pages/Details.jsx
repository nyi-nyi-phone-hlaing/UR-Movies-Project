import { useEffect, useState } from "react";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { Link, useLoaderData, json } from "react-router-dom";
import YouTube from "react-youtube";
import { FaXmark } from "react-icons/fa6";

const Details = () => {
  const [watch, setWatch] = useState(false);

  const opts = {
    playerVars: {
      width: "1033px",
      height: "700px",
      autoplay: 1,
      origin: "https://www.themoviedb.org",
      modestbranding: 1,
      fs: 1,
      autohide: 1,
    },
  };

  const movie = useLoaderData();

  const [video, setVideo] = useState();

  useEffect(() => {
    getVideo(movie.id);
  }, [movie.id]);

  const getVideo = async (mvId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${mvId}/videos?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODJkZDAyZjJjZjJhNzA4NzViOTU4Y2M5YmFmZDUzZiIsInN1YiI6IjY1ZjI5NDQzNWE3ODg0MDE4NmQ3ZDc1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zl8rVoXs1sHKEbafHVhNrG9t9Nu60mcsjMxl67VAA-I",
        },
      }
    );
    if (!response.ok) {
      return null;
    } else {
      const data = await response.json();
      setVideo(data.results[0]);
    }
  };

  return (
    <>
      {video === undefined && watch ? (
        <section className='youtube-frame'>
          <button
            className='close-watch'
            onClick={() => {
              setWatch(false);
            }}>
            <FaXmark />
          </button>
          <h1 className='notic-text'>Video is not available...</h1>
        </section>
      ) : (
        watch && (
          <section className='youtube-frame'>
            <button
              className='close-watch'
              onClick={() => {
                setWatch(false);
              }}>
              <FaXmark />
            </button>

            <YouTube className='yt-vd' videoId={video.key} opts={opts} />
          </section>
        )
      )}

      {movie && (
        <section className='detail-section'>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
          />
          <div className='detail-card'>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className='right'>
              <h1>{movie.title}</h1>
              <p>
                Release On - <span>{movie.release_date}</span>
              </p>
              <p>
                Runtime - <span>{movie.runtime}min</span>
              </p>
              <ul>
                {movie.genres &&
                  movie.genres.map((g) => <li key={g.id}>{g.name}</li>)}
              </ul>
              <h3>{movie.overview}</h3>
              <div className='btns'>
                <button
                  onClick={() => {
                    setWatch(true);
                  }}>
                  <FaPlay />
                  Watch Movie
                </button>
                <Link to={"/"}>
                  <button>
                    <FaArrowLeft />
                    Back To Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;

export const loader = async ({ request, params }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
  );
  if (!response.ok) {
    throw json(
      { message: "Error Getting Movie Details..." },
      {
        status: 500,
        statusText:
          "We apologize, but we're currently unable to fetch the upcoming movies. Please check back soon or try again later. Our team is working to fix this issue.",
      }
    );
  } else {
    const data = await response.json();
    return data;
  }
};
