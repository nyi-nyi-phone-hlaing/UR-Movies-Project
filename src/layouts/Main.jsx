import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div className='Main'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
