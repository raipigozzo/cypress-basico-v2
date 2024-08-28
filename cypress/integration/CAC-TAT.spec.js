/// <reference types="Cypress" />

const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste, '


describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Raielle')
        cy.get('#lastName').type('Pigozzo Mendes')
        cy.get('#email').type('raiely39@gmail.com')
        cy.get('#open-text-area').type(longText, { 'delay': 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Raielle')
        cy.get('#lastName').type('Pigozzo Mendes')
        cy.get('#email').type('raiely39@.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
        cy.get('#phone')
            .type('abcd')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Raielle')
        cy.get('#lastName').type('Pigozzo Mendes')
        cy.get('#email').type('raiely39@gamil.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos  nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Raielle').should('have.value', 'Raielle')
            .clear().should('have.value', '')

        cy.get('#lastName').type('Pigozzo Mendes').should('have.value', 'Pigozzo Mendes')
            .clear().should('have.value', '')

        cy.get('#email').type('raiely39@gmail.com').should('have.value', 'raiely39@gmail.com')
            .clear().should('have.value', '')

        cy.get('#phone').type('12345678912').should('have.value', '12345678912')
            .clear().should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

    })

    it('envia o formuário com sucesso usando um comando customizado e nomes customizados', function () {
        cy.fillMandatoryFieldsAndSubmitCustom('rosa', 'cristina', 'rosa@gmail.com', 'teste custom')

    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste, '
        cy.get('#firstName').type('Raielle')
        cy.get('#lastName').type('Pigozzo Mendes')
        cy.get('#email').type('raiely39@gmail.com')
        cy.get('#open-text-area').type(longText, { 'delay': 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1)
            .should('have.value', 'blog')

    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2).check()
            .last().uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy > a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy > a').invoke('removeAttr', 'target').click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('validação que a mensagem de sucesso aparece e desaparece após 3s', function(){
        cy.clock()    
        cy.get('#firstName').type('rai')
        cy.get('#lastName').type('pm')
        cy.get('#email').type('r@gmail.com')
        cy.get('#open-text-area').type('o')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    it('validação que a mensagens de erro aparece e desaparece após 3s', function (){
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')

    })

    Cypress._.times(2, () => {
        it('estabilida da validação que a mensagens de erro aparece e desaparece após 3s', function (){
            cy.clock()
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
            cy.tick(3000)
            cy.get('.error').should('not.be.visible')
    
        })   
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    it('preenche a area de texto usando o comando invoke', function(){
        cy.get('#open-text-area').invoke('val', longText)
        .should('have.value', longText)
     })
     
     it('faz uma requisição HTTP', function(){
        cy.request({
            method:'GET', 
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).should((response) => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK')
            expect(response.body).to.contains('CAC TAT')
          })
     })

     it('econtre o gato', function(){
        cy.get('#cat').invoke('show').should('be.visible')
     })

})

