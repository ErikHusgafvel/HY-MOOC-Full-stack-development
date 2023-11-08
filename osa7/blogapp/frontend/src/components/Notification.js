import { useSelector } from "react-redux"
import React from "react"

const Notification = () => {
  const notification = useSelector(state => state.notifications) //[message, type, timeoutID]
  const style = {
    color: notification[1] === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (notification[0]) {
    return (
    <div style={style}>
      {notification[0]}
    </div>
    )
  } else return ( <div /> )
}

export default Notification

/**
const Notification = ({ info }) => {
  if (!info.message) {
    return
  }

  const style = {
    color: info.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div style={style}>{info.message}</div>
}
 */


