describe('template spec', () => {
  it('passes', () => {
    cy.Visit()
    cy.Login('vsoetani+TesteSimulador@tmbeducacao.com.br', 'TMB.Q2IK')
    cy.intercept('GET', '/api/CondicaoComercialLink/MeusNovosLinksLiberados?membro_id=a5e38e8d-e75d-4eb7-9339-d6d90741c331').as('getLinks');
    
    cy.get(':nth-child(4) > .gap-4 > :nth-child(2) > .bg-tmb-primaria > .items-center')
      .contains('Simular')
      .click();
    
    // Generate random value between 1 and 19999
    const randomValue = Math.floor(Math.random() * 19999) + 1;
    
    // Type the random value into the decimal input
    cy.get('input[inputmode="decimal"][placeholder="R$ 0,00"]')
      .should('be.visible')
      .should('not.be.disabled')
      .clear()
      .type(randomValue.toString());
      

      cy.get('input[inputmode="numeric"]').then($input => {
        const maxLength = 15;
        const randomLength = Math.floor(Math.random() * maxLength) + 1; // Define um comprimento aleatório entre 1 e 15
        const randomValue = Math.floor(Math.random() * Math.pow(10, randomLength)).toString(); // Gera um número com até 15 dígitos
        cy.wrap($input).clear().type(randomValue);
        cy.get('button[role="switch"]').click()
        

        const sevenPercent = Math.round(randomValue * 0.007);

        cy.get('#input_entrada').clear().type(sevenPercent.toString());
        
      });
  });
});