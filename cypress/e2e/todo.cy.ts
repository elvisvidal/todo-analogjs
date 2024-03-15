describe('Todo Application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should add a new todo', () => {
    // the first interaction seems to need a bigger delay to run perfect
    cy.get('.new-todo-input')
      .clear()
      .type('Learn Cypress{enter}', { delay: 200 });
    cy.get('.todo-list').should('contain', 'Learn Cypress');
  });

  it('Should toggle todo completion', () => {
    cy.get('.new-todo-input')
      .clear()
      .type('Learn Vue.js{enter}', { delay: 100 });
    cy.get('.todo-item:first .toggle').click();
    cy.get('.todo-item:first').should('have.class', 'completed');
  });

  it('Should delete a todo', () => {
    cy.get('.new-todo-input')
      .clear()
      .type('Test deletion{enter}', { delay: 100 });
    cy.get('.todo-item:first .delete-button').click();
    cy.get('.todo-list').should('not.contain', 'Test deletion');
  });
});
