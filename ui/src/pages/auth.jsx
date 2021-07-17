import React, { useContext, useState } from 'react'
import { useHistory, Redirect } from 'react-router';
import { authContext } from '../authContext'


export const AuthPage = () => {
  const { user, signIn, register } = useContext(authContext)
  const [creds, setCreds] = useState({
    username: "",
    password: "",
    email: "",
  })
  const [action, setAction] = useState("login")
  const history = useHistory()
  let { from } = location.state || { from: {pathname: "/"}}


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (creds.username && creds.password) {
      if (action == "login") {
        delete creds.email
        signIn(creds)
        history.replace("/")
      } else if (action == "register") {
        register(creds)
        history.replace("/")
      }
    }
  }

  const handleFormChanged = (event) => {
    setCreds({
      ...creds,
      [event.target.name]: event.target.value,
    })
  }

  return (
    user ? (
      <Redirect to={from} />
    ) : (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            autoFocus
            className="form-control"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleFormChanged}
            value={creds.username}
          />
        </div >


        {action == "register" &&
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleFormChanged}
              value={creds.email}
            />
          </div>
        }

        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleFormChanged}
            value={creds.password}
          />
        </div>

        <input className="btn btn-primary" type="submit" value="Submit" />
        <button onClick={() => setAction(action == "login" ? "register" : "login")}>{action == "login" ? "Register" : "Login"}</button>
      </form >

    )
  )
}