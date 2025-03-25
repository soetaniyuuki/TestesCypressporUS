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
    cy.intercept('GET', '**/api/Usuario/ObterMinhasCentrais').as('login')
    cy.wait('@login')
    cy.get('div.text-md.p-0').contains('Produtos').click()
    cy.intercept('**/api/Produtor?membro_id=e525b3c1-5eeb-4c26-82c9-3edd1937f9e5').as('MaisOpçoes')
    cy.wait('@MaisOpçoes')
    cy.get('[data-id]')
  .then($elements => {
    const ids = [...$elements].map(el => parseInt(el.getAttribute('data-id')))
    const maxId = Math.max(...ids)
    return maxId.toString()
  })
  .then(latestId => {
    cy.get(`[data-id="${latestId}"] > [data-field="id"]`).click()
  })
  //cy.intercept('**/api/Produto/3393?membro_id=e525b3c1-5eeb-4c26-82c9-3edd1937f9e5').as('Info')
  //cy.wait('@Info', { timeout: 30000 })
  cy.get(':nth-child(1) > .false > .rounded-full > .text-white').click()
  cy.get('#produto').type(nomeUsuario)
    cy.get('#carga_horaria').clear().type('35')
    cy.get(':nth-child(4) > .py-2 > .text-left > .undefined').clear().type('1700')
    cy.get('#prazo_arrependimento').clear().type('10')
    cy.get('#selectProdutor').select('Autoconhecimento')
    cy.get('#acesso_plataforma').clear().type('https://dev.produtor.tmbeducacao.com.br/login?then=/dashboard')
    cy.get('#contato').clear().type('https://dev.produtor.tmbeducacao.com.br/login?then=/dashboard')
    cy.get('#mentoria').clear().type('Kimi no naka ni aru aka to aoki sesorera ga musubareru no wa shin no zoukaze no naka demo makenai you na koe detodokeru kotoba wo ima wa sodateterutoki wa makuragikaze wa niki hadahoshi wa ubusu nahito wa kagerou')
    cy.get('#id_externo').type('teste teste')

    cy.get('#data_termino').clear().type('2025-02-26')
    cy.contains('div', 'Atualizar').click()


  
    
  })
})