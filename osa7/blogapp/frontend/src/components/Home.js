import React from "react"
import Togglable from "./Togglable"
import NewBlog from "./NewBlog"
import { Link } from "react-router-dom"
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from "@mui/material"

const Home = ({ blogFormRef, createBlog, blogs }) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
  <div>
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <NewBlog createBlog={createBlog} />
    </Togglable>
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
          {[...blogs].sort(byLikes).map(blog =>
            <TableRow key={blog.id}>
              <TableCell>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>
              {blog.author}
              </TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </div>
  )
}

export default Home