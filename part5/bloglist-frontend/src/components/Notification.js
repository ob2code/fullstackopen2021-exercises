import React from 'react'
import PropTypes from 'prop-types'


const Notification = ({ msg, isError }) => {
  const className = isError ? 'msg--error' : 'msg--notify'
  if (msg === '') {
    return null
  }

  return (
    <div className={'msg ' + className}>
      {msg}
    </div>
  )

}

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
  isError: PropTypes.bool
}

export default Notification