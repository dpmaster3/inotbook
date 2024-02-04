import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  const handleLogout=()=>{
    localStorage.removeItem('token');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Navbar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                isActive={() => location.pathname === '/'}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                isActive={() => location.pathname === '/about'}
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex" role="search">
          <NavLink exact className="btn btn-primary mx-1" to="/login" role="button">Login</NavLink>
          <NavLink exact className="btn btn-primary mx-1" to="/signup" role="button">Signup</NavLink> 
          </form>:
          <NavLink exact className="btn btn-primary mx-1" to="/login" role="button" onClick={handleLogout}>Logout</NavLink>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
