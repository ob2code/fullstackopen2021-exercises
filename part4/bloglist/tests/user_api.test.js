const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('../utils/list_helper')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    // const userObjects = helper.initialusers
    //     .map(async user => {
    //         const saltRounds = 10
    //         const passwordHash = await bcrypt.hash('body.password', saltRounds)
    //         user.passwordHash = passwordHash
    //         console.log('user:', user)

    //         return new User(user)

    //     })

    const userObjects = []
    for (let index = 0; index < helper.initialusers.length; index++) {
        const user = helper.initialusers[index]
        const passwordHash = await bcrypt.hash(user.password, 10)
        user.passwordHash = passwordHash
        userObjects.push(new User(user))
    }

    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})


describe('Exercises 4.15.-4.23. ', () => {

    test('4.15: step3 - a valid user can be added', async () => {
        const newUser = {
            username: 'tester',
            name: 'Tester',
            password: 'samplePwd',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        // verify the total number of blogs in the system is increased by one
        expect(usersAtEnd).toHaveLength(helper.initialusers.length + 1)

        // verify the content of the added blog post is saved correctly to the database
        const username = usersAtEnd.map(n => n.username)
        expect(username).toContain(newUser.username)
    })

    test('4.16: step4 - invalid users are not created', async () => {
        const invalidUsername = {
            username: 'na',
            name: 'Invalid username',
            password: '123'
        }

        const response = await api
            .post('/api/users')
            .send(invalidUsername)
            .expect(400)

        expect(response.body.error).toContain('username: Must be at least 3 characters')

        // 
        const invalidPassword = {
            username: 'user',
            name: 'Invalid password',
            password: '12'
        }

        await api
            .post('/api/users')
            .send(invalidPassword)
            .expect(400)
            .expect((res) => {
                expect(res.body.error).toContain('Password must be at least 3 characters')
            })

    })

    test('4.18: step6.1 - valid username & password can login', async () => {
        const userlogin = {
            username: 'harry',
            password: 'plainpwd'
        }

        await api
            .post('/api/login')
            .send(userlogin)
            .expect(200)

    })

    test('4.18: step6.2 - invalid username / password can not login', async () => {
        const invalidUser = {
            username: 'harry-invalid',
            password: 'plainpwd'
        }

        await api
            .post('/api/login')
            .send(invalidUser)
            .expect(401)

        const invalidPwd = {
            username: 'harry',
            password: 'plainpwd-invalid'
        }

        await api
            .post('/api/login')
            .send(invalidPwd)
            .expect(401)
    })

})

// -------------
afterAll(() => {
    mongoose.connection.close()
})
