import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [msgbox, setMsgbox] = useState({ msg: '', isError: false })
  const [username, setUsername] = useState('harry')
  const [password, setPassword] = useState('plainpwd')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  const handleLogout = () => {
    console.log('logout:', user.name)
    window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      console.log('logging in with:', username, password)
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('Wrong credentials:', error.message)
      setMsgbox({ msg: 'Wrong username or password!', isError: true })

      setTimeout(() => {
        setMsgbox({ msg: '' })
      }, 3000)
    }
  }

  const handleCreate = async (blogObject) => {

    try {
      const addedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()

      console.log('addedBlog:', addedBlog)
      setMsgbox({ msg: `A new blog have been successfully created by ${user.name}!`, isError: false })
      setTimeout(() => {
        setMsgbox({ msg: '' })
      }, 5000)
      setBlogs(blogs.concat(addedBlog))

    }
    catch (error) {
      console.log('added blog fail:', error.message)
      setMsgbox({ msg: error.response.data.error, isError: true })
      setTimeout(() => {
        setMsgbox({ msg: '' })
      }, 3000)
    }
  }

  const handleLike = async (blogObject) => {
    console.log('updatedBlog:', blogObject)
    await blogService.like(blogObject)

    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === blogObject.id)
        return { ...blog, likes: blog.likes + 1 }
      else return blog
    })

    updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const handleRemove = async (blogObject) => {
    console.log('removeBlog:', blogObject)
    try {
      await blogService.remove(blogObject)
      const updatedBlogs = blogs.filter(blog => blog.id !== blogObject.id)
      setBlogs(updatedBlogs)
    }
    catch (error) {
      setMsgbox({ msg: `Can not remove blog create by ${blogObject.user.username}!`, isError: true })
      setTimeout(() => {
        setMsgbox({ msg: '' })
      }, 5000)
    }
  }

  const loginForm = () => (

    <form onSubmit={handleLogin}>
      <Notification msg={msgbox.msg} isError={msgbox.isError} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
      <BlogForm createBlog={handleCreate} />
    </Togglable>
  )

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])


  useEffect(() => {

    async function fetchData() {
      const blogs = await blogService.getAll()

      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }

    user ? fetchData() : setBlogs([])

  }, [user])


  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={msgbox.msg} isError={msgbox.isError} />
      <h3>{user.name} logged in. <button onClick={handleLogout}>logout</button> </h3>

      {user !== null && blogForm()}

      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} increaseLike={handleLike} removeBlog={handleRemove} />
        )
      }
    </div>
  )

}

export default App