import React, { useState } from 'react'
import { registerUser } from '../lib/auth.js'

export default function Register() {
  const [data, setData] = useState({
    formData: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const [isRegistered, setIsRegistered] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await registerUser(data.formData)
      if (res.status === 201) {
        console.log('User registration successful')
        setIsRegistered(true)
        console.log(`IS THE USER REGISTERED >>>>>`, isRegistered)
      }
    } catch (err) {
      console.error('Error registering user', err)
    }
  }

  const handleInput = (event) => {
    const formData = {
      ...data.formData,
      [event.target.name]: event.target.value,
    }
    setData({ formData })
  }

  return (
    <div>
      <div className="form">
        {/* everything to do with the form is below */}

        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-input-material">
              <label>Username</label>
            </div>

            <div className="form-input-material">
              <input
                placeholder="Username"
                name="username"
                value={data.formData.username}
                onChange={handleInput}
              />
            </div>

            <div className="form-input-material">
              <label>Email</label>
            </div>
            <div className="form-input-material">
              <input
                placeholder="Email"
                name="email"
                value={data.formData.email}
                onChange={handleInput}
              />
            </div>

            <div className="form-input-material">
              <label>Password</label>
            </div>
            <div className="form-input-material">
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={data.formData.password}
                onChange={handleInput}
              />
            </div>

            <div className="form-input-material">
              <label>Confirm Password</label>
            </div>
            <div className="form-input-material">
              <input
                placeholder="Confirm Password"
                name="passwordConfirmation"
                type="password"
                value={data.formData.passwordConfirmation}
                onChange={handleInput}
              />
            </div>

            <div>
              <input
                className="btn2 btn-primary btn-ghost"
                type="submit"
                value="Register"
              />
            </div>
          </form>
        </div>
        {/* everything to do with the form is above */}
      </div>
    </div>
  )
}
