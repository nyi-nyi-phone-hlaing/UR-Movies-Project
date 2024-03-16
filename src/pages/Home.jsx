import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import PreShow from "../components/PreShow";
import { json, useLoaderData } from "react-router-dom";

const Home = () => {
  const relatedMoives = useLoaderData();

  return (
    <section>
      {relatedMoives.length > 0 && (
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
      )}
    </section>
  );
};

export default Home;

export const loader = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
  );
  const data = await response.json();
  if (!response.ok) {
    throw json(
      { message: "Page Not Found!" },
      {
        status: 404,
        statusText:
          "We're sorry, but we're currently experiencing technical difficulties with our homepage. Our team has been notified and is working to resolve the issue as soon as possible. In the meantime, please try refreshing the page or check back later. We apologize for any inconvenience.",
      }
    );
  } else {
    return data.results;
  }
};
