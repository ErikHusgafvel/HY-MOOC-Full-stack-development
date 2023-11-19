import { React, useState} from "react"

const CommentForm = ({ id, createComment }) => {
  const [comment, setComment] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    await createComment(id, comment)
    setComment("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id="comment"
            placeholder="add a new comment"
          />
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm