import { cpf, cnpj } from 'cpf-cnpj-validator';
import { faker } from '@faker-js/faker';

const geradorCPF = cpf.generate();
const geradorCNPJ = cnpj.generate();
const nomeUsuario = faker.person.firstName();
const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);

describe('template spec', () => {
  it('passes', () => {
    cy.Visit(); // Corrigido "Visit" para "visit"
    cy.Login('vsoetani+CriacaodeOferta@tmbeducacao.com.br', 'TMB.EG4K');

    cy.contains('.flex.gap-3.pl-3.items-center.flex-1', 'Ofertas').click();
    cy.get('.flex.gap-2 > .bg-tmb-primaria > .flex').click();
    cy.get('#produto_id').click();
    cy.get('ul[role="listbox"] li').first().click();

    // Preenche o campo de título com nome aleatório
    cy.get('#titulo').type(`Oferta ${nomeUsuario}`);

    // Digita um número aleatório de 4 dígitos
    cy.get('.text-left > .block').type(numeroAleatorio.toString());

    cy.get('.bg-tmb-primaria > .flex').click();

    // Clica em uma quantidade aleatória de botões
    const quantidadeAleatoria = Math.floor(Math.random() * 14) + 1; // Entre 1 e 14
    const botoesSelecionados = new Set(); // Usando um Set para evitar repetição

    while (botoesSelecionados.size < quantidadeAleatoria) {
      const indiceBotao = Math.floor(Math.random() * 14) + 1;

      if (!botoesSelecionados.has(indiceBotao)) {
        botoesSelecionados.add(indiceBotao);
        cy.get(`:nth-child(${indiceBotao}) > .flex > .h-6`).click();
        cy.get('.bg-tmb-primaria > .flex').click();
      }
    }
  });
});
