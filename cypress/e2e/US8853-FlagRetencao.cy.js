describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://dev.produtor.tmbeducacao.com.br/login')
    cy.Login('vsoetani+winters@tmbeducacao.com.br', 'Yuuki123@')
    cy.intercept('GET', 'https://k8s-api-produtor-dev.tmbeducacao.com.br/api/Usuario/ObterMinhasCentrais')
  .as('getMinhasCentrais')
  cy.wait('@getMinhasCentrais')
    cy.get('.mb-4 > :nth-child(1) > .items-center').click();
    cy.wait(1000)

    cy.get('[role="option"]')
  .eq(1)
  .contains('Ethan Winters')
  .click({ force: true });

    cy.contains('div', 'Central de vendas').click()
    cy.wait(2000)
    cy.contains('a', 'Vendas').click()
    cy.get('.MuiDataGrid-cell .uil-ellipsis-v').first().click()
    cy.contains('button', 'Cancelar').click();
    cy.get('select[name="motivo_cancelamento"]').select('Insatisfação com o Curso')
    cy.get('#descricao').type('estou insatisfeito com este curso')
    cy.get('.w-11').click().click()
    cy.contains('div', 'Enviar Solicitação').click()
    cy.contains('button', 'Confirmar').click()



  })
})