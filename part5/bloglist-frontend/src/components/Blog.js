import React, { useState } from 'react'

const Blog = ({ blog, increaseLike, removeBlog }) => {

  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('view')
  const [likes, setLikes] = useState(parseInt(blog.likes))


  const isVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    width: '50%',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
    setLabel(visible ? 'view' : 'hide')
  }

  const handleLike = () => {
    const newLikes = likes + 1
    const updatedBlog = { ...blog, likes: newLikes }

    setLikes(newLikes)
    increaseLike(updatedBlog)

  }

  const handleRemove = () => {
    if (window.confirm(`❌ Are you sure you want to remove ${blog.title}?`)) {
      removeBlog(blog)
    }
  }


  return (
    <div style={blogStyle}>
      <div className='blog'>
        <div className='blogtitle'>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>{label}</button>
        </div>
        <div data-testid="blogdetail" className='blogdetails' style={isVisible}>
          <div>🌍 {blog.url}</div>
          <div>👍 <span id="likes">{likes}</span> <button onClick={handleLike}>like</button></div>
          <div>✍ {blog.user.name}</div>
          <div><button onClick={handleRemove}>remove ❌</button></div>
        </div>
      </div>
    </div >
  )

}


export default Blog