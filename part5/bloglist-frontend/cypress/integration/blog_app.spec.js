describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a user to backend
    cy.request('POST', 'http://localhost:3003/api/users/', { username: 'harry', name: 'Harry Potter', password: 'plainpwd' })
    cy.request('POST', 'http://localhost:3003/api/users/', { username: 'root', name: 'Admin', password: 'plainpwd' })
    cy.visit('http://localhost:3000')
  })

  it('5.17, step 1 - Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('5.18, step2 - Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username')
        .type('harry')
      cy.get('#password')
        .type('plainpwd')
      cy.contains('login')
        .click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.contains('logout')
        .click()

      cy.get('#username')
        .type('invaliduser')
      cy.get('#password')
        .type('invalidpassword')
      cy.contains('login')
        .click()

      cy.get('.msg--error')
        .should('contain', 'Wrong username or password!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')


      cy.get('html').should('not.contain', 'Harry Potter logged in')
    })
  })

  describe('5.19, step 3 - When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'harry', password: 'plainpwd' })
    })

    it('A blog can be created', function () {
      cy.contains('Create new blog')
        .click()
      cy.get('#Title')
        .type('Multi-Framework Code Blocks')
      cy.get('#Author')
        .type('Alex Krolick')
      cy.get('#Url')
        .type('www.testing-library.com/blog')
      cy.contains('create')
        .click()
      cy.contains('Multi-Framework Code Blocks')
    })

    describe('and a bog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Guide To Creating Visual Content',
          author: 'M. Martin',
          url: 'www.alibra.com',
          likes: 2
        })

        cy.createBlog({
          title: 'What Makes a Great Blog Title?',
          author: 'M. Martin',
          url: 'www.alibra.com',
          likes: 0
        })
      })

      it('5.20, step 4 - Users can like a blog', function () {
        cy.contains('view')
          .click()
        cy.contains('like')
          .click()
        cy.get('#likes').contains('3')
        cy.contains('like')
          .click()
        cy.get('#likes').contains('4')
      })

      it('5.21, step 5 - Owner can delete his blog', function () {
        cy.contains('view')
          .click()
        cy.contains('remove')
          .click()
        cy.get('html').should('not.contain', 'Guide To Creating Visual Content')
      })

      it('5.21, step 5 - User can not delete others\'s blog', function () {
        //login with another user
        cy.contains('logout')
          .click()
        cy.get('#username')
          .type('root')
        cy.get('#password')
          .type('plainpwd')
        cy.contains('login')
          .click()
        cy.contains('blogs')
        //try to remove the others's blog
        cy.contains('view')
          .click()
        cy.contains('remove')
          .click()
        cy.get('.msg--error')
          .should('contain', 'Can not remove blog create')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')
      })




    })

    describe('and three bog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Guide To Creating Visual Content',
          author: 'M. Martin',
          url: 'www.alibra.com',
          likes: 2
        })

        cy.createBlog({
          title: 'What Makes a Great Blog Title?',
          author: 'M. Martin',
          url: 'www.alibra.com',
          likes: 10
        })

        cy.createBlog({
          title: 'Butter in Coffee: Benefits and Health Risk?',
          author: 'Elise Dopson',
          url: 'www.databox.com',
          likes: 999
        })
      })

      it('5.22, step 6 - the blog with the most likes being first', function () {
        cy.contains('Butter in Coffee: Benefits and Health Risk?').find('button').click()
        cy.get('#likes')
          .should('contain', '999')
      })
    })

  })

})