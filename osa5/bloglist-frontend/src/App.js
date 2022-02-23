import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {

      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(
        `Logged in with ${user.username}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)

    } catch (exception){

      console.log(exception)
      setErrorMessage(
        `Wrong username or password`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logging out from', user.username)

    window.localStorage.removeItem('loggedBlogappUser')

    setUser(null)
    setSuccessMessage(
      `Logged out successfully`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 2000)
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)
    } catch(error) {
      console.log(error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <CreateNewBlogForm createBlog={addBlog}/>
      </Togglable>
  )

  const incrementBlogLikes = async (increment, blogObject) => {
    blogObject.likes = blogObject.likes + increment
    const returnedBlog = await blogService.update(blogObject.id, blogObject)
    setBlogs(blogs.map(blog => blog.id === blogObject.id ? returnedBlog : blog))
  }

  const removeBlog = async (blogObject) => {
    await blogService.del(blogObject.id)
    setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
  }

  return (
    <div>
      {user === null ?
      <div>
        <h2>Log in to application</h2>
        <Notification.SuccessNotification message={successMessage} />
        <Notification.ErrorNotification message={errorMessage} />
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div> :
      <div>
        <h2>blogs</h2>
        <div>
          <Notification.SuccessNotification message={successMessage} />
          <Notification.ErrorNotification message={errorMessage} />
          <div>{user.name} logged in
            <button onClick={() => handleLogout()}>logout</button>
          </div>
          <div>
            {blogForm()}
          </div>
          <br/>
          <div>
            {blogs.sort((blog1, blog2) => (blog2.likes - blog1.likes)).map(blog =>
              <Blog key={blog.id}
                blog={blog}
                incrementBlogLikes={incrementBlogLikes}
                removeBlog={removeBlog}
                user={user}/>
            )}
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default App