/*
 * Modern way of using Redux with useSelector.
 * Active solution below uses older way of using connect-function and
 * Higher-Order Component (HOC) "ConnectedNotifications"

import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else return ( <div /> )
}
*/

import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification[0]
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else return ( <div /> )
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications