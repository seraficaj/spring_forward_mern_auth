import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [msg, setMessage] = useState('')

  const handleFormSubmit = async  e => {
    e.preventDefault()
    try {
      // post to the backend with the form data to login
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, form)
      // decode the token that is sent to use
      const { token } = response.data
      const decoded = jwt_decode(token)
      // save the token in localstorage
      localStorage.setItem('jwt', token)
      // set the app state to the logged in user
      setCurrentUser(decoded)
    } catch (err) {
      // handle errors suchs as wrong credentials 
      if (err.response.status === 400) {
        console.log(err.response.data)
        setMessage(err.response.data.msg)
      }
      console.log(err)
    }
  }

  // navigate to the user's profile if currentUser is not null
  if (currentUser) return <Navigate to="/profile" />
  
  return (
    <div>
      <h3>Login form:</h3>
      <p>{msg ? `the server has a message for you: ${msg}` : ''}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          id="email"
          placeholder='user@domain.com'
          type="email"
          onChange={e => setForm({...form, email: e.target.value})}
          value={form.email}
        />

        <label htmlFor="password">Password:</label>
        <input 
          id="password"
          type="password"
          onChange={e => setForm({...form, password: e.target.value})}
          value={form.password}
        />

        <input type="submit" />
      </form>
    </div>
  )
}