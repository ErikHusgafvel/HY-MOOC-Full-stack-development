import React from "react"

const Comments = ({ comments }) => {
  if(comments.length > 0) {
    return (
      <div>
        <h3>comments</h3>
        <ul>
          {comments.map(comment =>
          <li key={comment.id}>{comment.comment}</li>
          )}
        </ul>
      </div>
    )
  } else return ""
}

export default Comments