import { cpf } from 'cpf-cnpj-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { faker } from '@faker-js/faker';

const geradorCPF = cpf.generate();
const geradorCNPJ = cnpj.generate();
const nomeUsuario = faker.person.firstName();

describe('template spec', () => {
  it('passes', () => {
    
  cy.Visit()
  cy.Login('vsoetani+PA@tmbeducacao.com.br', 'TMB.0BR5')
  cy.Etapa1()
  cy.Etapa2(nomeUsuario)
  cy.Etapa3()
  cy.Etapa4a6()
      
    
  });
});