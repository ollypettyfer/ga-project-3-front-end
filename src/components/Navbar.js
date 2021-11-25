import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav>
      <div className="navbar-container">
        <Link to="/" className="navbar-items">
          Home
        </Link>
        <Link to="/countries" className="navbar-items">
          Countries
        </Link>

        {/* NAVBAR conditional rendering if user is logged in show
             members Dashboard & Logout Link else show Register and login */}

        {isAuthenticated ? (
          <>
            <Link to="/members" className="navbar-items">
              Members Dashboard
            </Link>
            <Link to="/logout" className="navbar-items">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="navbar-items">
              Register
            </Link>
            <Link to="/login" className="navbar-items">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
