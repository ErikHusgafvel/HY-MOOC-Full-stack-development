import React from "react"

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper
} from "@mui/material"

const User = ({ userWithBlogs }) => {
  if(!userWithBlogs) {
    return null
  }

  return (
    <div>
      <h2>{userWithBlogs.username}</h2>
      <div style={{fontWeight:"bold"}}>added blogs</div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
          {userWithBlogs.blogs.map(blog =>
            <TableRow key={blog.id}>
              {blog.title}
            </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default User