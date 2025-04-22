import{ cpf } from 'cpf-cnpj-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { faker } from '@faker-js/faker';


const geradorCPF = cpf.generate();
const geradorCNPJ = cnpj.generate();
const nomeUsuario = faker.person.firstName();
const numeroTelefone = faker.phone.number('###########'); // 11 dígitos
console.log('Número de telefone gerado:', numeroTelefone);
const email = `vsoetani+${geradorCPF}@tmbeducacao.com.br`;



describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://dev.produtor.tmbeducacao.com.br/login')
    cy.Login('vsoetani+uscontrato@tmbeducacao.com.br', 'TMB.WUL]Ew!IRk]L')
    cy.wait(3000)
    cy.contains('Configurações').click()
    cy.get('.ml-6 > .text-sm').contains('Produtores').click()
    cy.contains('Cadastrar Produtor').click()

    cy.contains('Nome do Produtor').type(`${nomeUsuario} ${nomeUsuario}`)

    cy.get('#cnpj_produtor').type(geradorCNPJ)

cy.contains('Razão Social').type(nomeUsuario)
cy.contains('Representante legal').type(`${nomeUsuario} ${nomeUsuario}`)
cy.get('#cpf_representante_produtor').type(geradorCPF)

cy.contains('E-mail do representante').type(email)

cy.get('#telefone_contato_focal').type(numeroTelefone)

cy.contains('Salvar').click()

cy.intercept(
  'GET',
  'https://k8s-api-produtor-dev.tmbeducacao.com.br/api/Usuario/ObterPermissaoDaCentral/46851762-47a4-4823-a29b-fcafede3f43f'
).as('getPermissaoCentral')

// Etapa 1 - Navegando para cadastro de novo produto
cy.contains('Produtos').click();
cy.get('[href="/produto"]').contains('Produtos').click();
cy.contains('div', 'Novo Produto').click();
cy.wait(3000);
cy.contains('div', 'Avançar').click();

// Etapa 2 - Preenchendo informações básicas do produto
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

// Etapa 3 - Configurando detalhes do produto
cy.get('#titulo').type('https://www.youtube.com/watch?v=PsO6ZnUZI0g');
cy.get(':nth-child(2) > .py-2 > .text-left > .block').type('1500');
cy.get('#prazo_arrependimento').type('7');
cy.get('.bg-tmb-primaria > .flex').click();
cy.get(':nth-child(1) > .flex > .h-6').click();
cy.get('.bg-tmb-primaria > .flex', { timeout: 10000 }).should('exist').click();
cy.contains('Avançar').click();
cy.get('.bg-tmb-primaria > .flex', { timeout: 10000 }).should('exist').click();
cy.wait(3000);

// Etapa 4 - Configurações de renovação e preço
cy.contains('div', 'Avançar').click();
cy.get('input[type="checkbox"].peer').check({ force: true });
cy.get(':nth-child(4) > .w-11').click({ force: true });
cy.get('#renovacao_apos_efetivacao_em').type('365');
cy.get('#titulo').type('Renovação');
cy.get('input[name="valor_principal"]').type('1500');
cy.contains('div', 'Avançar').click();

// Finalização do cadastro
cy.contains('div', 'Enviar cadastro').click();



    
    
    
  })
})