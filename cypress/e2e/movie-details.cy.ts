describe('The movie details page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/movies/157336')
  })

  it('successfully load page with title', () => {
    cy.get('h1').contains('Interstellar')
  })

  it('should contains recommendations', () => {
    cy.get('[data-test-id=MovieCard]').should('have.length.greaterThan', 1)
  })
})