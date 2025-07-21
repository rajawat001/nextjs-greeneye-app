import Login from '@/components/Auth/Login'

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-section" id="loginSection">
          <Login />
        </div>
      </div>
    </div>
  )
}