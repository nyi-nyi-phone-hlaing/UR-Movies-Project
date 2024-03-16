import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import {
  Home,
  Popular,
  Upcoming,
  SearchResult,
  Details,
  Error,
} from "./pages/PageExports";

import { loader as popularMoviesLoader } from "./pages/Popular";
import { loader as upcomingMoviesLoader } from "./pages/Upcoming";
import { loader as relatedMoviesLoader } from "./pages/Home";
import { loader as movieDetailsLoader } from "./pages/Details";
import { loader as searchResultsLoader } from "./pages/SearchResult";

const router = createBrowserRouter([
  {
    path: "",
    element: <Main />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home />, loader: relatedMoviesLoader },
      { path: "/Popular", element: <Popular />, loader: popularMoviesLoader },
      {
        path: "/Upcoming",
        element: <Upcoming />,
        loader: upcomingMoviesLoader,
      },
    ],
  },
  {
    path: "/search/:title",
    element: <SearchResult />,
    errorElement: <Error />,
    loader: searchResultsLoader,
  },
  {
    path: "/movie-detail/:id",
    element: <Details />,
    loader: movieDetailsLoader,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
