import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateNewBlogForm from './CreateNewBlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const content = render(<CreateNewBlogForm createBlog={createBlog} />).container

  const titleInput = content.querySelector('#title')
  const authorInput = content.querySelector('#author')
  const urlInput = content.querySelector('#url')
  const sendButton = screen.getByText('create')

  userEvent.type(titleInput, 'title - testing a form...')
  userEvent.type(authorInput, 'author - testing a form...')
  userEvent.type(urlInput, 'url - testing a form...')
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title - testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('author - testing a form...')
  expect(createBlog.mock.calls[0][0].url).toBe('url - testing a form...')
  expect(createBlog.mock.calls[0][0].likes).toBe(0)
})
