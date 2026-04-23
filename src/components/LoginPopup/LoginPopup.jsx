import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setshowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currentState, setcurrentState] = useState("Sign Up")
  const [animKey, setAnimKey] = useState(0) // force re-animation on state switch
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const switchState = (newState) => {
    setcurrentState(newState)
    setAnimKey(k => k + 1) // bumping key re-mounts inputs → replays stagger animation
  }

  const onLogin = async (e) => {
    e.preventDefault()
    let newUrl = url
    if (currentState === "Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl, data)
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      setshowLogin(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>

        {/* Title */}
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img
            onClick={() => setshowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        {/* Inputs — key prop re-triggers entry animations on mode switch */}
        <div className='login-popup-input' key={animKey}>
          {currentState !== "Login" && (
            <input
              onChange={handleChange}
              name='name'
              type="text"
              value={data.name}
              placeholder='Your Name'
            />
          )}
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={data.email}
            placeholder='E-mail'
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={data.password}
            placeholder='Password'
          />
        </div>

        {/* Submit */}
        <button
          type='submit'
          className='text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-4'
        >
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* Terms */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {/* Switch mode */}
        {currentState === "Login"
          ? <p>Create a new account? <span onClick={() => switchState("Sign Up")}>click here</span></p>
          : <p>Already have an account? <span onClick={() => switchState("Login")}>Login here</span></p>
        }

      </form>
    </div>
  )
}

export default LoginPopup
