import React, { useContext } from "react"
import { authContext } from '../authContext.jsx'
import { Link, useHistory } from 'react-router-dom'


export const NavBar = () => {
  const { user, signOut } = useContext(authContext)
  const history = useHistory()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Network</a>

      <div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#"><strong>{user ? user.username : "Anonymous"}</strong></a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">All Posts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Following</Link>
          </li>
          {user ? (

            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => {
                signOut()
                history.replace("/")
              }}>Log Out</a>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Log In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}