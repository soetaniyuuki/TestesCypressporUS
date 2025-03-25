import{ cpf } from 'cpf-cnpj-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { faker } from '@faker-js/faker';
const geradorCPF = cpf.generate();
const geradorCNPJ = cnpj.generate();
const nomeUsuario = faker.person.firstName();
describe('Automação TMB Educação', () => {
  it('Executa fluxo de login e navegação', () => {
      cy.visit('https://dev.produtor.tmbeducacao.com.br');

      cy.get('input#login')
        .type('vsoetani+winters@tmbeducacao.com.br');
      
      cy.get('input#senha')
        .type('TMB.5D9V');
      
      cy.get('button[type="submit"]').click();

      cy.contains('Coprodução').scrollIntoView();
      
      cy.get('aside button').eq(2).click();
      
      cy.get('div[role="combobox"]').click();
  });
});
