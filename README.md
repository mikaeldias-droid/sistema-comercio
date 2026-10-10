# Sistema Web para Organização de Pequeno Comércio

Projeto Integrador desenvolvido para a disciplina de Projeto Integrador, do curso de Tecnologia em Sistemas para Internet — UESPI.

## Grupo

- Edinael de Carvalho Nunes
- Eliade Dias Pereira
- Juana Elen de Sousa e Silva
- Manoel Alves Vieira Junior
- Mikael Dias Plácido

## Sobre o projeto

Sistema para auxiliar pequenos comerciantes na gestão do dia a dia: cadastro de usuários, controle de produtos e estoque.

## Tecnologias utilizadas

- React
- Vite
- React Router DOM
- JavaScript
- CSS

## Telas implementadas

- Login
- Cadastro de Usuários (CRUD integrado à API)
- Cadastro de Produtos (CRUD integrado à API)
- Controle de Estoque (integrado à API)

## Como rodar o projeto

Para o funcionamento completo da aplicação, **é necessário rodar a API (backend) e o frontend simultaneamente**:

### 1. Iniciar a API (Backend)
Na pasta do backend (`sistema-comercio-api`), instale as dependências e inicie o servidor:
```bash
npm install
npm run dev
```
A API subirá em `http://localhost:3000`.

### 2. Iniciar o Frontend (React + Vite)
Na pasta deste projeto (`sistema-comercio`), instale as dependências e inicie o servidor de desenvolvimento:
```bash
npm install
npm run dev
```
O frontend abrirá em `http://localhost:5173` (ou outra porta indicada pelo Vite).

> **Atenção:** Mantenha os dois terminais rodando (`npm run dev` nas duas pastas) para que o frontend consiga se comunicar com a API e salvar os dados no banco SQLite.

## Gerenciamento do projeto

O board do Trello com o backlog e a organização das sprints pode ser acessado em:
https://trello.com/b/kXcDqxvR/sistema-web-pequeno-comercio

## Repositórios

- **Frontend:** https://github.com/mikaeldias-droid/sistema-comercio
- **Backend (API):** https://github.com/mikaeldias-droid/sistema-comercio-api