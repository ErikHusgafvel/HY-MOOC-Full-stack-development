import React from "react"
import PropTypes from "prop-types"
import Comments from "./Comments"

const Blog = ({ blog, like, canRemove, remove }) => {
  if (!blog) return null

  return (
    <div className="blog">
      <h2>{blog.title} {blog.author}</h2>
        <div>
          <div>
            <a href={blog.url}> {blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={like}>like</button>
          </div>
          <div>added by {blog.user.name ? blog.user.name : "unknown"} {canRemove && <button onClick={remove}>delete</button>}</div>
        </div>
        <Comments comments={blog.comments}/>

    </div>
  )
}

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
}

export default Blog
