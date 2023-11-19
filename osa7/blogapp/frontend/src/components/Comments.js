import React from "react"
import CommentForm from "./NewComment"

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper
} from "@mui/material"

const Comments = ({ comments, createComment, id }) => (
      <div>
        <h3>comments</h3>
        <CommentForm id={id} createComment={createComment}/>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
            {comments.map(comment =>
            <TableRow key={comment.id}>{comment.comment}</TableRow>
            )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )

export default Comments