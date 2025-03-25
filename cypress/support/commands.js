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



  Cypress.Commands.add('Login', (email, senha) => {
    cy.get('input#login').should('be.visible').and('be.enabled').click().type(email);
    cy.get('input#senha').should('be.visible').and('be.enabled').type(senha);
    cy.get('button[type="submit"]').click();
    });

  Cypress.Commands.add('Etapa2', (nome) => {
    cy.get('#produto_exibicao_externa').type(`${nome} ${nome}`);
    cy.get('#produto').type(nome);
    cy.get('#carga_horaria').type('40');
    cy.get('#selectProdutor').select('Empreendedor');
    cy.get('#acesso_plataforma').type('https://www.youtube.com/watch?v=eW6grMy_wnU');
    cy.get('#contato').type('https://www.youtube.com/watch?v=eW6grMy_wnU');
    cy.get('#mentoria').type(
      'Mada kono sekai wa boku wo kainarashitetai mitai da Nozomi doorikainarashitetaikainarashitetaikainarashitetaikainakainarashitetaikainarashitetaikainarashitetairashitetaikainarashitetai ii darou utsukushiku mogaku yo T you na egao de'
    );
    cy.contains('Avançar').click();
  });


  Cypress.Commands.add('Etapa3', () => {
    cy.intercept('POST', '**/api/Produto?membro_id=e525b3c1-5eeb-4c26-82c9-3edd1937f9e5').as('getTitulo');
    cy.wait('@getTitulo', { timeout: 10000 });
    cy.get('#titulo').type('https://www.youtube.com/watch?v=PsO6ZnUZI0g');
    cy.get(':nth-child(2) > .py-2 > .text-left > .block').type('1500');
    cy.get('#prazo_arrependimento').type('7');
    cy.get('.bg-tmb-primaria > .flex').click();
    cy.get(':nth-child(1) > .flex > .h-6').click();
    cy.get('.bg-tmb-primaria > .flex', { timeout: 10000 }).should('exist').click();
    cy.contains('Avançar').click();
    cy.get('.bg-tmb-primaria > .flex', { timeout: 10000 }).should('exist').click();
  });
  

  Cypress.Commands.add('Etapa4a6', () => {
    cy.intercept('GET', '**/api/ContaRecebimento/ObterContasRecebimento/Produtor/2010?membro_id=e525b3c1-5eeb-4c26-82c9-3edd1937f9e5').as('testando');
    cy.wait('@testando', { timeout: 10000 });
    cy.get('.bg-tmb-primaria > .flex').click();
    cy.get('#renovacao_apos_efetivacao_em', { timeout: 10000 }).should('exist').click().type('365');
    cy.get('#titulo').click().type('Automated Products');
    cy.get('input[name="valor_principal"]').click().type('1700');
    cy.contains('Avançar').click();
    cy.contains('Enviar cadastro').click();
    
  });


  Cypress.Commands.add('Visit', () => {
    cy.visit('https://dev.produtor.tmbeducacao.com.br/login', {
      headers: {
        'User-Agent': 'server-tmb'
      }
    });
  });


  Cypress.Commands.add('Etapa1', () => {
    cy.get('a > .bg-tmb-primaria > .justify-center > .undefined > .flex').contains('Novo Produto').click();
    cy.intercept('GET', '**/api/Produtor?membro_id=e525b3c1-5eeb-4c26-82c9-3edd1937f9e5').as('getAvancar');
    cy.wait('@getAvancar', {timeout: 10000});
    cy.contains('div', 'Avançar').should('be.visible').click()
  });

  //// assinar contrato
Cypress.Commands.add('assinarContrato', () => {
  cy.intercept('POST', `https://docuseal.com/embed/s/**`).as('docuseal');

    cy.get('docuseal-form')
      .shadow() // Entre no shadow DOM do elemento
      .find('#expand_form_button')
      .click();

    cy.get('docuseal-form')
      .shadow()
      .find('#type_text_button')
      .click();

    cy.get('docuseal-form')
      .shadow()
      .find('#signature_text_input')
      .type('QA QA');

    cy.get('docuseal-form')
      .shadow()
      .find('#submit_form_button')
      .click();

    cy.wait('@docuseal')
})

Cypress.Commands.add('DadosBásicos', (geradorCPF, nomeUsuario, numeroTelefone) => {
  cy.get('input[placeholder="CPF"]').type(geradorCPF)
    cy.get('[data-cy="nome"]').type(`${nomeUsuario} ${nomeUsuario}`)
    cy.get('[data-cy="email"]').type(`vsoetani+${geradorCPF}frtelefone@tmbeducacao.com.br`)
    cy.get('.react-tel-input > .bg-tmb-input').type(numeroTelefone)
    cy.get('input[placeholder="CEP"]').type('12233360')
    cy.contains('div', 'Avançar').click()
});

Cypress.Commands.add('CódigodeVerificação', () => {
  cy.get('input[data-input-otp="true"]').type('2021')
    cy.get('.flex.flex-row.gap-2.items-center.justify-center div').contains('Avançar').click()
});


Cypress.Commands.add('login', (email, senha) => {
 
  cy.visit('https://dev.produtor.tmbeducacao.com.br/');
  cy.get('input[name="login"]', { timeout: 20000 })
    .should('exist')
    .type(email);
  cy.get('input[name="senha"]')
    .should('exist')
    .type(senha);
  cy.get('button[type="submit"]').should('exist').click();
});


Cypress.Commands.add('preencherProdutor', (nome, cpf, cnpj) => {
  
  cy.get('input[id="nome"]').should('exist').type(nome);
  cy.get('input[id="cnpj_produtor"]').type(cnpj);
  cy.get('input[id="instituicao_treinamento"]').type(nome);
  cy.get('input[id="representante_produtor"]').type('teste Automatizado');
  cy.get('input[id="cpf_representante_produtor"]').type(cpf);
  cy.get('input[id="email_representante_produtor"]').type(`estevaolelisteste1+${cnpj}@gmail.com`);
  cy.get('input[id="telefone_contato_focal"]').type('12983040170');
});


Cypress.Commands.add('preencherUsario', (nome, cpf, cargo) => {
  
  cy.get('input[id="email"]').type(`estevaolelisteste1+${cpf}@gmail.com`);
  cy.get('input[type="tel"]').type('12983040170');
  cy.get('input[id="nome"]').type(nome, cargo);
  cy.get('input[id="perfil_id"]').click();
});