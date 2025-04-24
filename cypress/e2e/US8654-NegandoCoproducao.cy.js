import { cpf } from 'cpf-cnpj-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { faker } from '@faker-js/faker';

// Geração de dados aleatórios
const geradorCPF = cpf.generate();
const geradorCNPJ = cnpj.generate();
const nomeUsuario = faker.person.firstName();
const numeroTelefone = faker.phone.number('###########'); // 11 dígitos
const email = `vsoetani+${geradorCPF}@tmbeducacao.com.br`;

describe('Cadastro de Produto', () => {
  it('Deve cadastrar um novo produto com sucesso', () => {
    // Ignora erros de JS que não quebram o fluxo de teste
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Navegação e login
    cy.visit('https://dev.produtor.tmbeducacao.com.br/login');
    cy.Login('vsoetani+uscontrato@tmbeducacao.com.br', 'Yuuki123@');
    cy.wait(3000);

    // Acessando a página de produtos
    cy.contains('Produtos').click();
    cy.get('[href="/produto"]').contains('Produtos').click();
    cy.contains('div', 'Novo Produto').click();
    cy.wait(3000);
    cy.contains('div', 'Avançar').click();

    // Etapa 2 - Informações básicas
    cy.get('#produto_exibicao_externa').type(`${nomeUsuario} ${nomeUsuario}`);
    cy.get('#produto').type(nomeUsuario);
    cy.get('#carga_horaria').type('40');
    cy.get('#selectProdutor').select('Empreendedor');
    cy.get('#acesso_plataforma').type('https://www.youtube.com/watch?v=eW6grMy_wnU');
    cy.get('#contato').type('https://www.youtube.com/watch?v=eW6grMy_wnU');
    cy.get('#mentoria').type(
      'Mada kono sekai wa boku wo kainarashitetai mitai da Nozomi doorikainarashitetaikainarashitetaikainarashitetaikainakainarashitetaikainarashitetaikainarashitetairashitetaikainarashitetai ii darou utsukushiku mogaku yo T you na egao de'
    );
    cy.contains('Avançar').click();

    // Etapa 3 - Detalhes do produto
    cy.get('#titulo').type('https://www.youtube.com/watch?v=PsO6ZnUZI0g');
    cy.get(':nth-child(2) > .py-2 > .text-left > .block').type('1500');
    cy.get('#prazo_arrependimento').type('7');
    cy.get('.bg-tmb-primaria > .flex').click();
    cy.get(':nth-child(1) > .flex > .h-6').click();
    cy.get('.bg-tmb-primaria > .flex', { timeout: 10000 }).should('exist').click();
    cy.contains('Avançar').click();
    cy.get('.bg-tmb-primaria > .flex', { timeout: 10000 }).should('exist').click();
    cy.wait(3000);

    // Etapa 4 - Renovação
    cy.contains('div', 'Avançar').click();
    cy.get('input[type="checkbox"].peer').check({ force: true });
    cy.get(':nth-child(4) > .w-11').click({ force: true });
    cy.get('#renovacao_apos_efetivacao_em').type('365');
    cy.get('#titulo').type('Renovação');
    cy.get('input[name="valor_principal"]').type('1500');
    cy.contains('div', 'Avançar').click();

    // Finalização do cadastro
    cy.contains('div', 'Enviar cadastro').click();
    cy.contains('div', 'Enviar cadastro').should('not.exist'); // Garante que saiu da tela de envio
    
    // Navegação para a página de produtos
    cy.visit('https://dev.produtor.tmbeducacao.com.br/produto');

    // Ações no produto criado
    cy.get('.MuiDataGrid-row').first().find('button').click();
    cy.get(':nth-child(4) > .false > .rounded-full > .text-white').click();
    cy.get('.bg-tmb-terciaria > .flex > .undefined').contains('Novo Coprodutor').click();
    cy.get('#coprodutor_nome').type(`${nomeUsuario} ${nomeUsuario}`)
    cy.get('#coprodutor_email').type('vsoetani+us8654@tmbeducacao.com.br')
    cy.get('#percentual_comissao').type('20')
    cy.get('#data_inicio').type('2025-04-30')
    cy.get('#data_termino').type('2025-05-08')
    cy.get('.h-6').click()
    cy.get('.bg-tmb-primaria > .flex').contains('Enviar Convite').click()
    

  });
});

describe('Aceitando coprodução', () => {
  it('Deve aceitar um novo coprodutor', () => {
    // Navegação e login
    cy.visit('https://dev.produtor.tmbeducacao.com.br/login');
    cy.wait(5000);
    cy.Login('vsoetani+us8654@tmbeducacao.com.br', 'TMB.Nb],jUWd%7&o');

    // Navegação no menu
    cy.contains('div', 'Finanças e contratos').click();
    cy.contains('a', 'Contratos').click();
    cy.contains('button', 'Recusar').first().click()
    cy.wait(2000)
    cy.get('button.inline-flex.items-center.justify-center.gap-2.whitespace-nowrap.rounded-md.text-sm.bg-negative-500')
  .eq(0) // ou outro índice se houver mais de um
  .click({ force: true });

  

  });
});



