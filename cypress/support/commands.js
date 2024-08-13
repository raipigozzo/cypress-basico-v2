// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Raielle')
    cy.get('#lastName').type('Pigozzo Mendes')
    cy.get('#email').type('raiely39@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitCustom', (name, lastnamme, email, texto) =>  {
    cy.get('#firstName').type(name)
    cy.get('#lastName').type(lastnamme)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(texto)
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
})



