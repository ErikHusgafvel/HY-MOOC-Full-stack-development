import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlogs(state, action) {
      state.push(action.payload) // createSlice uses Immer-library under the hood, which enables the usage of .push() instead of .concat()
    },
    likeIncrement(state, action) {
      console.log("here", action.payload)
      return state.map((blog) => (blog.id === action.payload.id ? action.payload : blog))
    },
    remove(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    }
  }
})

export const { setBlogs, appendBlogs, likeIncrement, remove } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlogs(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    dispatch(likeIncrement(updatedBlog))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch(remove(blog))
  }
}

export default blogSlice.reducer