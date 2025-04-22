import { cpf, cnpj } from 'cpf-cnpj-validator';
import { faker } from '@faker-js/faker';

// Geração de dados aleatórios
const geradorCPF = cpf.generate();
const geradorCNPJ = cnpj.generate();
const nomeUsuario = faker.person.firstName();
const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);

describe('Navegação na Navbar', () => {
  it('Deve navegar corretamente pelo menu de configurações', () => {
    // Navegação e login
    cy.visit('https://dev.produtor.tmbeducacao.com.br/login');
    cy.Login('vsoetani+winters@tmbeducacao.com.br', 'Yuuki123@');
    cy.get('.mb-4 > :nth-child(1) > .items-center').click();
    cy.contains('[role="option"]', 'Ethan Winters').click()
    cy.wait(2000)
    cy.get(':nth-child(2) > .text-\\[\\#EDEDED\\] > .my-2').contains('Produtos').click()
    cy.contains('a', 'Produtos').click();
    
    
    cy.get('a[href="/ofertas"]').contains('Ofertas').click()
    cy.wait(2000)
    
    cy.get('a[href="/gestaoLink"]').contains('Gestão de Link').click()
    cy.wait(2000)
    
    cy.get('a[href="/configuracoes/integracoes"]').contains('Integrações').click()

    cy.contains('div', 'Central de vendas').click()
    cy.get('[href="/transacoes"]').contains('Vendas').click()
    cy.wait(2000)
    cy.contains('a', 'Recuperação de Vendas').click()
    cy.wait(2000)
    cy.contains('a', 'Rastreamento de Vendas').click()
    cy.wait(2000)
    cy.contains('a', 'Cancelados').click()

    
    cy.contains('div', 'Finanças e contratos').click()
    cy.contains('a', 'Carteira').click()
    cy.wait(2000)
    cy.contains('a', 'Contratos').click()
    cy.wait(2000)
    cy.contains('a', 'Contas a Receber').click()
    cy.wait(2000)
    cy.contains('a', 'Taxas').click()
    cy.wait(2000)
    cy.contains('a', 'Relatório Financeiro').click()
    cy.wait(2000)
    cy.contains('a', 'Extrato Anteriores').click()

    cy.get(':nth-child(5) > .text-\\[\\#EDEDED\\] > .my-2').contains('Programa de Indicação').click()
    cy.contains('a', 'Indicados').click()
    cy.wait(2000)
    cy.contains('a', 'Comissão dos Indicados').click()


    cy.contains('div', 'Dashboard').click()
    cy.contains('a', 'Cobrança').click()
    cy.wait(2000)

    
    cy.contains('div', 'Coprodução').click()
    cy.contains('a', 'Conta').click();
    cy.wait(2000)
    cy.contains('a', 'Participações').click()
    cy.wait(2000)
    cy.contains('a', 'Comissões').click()

    cy.contains('div', 'Configurações').click()
    cy.contains('a', 'Produtores').click();
    cy.wait(2000)
    cy.contains('a', 'Recebimentos').click()
    cy.wait(2000)
    cy.contains('a', 'Credenciais').click();
    cy.wait(2000)
    cy.contains('a', 'Usuários e permissões').click();

    cy.contains('div', 'Conta').click()
    cy.wait(2000)

    cy.contains('div', 'Central de Comunicação').click()
    cy.wait(2000)
    cy.contains('a', 'Ajuda')
    cy.wait(2000)
    cy.contains('a', 'Canais de Atendimento').click()
    cy.wait(2000)
    cy.contains('a', 'Notificações').click();
  });
});