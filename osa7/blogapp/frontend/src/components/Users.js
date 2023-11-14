import React from "react"
import { Link } from "react-router-dom"

import "../App.css"

const helper = require("../utils/helper")

const Users = ({ blogs }) => {
  const userList = helper.orderBlogs(blogs)
  const maxNameWidth = Math.max(...userList.map(user => user.username.length))
  const BlogsWidth = Math.max(...userList.map(user => user.blogs.length))
  const maxBlogsWidth = BlogsWidth > "blogs created".length ? BlogsWidth : "blogs created".length

  return (
  <div>
    <h2>Users</h2>
    <ul className="blog-list">
        <li className="users-header-row">
          <span style={{width:`${maxNameWidth}ch`}}></span>
          <span style={{width:`${maxBlogsWidth}ch`}}>blogs created</span>
        </li>
        {userList.map(user =>
        <li className="users" key={user.id}>
          <span style={{width:`${maxNameWidth}ch`}}><Link to={`/users/${user.id}`}>{user.username}</Link></span>
          <span style={{width:`${maxBlogsWidth}ch`}}>{user.blogs}</span>
        </li>
        )}
    </ul>
  </div>
  )
}

export default Users