describe('Cadastro de Produto', () => {
  it('Deve cadastrar um novo produto com sucesso', () => {
    // Ignora erros de JS que não quebram o fluxo de teste
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Navegação e login
    cy.visit('https://dev.produtor.tmbeducacao.com.br/login');
    cy.Login('admin', 'Senha.1234');
    cy.wait(10000);
    cy.get('.mb-4 > :nth-child(1) > .items-center').click();
    cy.get('input[placeholder="Procurar"]').type('Seu Chapatimm');
    cy.contains('div', 'Seu Chapatimm')
  .click({ force: true })
  cy.visit('https://dev.produtor.tmbeducacao.com.br/contratosDocumentos')
  cy.get(':nth-child(1) > .items-start > .items-center > .bg-neutral-500').click()
  cy.get('button.p-1.rounded').last().click({ force: true })
  


    
    
    
    
  });
});
