import React, { useEffect, useState } from "react";

import { json, useLoaderData } from "react-router-dom";
import PreShow from "../components/PreShow";
import MovieCard from "../components/MovieCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Popular = () => {
  const movies = useLoaderData();
  const [relatedMoives, setRelatedMovies] = useState([]);
  useEffect(() => {
    getRelatedMovies();
  }, []);

  const getRelatedMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    );
    const data = await response.json();
    setRelatedMovies(data.results);
  };

  return (
    <section>
      {relatedMoives.length > 0 && (
        <>
          <div className='main-banner'>
            <Splide
              options={{
                type: "loop",
                arrows: true,
                autoplay: true,
                interval: 2000,
              }}>
              {relatedMoives.map((movie) => {
                return (
                  <SplideSlide key={movie.id}>
                    <PreShow movie={movie} />
                  </SplideSlide>
                );
              })}
            </Splide>
          </div>

          <div className='movie-card-ctr'>
            {movies.results.length > 0 &&
              movies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Popular;

export const loader = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODJkZDAyZjJjZjJhNzA4NzViOTU4Y2M5YmFmZDUzZiIsInN1YiI6IjY1ZjI5NDQzNWE3ODg0MDE4NmQ3ZDc1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zl8rVoXs1sHKEbafHVhNrG9t9Nu60mcsjMxl67VAA-I",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US",
    options
  );
  if (!response.ok) {
    throw json(
      { message: "Can't get popular movies. comeback soon..." },
      {
        status: 500,
        statusText:
          "Sorry, we couldn't retrieve the list of popular movies at the moment. Please check back soon or try again later. We're working to resolve this issue.",
      }
    );
  } else {
    const movies = await response.json();
    return movies;
  }
};
