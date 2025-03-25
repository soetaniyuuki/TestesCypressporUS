describe('template spec', () => {
  it('passes', () => {
    cy.Visit();
    cy.Login('vsoetani+PA@tmbeducacao.com.br', 'TMB.0BR5');

    cy.get(':nth-child(17) > div.flex-col > .duration-150 > .flex-row > :nth-child(2) > .flex')
      .click()
      .then(() => {
        cy.contains('Recebimentos').click();

        cy.get('input#recebimento')
          .should('be.visible')
          .should('not.be.disabled')
          .click()
          .then(() => {
            cy.get('[role="listbox"]')
              .find('li')
              .first()
              .should('be.visible')
              .click();

            // Seleciona o produtor
            cy.get('#produtor').click();
            cy.get('.MuiAutocomplete-popper li').first().click();

            // Interage com o banco
            cy.get('.flex-wrap > .w-full').click();
            cy.get('#banco').click();
            cy.get('.MuiAutocomplete-popper li')
              .should('be.visible')
              .then(($options) => {
                const randomIndex = Math.floor(Math.random() * $options.length);
                cy.wrap($options[randomIndex]).click();
              });

            // Preenche agência e conta
            const randomNumber4digits = Math.floor(1000 + Math.random() * 9000).toString();
            cy.get('#agencia').type(randomNumber4digits);

            const randomNumber8digits = Math.floor(10000000 + Math.random() * 90000000).toString();
            cy.get('#numero_conta').type(randomNumber8digits);

            // Preenche o dígito da conta
            cy.get('#digito_conta').type('1');

            // Valida a conta
            cy.get('.undefined.tmb-h3-semibold-mobile')
              .contains('Validar Conta')
              .click();

            // Intercepta a requisição e aguarda
            cy.intercept(
              'GET',
              '**/api/ContaRecebimento/ObterContasRecebimento/Produtor/2010?membro_id=e525b3c1-5eeb-4c26-82c9-3edd1937f9e5'
            ).as('getFechar');
            cy.wait('@getFechar');

            // Clica no botão "Fechar"
            cy.contains('div', 'Fechar', { timeout: 10000 }).click();

            // Clica na primeira validação de conta
            cy.contains('Validar Conta').first().click();

            // Preenche o valor depositado
            cy.get('input[name="valor_depositado"]').type('100');

            // Confirma o valor três vezes
            cy.contains('div', 'Confirmar Valor').click();
            cy.contains('div', 'Confirmar Valor').click();
            cy.contains('div', 'Confirmar Valor').click();
            
          });
      });
  });
});
