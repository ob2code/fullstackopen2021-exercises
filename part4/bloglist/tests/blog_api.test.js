const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('../utils/list_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnJ5IiwiaWQiOiI2MjA2NDY3Y2I4NDQyNTFmNTc0MTMzMmYiLCJpYXQiOjE2NDQ1OTExNDgsImV4cCI6MTY0NDU5NDc0OH0.b_lVWDksWyBOH0uY83HjTCexuT0aZojKF-fD5CLnBpY'

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialblogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})
// -------------
describe('Exercises 4.8.-4.12. ', () => {

    test('4.8: step1 - returns the correct amount of blog', async () => {
        const response = await api.get('/api/blogs')
            .auth(token, { type: 'bearer' })

        expect(response.body).toHaveLength(helper.initialblogs.length)
    })

    test('4.9: step2 - unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs').auth(token, { type: 'bearer' })
        expect(response.body[0].id).toBeDefined()
    })

    test('4.10: step3 - a valid blog can be added', async () => {
        const newBlog = {
            title: 'Sample blog for testing',
            author: 'Unknow author',
            url: 'http://blog.cleancoder.com',
            likes: 9,
        }
        await api
            .post('/api/blogs')
            .auth(token, { type: 'bearer' })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDb()
        // verify the total number of blogs in the system is increased by one
        expect(blogsAtEnd).toHaveLength(helper.initialblogs.length + 1)

        // verify the content of the added blog post is saved correctly to the database
        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
            'Sample blog for testing'
        )
    })


    test('4.11: step4 - the default value of like property is zero', async () => {
        const newBlog = {
            title: 'Sample blog without like',
            author: 'Unknow author',
            url: 'http://blog.cleancoder.com',
        }
        await api
            .post('/api/blogs')
            .auth(token, { type: 'bearer' })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        // verify the likes property of the added blog post is zero
        const addedBlog = blogsAtEnd.find(blog => blog.title === 'Sample blog without like' && blog.likes === 0)
        expect(addedBlog).not.toBeUndefined()

    })

    test('4.12: step5 - 400 Bad Request when title and url are missed', async () => {
        const newBlog = {
            author: 'Unknow author',
            likes: 9
        }
        await api
            .post('/api/blogs')
            .auth(token, { type: 'bearer' })
            .send(newBlog)
            .expect(400)

    })

    test('4.14: step2 - a blog can be updated the likes property', async () => {

        // _id: '5a422bc61b54a676234d17fc',
        // title: 'Type wars',
        // author: 'Robert C. Martin',
        // url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        // likes: 2,
        // __v: 0        
        const newLikes = 9
        const updateBlog = {
            likes: newLikes
        }

        const blogsAtEnd = await api
            .put('/api/blogs/5a422bc61b54a676234d17fc')
            .auth(token, { type: 'bearer' })
            .send(updateBlog)
            .expect(200)

        expect(blogsAtEnd.body.likes).toBe(newLikes)
    })

})

// -------------
afterAll(() => {
    mongoose.connection.close()
})
