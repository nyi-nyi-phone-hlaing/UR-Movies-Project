import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <section className='error-section'>
      <h1>{error.data.message}</h1>
      <p>
        Error Code - <span>{error.status}</span>
      </p>
      <p>{error.statusText}</p>

      <Link to={"/"}>
        <button>Go Back Homepage</button>
      </Link>
    </section>
  );
};

export default Error;
