import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('renders correct content', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Title should show up in first screen',
      author: 'Author should also show up',
      url: 'URL should not render in the beginning',
      likes: 0
    }

    const incrementBlogLikesMock = jest.fn()
    const removeBlogMock = jest.fn()

    const user = {
      username: 'TestUser'
    }

    container = render(
      <Blog blog={blog} incrementBlogLikes={incrementBlogLikesMock} removeBlog={removeBlogMock} user={user} />
    ).container
  })

  test('at start the URL and likes are not displayed', () => {
    const div1 = container.querySelector('.defaultContent')
    expect(div1).not.toHaveStyle('display: none')
    const div2 = container.querySelector('.togglableContent')
    expect(div2).toHaveStyle('display: none')
  })

  test('after clicking the button, more information is displayed', () => {
    const button = screen.getByText('view')
    userEvent.click(button)
    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})