import React, { useState } from 'react'

const Blog = ({ blog, incrementBlogLikes, removeBlog, user }) => {
  const [visible, setVisibility] = useState(false)

  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemove = () => {
    /**
     * Here lies an error: when creating a new blog, blog.user doesn't get populated in the
     * new blog before refreshing the page. Thus, blog.user is only userID and doesn't
     * include username. Therefore, blog.user.username === user.username defaults to error
     * and the remove button doesn't show up before refreshing the page.
     * ----
     * Same seems to happen when pushing the like-button.
     */
    if( blog.user && user && blog.user.username === user.username ){
      return (
        <button onClick={() => removeBlog(blog)}>remove</button>
      )
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='defaultContent'>
        {blog.title} {blog.author}
        <button onClick={() => setVisibility(true)}>view</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {blog.title} <button onClick={() => setVisibility(false)}>hide</button><br/>
        {blog.url}<br/>
        {blog.likes}<button onClick={() => incrementBlogLikes(1, blog)}>like</button><br/>
        {blog.author}<br/>
        {showRemove()}
      </div>
    </div>
  )
}

export default Blog