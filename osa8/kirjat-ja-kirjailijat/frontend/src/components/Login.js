import Notify from "./Notify"
import LoginForm from "./LoginForm"

const Login = ({ show, errorMessage, setToken, notify, setPage }) => {
  if (!show) {
    return null
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <h2>login</h2>
      <LoginForm setToken={setToken} setError={notify} setPage={setPage} />
    </>
  )
}

export default Login
