describe('The home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('successfully load page with title', () => {
    cy.get('h1').contains('Movies')
  })

  it('should contains movie-cards', () => {
    cy.get('[data-test-id=MovieCard]').should('have.length', 20)
  })

  it('should contains more movie-cards after click load more', () => {
    cy.get('[data-test-id=SeeMoreButton]').click()
    cy.get('[data-test-id=MovieCard]').should('have.length.greaterThan', 20)
  })

  it('should contains a sort select with most recent by default', () => {
    cy.get('[data-test-id=SortSelect]').contains('Most Recent')
  })
})