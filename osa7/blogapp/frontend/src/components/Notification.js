import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state) //[content, type]
  const style = {
    color: state[1] === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (notification) {
    return (
    <div style={style}>
      {state[0]}
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


