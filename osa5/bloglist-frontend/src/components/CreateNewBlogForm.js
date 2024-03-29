import React, { useState } from 'react'

const CreateNewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => (setTitle(event.target.value))
  const handleAuthorChange = (event) => (setAuthor(event.target.value))
  const handleUrlChange = (event) => (setUrl(event.target.value))


  const addBlog =  async (event) => {
    event.preventDefault()

    const likes = 0
    createBlog({
      title, author, url, likes
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='Url'
            onChange={handleUrlChange}
          />
        </div>
        <button id='submit-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateNewBlogForm