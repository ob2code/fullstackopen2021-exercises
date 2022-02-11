const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// list all blogs
blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
        .then(blogs => {
            response.json(blogs)
        })
})


// add a new blog
blogsRouter.post('/', async (request, response) => {
    const user = request.user
    const blog = new Blog(request.body)
    blog.user = user.id

    if (blog.title === undefined && blog.url === undefined) {
        response.status(400).end()
    }
    else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)

        const userObj = await User.findById(user.id)

        // update newBlog to this user
        userObj.blogs = userObj.blogs.concat(savedBlog._id)
        await userObj.save()
    }
})

// delete a blog
blogsRouter.delete('/:id', async (request, response) => {
    // get user from request object
    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (user.id != blog.user.toString()) {
        response.status(401).end()
    }
    else {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }


})

// update blog's likes
blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = { likes: body.likes }
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        if (!updatedBlog) response.status(204).end()
        else response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})


module.exports = blogsRouter