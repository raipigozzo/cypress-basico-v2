describe('Central de Atendimento ao Cliente TAT - Política de privacidade', function () {
    
    it('verifica o título da aplicação do privaci', function () {
        cy.visit('./src/privacy.html')
            .title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})
