import React from "react"
import Togglable from "./Togglable"
import NewBlog from "./NewBlog"
import { Link } from "react-router-dom"

const Home = (props) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
  <div>
    <Togglable buttonLabel="create new" ref={props.blogFormRef}>
      <NewBlog createBlog={props.createBlog} />
    </Togglable>
    <div>
      {[...props.blogs].sort(byLikes).map(blog =>
      <li key={blog.id} className="home-blog-list">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </li>
      )}
    </div>
  </div>
  )
}

export default Home