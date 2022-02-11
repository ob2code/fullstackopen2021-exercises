var _ = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialusers = [
    {
        _id: '6206467cb844251f5741332f',
        username: 'harry',
        name: 'Harry Potter',
        password: 'plainpwd'

    },
    {
        _id: '620646a2b844251f57413336',
        username: 'root',
        name: 'Huy Dang',
        password: 'plainpwd'
    }]

const initialblogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    function getSum(total, blog) {
        return total + Math.round(blog.likes)
    }

    return blogs.reduce(getSum, 0)
}

const favoriteBlog = (blogs) => {
    let [maxLikes, favBlog] = [-1, {}]

    blogs.forEach(blog => {
        if (blog.likes > maxLikes)
            [maxLikes, favBlog] = [blog.likes, blog]
    })

    // eslint-disable-next-line no-undef
    return ({ title, author, likes } = favBlog, { title, author, likes })

}

const mostBlogs = (blogs) => {
    const authors = _.countBy(blogs, blog => blog.author)

    let [maxBlog, mostauthor] = [-1, {}]

    _.forEach(authors, (count, author) => {
        if (count > maxBlog)
            [maxBlog, mostauthor] = [count, author]
    })
    return { 'author': mostauthor, 'blogs': maxBlog }

}

const mostLikes = (blogs) => {
    const authors = _.groupBy(blogs, v => v.author)
    let [mostAuhthor, totalLikes] = ['', -1]

    _.forEach(authors, (value, key) => {
        let total = value.reduce((total, val) => { return total + val.likes }, 0)
        if (total > totalLikes) [mostAuhthor, totalLikes] = [key, total]
    })
    return { 'author': mostAuhthor, 'likes': totalLikes }

}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, initialblogs, blogsInDb,
    initialusers, usersInDb
}