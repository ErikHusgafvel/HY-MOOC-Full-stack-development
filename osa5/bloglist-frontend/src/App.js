import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

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

  const handleNewBlog =  async(event) => {
    event.preventDefault()
    const likes = 0
    try {
      await blogService.create({
        title, author, url, likes
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage(
        `A new blog ${title} by ${author} added`
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
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
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
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
          <CreateNewBlogForm
            handleNewBlog={handleNewBlog}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
            title={title}
            author={author}
            url={url}
          />
          <br/>
          <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default App