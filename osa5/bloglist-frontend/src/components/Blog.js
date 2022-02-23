import React, { useState } from 'react'
const Blog = ({ blog, incrementBlogLikes }) => {
  const [visible, setVisibility] = useState(false)

  const hideWhenVisible = { display : visible ? 'none' : ''}
  const showWhenVisible = { display : visible ? '' : 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title}
      <button onClick={() => setVisibility(true)}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title} <button onClick={() => setVisibility(false)}>hide</button><br/>
      {blog.url}<br/>
      {blog.likes}<button onClick={() => incrementBlogLikes(1, blog)}>like</button><br/>
      {blog.author}<br/>
    </div>
  </div>
  )
}

export default Blog