import{ cpf } from 'cpf-cnpj-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { faker } from '@faker-js/faker';


const geradorCPF = cpf.generate();
const geradorCNPJ = cnpj.generate();
const nomeUsuario = faker.person.firstName();
const numeroTelefone = faker.phone.number('###########'); // 11 dígitos
console.log('Número de telefone gerado:', numeroTelefone);



describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://dev-pay.tmbeducacao.com.br/KhamzatChima/A2Z5703YB')
    cy.get('[data-cy="btn_comecar"] > .flex').click()
    function gerarCPFValido() {
      let cpf;
      do {
        cpf = gerarNovoCPF(); // Substitua por sua lógica de geração de CPF
      } while (parseInt(cpf.slice(-1)) >= 7);
      return cpf;
    }
    cy.DadosBásicos(geradorCPF, nomeUsuario, numeroTelefone)
    cy.CódigodeVerificação()
    cy.contains('label.text-sm.text-neutral-900', 'Entrada + 5x R$').click()
    cy.contains('label', 'Dia 20').click()
    cy.get('.flex.flex-row.gap-2.items-center.justify-center div').contains('Avançar').click()
    cy.get('[data-cy="numero"]').type('365')
    cy.get('[data-cy="btn_avancar"] > .flex').click()
    cy.assinarContrato()
    
    
  })
})