cy.visit('https://dev.produtor.tmbeducacao.com.br/login', {
  headers: {
    'Authorization': 'Bearer seuToken',
    'Custom-Header': 'seuValor'
  }
});

// Clicar no botão "Assinar"
cy.contains('button', 'Assinar').click();

