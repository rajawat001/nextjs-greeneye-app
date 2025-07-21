'use client'
import { useState, useEffect } from 'react'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'

export default function RegisterPage() {
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setShowLogin(params.get('action') === 'login')
    }
  }, [])

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div
          className="auth-section"
          id="registerSection"
          style={{ display: showLogin ? 'none' : 'block' }}
        >
          <Register onSwitch={() => setShowLogin(true)} />
        </div>
        <div
          className="auth-section"
          id="loginSection"
          style={{ display: showLogin ? 'block' : 'none' }}
        >
          <Login />
          <div className="auth-switch">
            <p>
              Don&apos;t have an account?{' '}
              <button className="link-btn" onClick={() => setShowLogin(false)}>
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}