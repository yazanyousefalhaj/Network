import React, {  useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { authContext } from '../authContext.jsx'


export const AuthPage = () => {
  const { signIn, register } = useContext(authContext)
  const [creds, setCreds] = useState({
    username: "",
    password: "",
    email: "",
  })
  const [action, setAction] = useState("login")
  const history = useHistory()


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
      </div>


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
    </form>
  )
}