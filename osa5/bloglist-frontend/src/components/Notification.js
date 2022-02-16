import React from 'react'

const SuccessNotification = ({ message }) => {
  if(!message) { return null }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if(!message) { return null }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default {
  SuccessNotification,
  ErrorNotification
}