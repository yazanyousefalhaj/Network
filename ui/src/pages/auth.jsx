import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { postRequestOptions } from '../api'


export const authContext = createContext();

const useProvideAuth = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch("/api/me/")
      .then(res => res.json())
      .then(res => {
        if (res["message"] !== "user is not logged in") {
          setUser(res)
        }
      })
  }, [])

  const signIn = async (creds) => {
    let res = await fetch(`/api/login/`, { ...postRequestOptions, body: JSON.stringify(creds) }).then(res => res.json())
    if (res["success"] !== false) {
      setUser(res)
      postRequestOptions.headers.set("X-CSRFToken", Cookies.get("csrftoken"))
    }
  }

  const signOut = async () => {
    const res = await fetch(`/api/logout/`, postRequestOptions).then(res => res.json())
    if (res["success"] !== false) {
      setUser(null)
    }
  }

  const register = async (creds) => {
    let res = await fetch(`/api/register/`, { ...postRequestOptions, body: JSON.stringify(creds) }).then(res => res.json())
    if (res["success"] !== false) {
      setUser(res)
      postRequestOptions.headers.set("X-CSRFToken", Cookies.get("csrftoken"))
    }
  }

  return { user, signIn, signOut, register }
}

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

export const AuthPage = () => {
  const { user, signIn, signOut, register } = useContext(authContext)
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