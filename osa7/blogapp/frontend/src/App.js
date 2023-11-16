import { useEffect, useRef, React } from "react"
import Blog from "./components/Blog"
import Users from "./components/Users"
import User from "./components/User"
import loginService from "./services/login"

import LoginForm from "./components/Login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs, createNewBlog, likeBlog, removeBlog } from "./reducers/blogReducer"
import { initializeUser, removeUser, saveUser } from "./reducers/userReducer"

import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link, useMatch } from "react-router-dom"


const helper = require("./utils/helper")


const App = () => {
  const user = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      await dispatch(saveUser(user))
      dispatch(setNotification("welcome!", "info", 5))
    } catch (e) {
      dispatch(setNotification("wrong username or password!", "error", 5))
    }
  }

  const logout = async () => {
    dispatch(removeUser())
    dispatch(setNotification("logged out", "info", 5))
  }

  const createBlog = async (blog) => {
    await dispatch(createNewBlog(blog))
    dispatch(setNotification(`A new blog '${blog.title}' by '${blog.author}' added`, "info", 5))
    blogFormRef.current.toggleVisibility()
  }

  const like = async (blog) => {
    await dispatch(likeBlog(blog))
    dispatch(setNotification(`A like for the blog '${blog.title}' by '${blog.author}'`, "info", 5))
  }

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      await dispatch(removeBlog(blog))
      dispatch(setNotification(`The blog' ${blog.title}' by '${blog.author}' removed`, "info", 5))
    }
  }

  const Home = () => (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {[...blogs].sort(byLikes).map(blog =>
        <li key={blog.id} className="home-blog-list">
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </li>/* (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ) */)}
      </div>
    </div>
  )

  const userMatch = useMatch("/users/:id")
  const userWithBlogs = userMatch ? helper.userWithBlogs(blogs, userMatch.params.id) : null

  const blogMatch = useMatch("/blogs/:id")
  const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div className="user-logged-in">
        {user.name} logged in
      </div>
      <div>
        <button onClick={logout}>logout</button>
      </div>

      <Routes>
        <Route path='/users/:id' element={<User userWithBlogs={userWithBlogs} />} />
        <Route path='/users' element={<Users blogs={[...blogs]} />} />
        <Route path='/blogs/:id' element={<Blog blog={blog} like={() => like(blog)} canRemove={blog && user && blog.user.username === user.username} remove={() => remove(blog)}/> } />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
