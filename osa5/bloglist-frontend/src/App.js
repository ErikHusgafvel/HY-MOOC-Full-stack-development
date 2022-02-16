import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateNewForm from './components/CreateNewForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    } catch (exception){
      console.log(exception)
    }
  }

  const handleLogout = () => {
    console.log('logging out from', user.username)

    window.localStorage.removeItem('loggedBlogappUser')

    setUser(null)
  }

  const handleNewBlog =  async(event) => {
    event.preventDefault()
    const likes = 0
    try {
        await blogService.create({
        title, author, url, likes
      })
    } catch(exception) {
      console.log(exception)
    }

    setTitle('')
    setAuthor('')
    setUrl('')
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
      <LoginForm
      handleLogin={handleLogin}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      username={username}
      password={password}
      /> :
      <div>
        <h2>blogs</h2>
        <div>
          <div>{user.name} logged in
          <button onClick={() => handleLogout()}>logout</button>
          </div>
          <CreateNewForm
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