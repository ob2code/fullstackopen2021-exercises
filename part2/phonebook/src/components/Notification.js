import React from 'react'

const Notification = ({ message, isError }) => {
    if (message === null) {
        return null
    }
    const clsName = `notify${isError ? ' error' : ''}`
    return (
        <div className={clsName}>
            {message}
        </div>
    )
}

export default Notification