import React from 'react'
import Auth from "./auth/Auth"

const Home = (props) => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => {
        Auth.login(() => {
          props.history.push("/admin")
        })
      }}>
      Login
      </button>
    </div>
  )
}

export default Home
