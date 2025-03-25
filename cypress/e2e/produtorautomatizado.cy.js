import { faker } from '@faker-js/faker';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const geradorDeNome = faker.person.fullName().replace(/[^a-zA-Z\s]/g, '');
const geradorDeCPF = cpf.generate();
const geradorDeCNPJ = cnpj.generate();

describe('Cadastro de Produtor', () => {
  it('deve cadastrar um novo produtor com sucesso', () => {
    // Tela de login
    cy.login('estevaolelisteste1+gandalf@gmail.com', 'TMB.C8I4');

    // Acessa a tela de cadastro de produtor
    cy.get('button').contains('Produtores').click();
    cy.intercept('GET', '**/produtores/novo*').as('produtorNovo');
    cy.wait('@produtorNovo');
    cy.get('button').contains('Cadastrar Produtor').click();

    // Preenche o formulário com dados fictícios
    cy.preencherProdutor(geradorDeNome, geradorDeCPF, geradorDeCNPJ);

    // Salva o cadastro
    cy.get('button').contains('Salvar').click();
  });
});