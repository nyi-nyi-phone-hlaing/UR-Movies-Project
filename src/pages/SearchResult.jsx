import { FaArrowLeft } from "react-icons/fa";
import { json, Link, useLoaderData, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const SearchResult = () => {
  const { title } = useParams();
  const searchMovies = useLoaderData();

  return (
    <section className='search-section'>
      <header>
        <Link to={"/"}>
          <button>
            <FaArrowLeft />
          </button>
        </Link>
        <h1>Search results for "{title}"</h1>
      </header>
      <div className='movie-card-ctr'>
        {searchMovies.length === 0 ? (
          <p className='notic-text'>"{title}" is not avaliable now...</p>
        ) : (
          searchMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </section>
  );
};

export default SearchResult;

export const loader = async ({ request, params }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${params.title}&page=1&include_adult=true`
  );
  if (!response.ok) {
    throw json(
      { message: "Error Searching Movies..." },
      {
        status: 500,
        statusText:
          "We're sorry, but we encountered an error while searching for movies. Please try again with a different keyword or check your internet connection. If the problem persists, please try again later.",
      }
    );
  } else {
    const data = await response.json();
    return data.results;
  }
};
