import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react'
import { postRequestOptions } from './api'


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