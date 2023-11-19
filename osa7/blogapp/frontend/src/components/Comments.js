import React from "react"
import CommentForm from "./NewComment"

const Comments = ({ comments, createComment, id }) => (
      <div>
        <h3>comments</h3>
        <CommentForm id={id} createComment={createComment}/>
        <ul>
          {comments.map(comment =>
          <li key={comment.id}>{comment.comment}</li>
          )}
        </ul>
      </div>
    )

export default Comments