import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();
    if (searchKey.trim() !== "") {
      navigate(`/search/${searchKey}`);
    } else {
      alert("Type a movie name please");
    }
  };

  return (
    <nav className='nav-bar'>
      <h1 className='logo'>UR Movies</h1>
      <ul className='menu'>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/Popular"}>Popular</NavLink>
        <NavLink to={"/Upcoming"}>Upcoming</NavLink>
      </ul>
      <form className='search-box' onSubmit={search}>
        <input type='text' onChange={(e) => setSearchKey(e.target.value)} />
        <button type='submit'>Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
