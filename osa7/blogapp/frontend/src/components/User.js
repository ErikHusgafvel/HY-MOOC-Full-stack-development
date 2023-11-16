import React from "react"

const User = ({ userWithBlogs }) => {
  if(!userWithBlogs) {
    return null
  }

  return (
    <div>
      <h2>{userWithBlogs.username}</h2>
      <div style={{fontWeight:"bold"}}>added blogs</div>
      <ul>
        {userWithBlogs.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>)}
      </ul>
    </div>
  )
}

export default User