describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      user: 'Erik Husgafvel',
      username: 'ehusgaf',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ehusgaf')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Erik Husgafvel logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ehusgaf')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Erik Husgafvel logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ehusgaf', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('title - adding new blog')
      cy.get('#author').type('author - adding new blog')
      cy.get('#url').type('url - adding new blog')
      cy.get('#submit-button').click()

      cy.contains('added')
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first title', author: 'first author', url: 'first url', likes: 0})
        cy.createBlog({ title: 'second title', author: 'second author', url: 'second url', likes: 0})
        cy.createBlog({ title: 'third title', author: 'third author', url: 'third url', likes: 0})
      })

      it('hitting like works for selected blog', function() {
        cy.contains('second title').contains('view').click()
        cy.contains('second url').contains('like').click()
      })

      it('a blog can be deleted by the owner of the blog', function() {
        cy.contains('second title').contains('view').click()
        cy.contains('second url').contains('remove').click()

        cy.on('window.confirm', () => true)

        cy.get('html').should('not.contain', 'second title')
      })

      it('a blog cannot be deleted if not owner', function () {
        const user2 = {
          user: 'Erik the Second',
          username: 'ehusgafvel',
          password: 'very-salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.visit('http://localhost:3000')

        cy.login({ username: 'ehusgafvel', password: 'very-salainen' })
        cy.visit('http://localhost:3000')
        cy.get('html').should('contain', 'Erik the Second')

        cy.contains('second title').contains('view').click()
        cy.contains('second url').should('not.contain', 'remove')
      })

      it.only('blogs are sorted in order based on their \'likes\' value', function() {
        cy.contains('second title').contains('view').click()
        cy.contains('second url').contains('like').click()
        cy.wait(500)
        cy.contains('second url').contains('like').click()

        cy.contains('third title').contains('view').click()
        cy.contains('third url').contains('like').click()
        cy.wait(500)
        cy.contains('third url').contains('like').click()
        cy.wait(500)
        cy.contains('third url').contains('like').click()

        cy.visit('http://localhost:3000')
        cy.get('.defaultContent')
          .should('have.length', 3)
          .then(($div) => {
          cy.wrap($div[0]).should('contain', 'third')
          cy.wrap($div[1]).should('contain', 'second')
          cy.wrap($div[2]).should('contain', 'first')

        })
      })
    })

  })
})