# Contents
- [Português (Brasil)](#português-brasil)
- [English](#english)

---

# Português (Brasil)

# Sistema de Pré-Cadastro e Fila de Atendimento - Desafio da Cielo

Este repositório contém a implementação de um sistema que atende aos desafios propostos pela Cielo, com foco em pré-cadastro de clientes, gerenciamento de uma fila de atendimento e uma interface de usuário web para gestão dessas funcionalidades.

## Desafio 1: Pré-Cadastro de Clientes

Nesta parte do sistema, foram implementadas as seguintes funcionalidades:

- Cadastro de clientes, tanto Pessoa Jurídica como Pessoa Física, com informações detalhadas, incluindo CNPJ, CPF, Razão Social, Nome, MCC (Merchant Category Code) e Email de contato.
- Validações rigorosas para garantir a consistência e integridade dos dados.
- Operações de criar, alterar, consultar e excluir pré-cadastros de clientes.
- Retorno de status coerente em caso de erros ou ações bem-sucedidas.

## Desafio 2: Fila de Atendimento

Nesta parte do sistema, implementamos uma fila de atendimento para prospects, com as seguintes funcionalidades:

- Todos os novos cadastros ou alterações são automaticamente adicionados ao final da fila.
- Possibilidade de retirar o próximo cliente da fila para atendimento.
- Tratamento de situações em que a fila de atendimento está vazia.

## Desafio 3: Interface de Usuário Web

Desenvolvemos uma aplicação web em React/Angular que consome a API criada nos Desafios 1 e 2. A interface de usuário oferece as seguintes funcionalidades:

- Gerenciamento de pré-cadastro de clientes, incluindo criação, alteração, exclusão e consulta de registros.
- Exibição dos dados dos prospects da fila de atendimento.
- Mensagem amigável quando a fila de atendimento está vazia.
- Responsividade para diferentes dispositivos e tamanhos de tela.
- Acessibilidade, seguindo as diretrizes do WCAG2.
- Design e experiência do usuário de alta qualidade.

## Pré-Requisitos

Certifique-se de ter o seguinte software instalado:

- [Java](https://www.java.com) (para a API)
- [Node.js](https://nodejs.org) (para a aplicação web)

## Começando

1. Clone este repositório.
2. Navegue até a pasta `/server` e siga as instruções para executá-la. (Instruções também disponibilizadas abaixo)
3. Navegue até a pasta `/client` e siga as instruções para executá-la. (Instruções também disponibilizadas abaixo)
4. Acesse a aplicação web em seu navegador (Por padrão, `localhost:3030`).

## Documentação da API

A documentação da API pode ser encontrada no arquivo Swagger fornecido no repositório.

------------------------------------------
------------------------------------------

# Servidor:
  Implementado em JAVA com Spring Boot e Maven.

## Como Rodar
  Para rodar o servidor, acesse a pata `/server` e rode o comando `./mvnw spring-boot:run` 
  Por padrão o servidor estará rodando na porta 8080 do localhost: `localhost:8080`

### Swagger UI
  Swagger UI pode ser acessado a partir do endereço: `localhost:8080/swagger-ui.html`

### Banco de Dados
  O banco de dados não é persisitdo em disco rigido, apenas na memória, portanto será apagado assim que o servidor for finalizado.
  Pode ser acessado:
    - URL: `http://localhost:8080/h2`
    - User Name: `sa`
    - Password: Não há
    - JDBC URL: Fornecido pelo output inicial do Spring B

------------------------------------------
------------------------------------------

# Cliente
Nesta aplicação, é possível cadastrar, consultar, editar e excluir clientes Pessoa Física e Jurídica. Cada cliente cadastrado será adicionado a uma fila de atendimento. Todo cliente que for alterado será movido para o final da fila.

## Navegação Principal
- Início: Verificar se está logado e definir a URL do servidor.
- Adicionar: Adicionar/Cadastrar um novo cliente no Banco de Dados; automaticamente será adicionado à fila.
- Consultar: Consultar clientes cadastrados.
  - Alterar/Excluir: A partir dos botões ao lado de cada cliente listado.
- Tratar Fila: Remove o próximo cliente da fila.

## Rodar a aplicação localmente
Para executar a aplicação localmente:
- Clone este repositório.
- Dentro da pasta raiz do repositório, execute os comandos:

  ```
  npm i
  npm run start
  ```
- A aplicação estará rodando na porta 3000 por padrão [http://localhost:3000](http://localhost:3000). 

## Arquitetura
- /components: Pasta onde estão os componentes a serem utilizados nas páginas.
- /pages: Componentes que atuam como páginas da aplicação, geralmente acessadas através de uma rota.
- /services: Contexto central e serviços.
- ServicesContext.tsx: Contexto central que carrega instâncias únicas de todos os outros serviços:
- ApiService: Responsável pelas chamadas ao servidor.
- I18nService: Responsável pela tradução de tokens.
- LoginService: Gerencia autenticação.

------------------------------------------
------------------------------------------

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Se você encontrar problemas ou tiver melhorias para sugerir, por favor, abra uma [issue](https://github.com/seu-usuario/seu-repositorio/issues) ou envie um [pull request](https://github.com/seu-usuario/seu-repositorio/pulls).

## Licença

Este projeto está sob a Licença [MIT](LICENSE.md).


# English

# Pre-Registration and Queue Management System - Cielo Challenge

This repository contains the implementation of a system that addresses the challenges proposed by Cielo, focusing on pre-registration of customers, queue management, and a web user interface for managing these features.

## Challenge 1: Customer Pre-Registration

In this part of the system, the following features have been implemented:

- Registration of customers, both legal entities and individuals, with detailed information, including CNPJ, CPF, Legal Name, Name, MCC (Merchant Category Code), and contact Email.
- Stringent validations to ensure data consistency and integrity.
- Operations to create, modify, query, and delete customer pre-registrations.
- Consistent status returns in case of errors or successful actions.

## Challenge 2: Queue Management

In this part of the system, we have implemented a queue management for prospects with the following features:

- All new registrations or modifications are automatically added to the end of the queue.
- Ability to remove the next customer from the queue for service.
- Handling situations where the service queue is empty.

## Challenge 3: Web User Interface

We have developed a web application in React/Angular that consumes the API created in Challenges 1 and 2. The user interface offers the following features:

- Management of customer pre-registrations, including creation, modification, deletion, and record queries.
- Display of data for prospects in the service queue.
- User-friendly message when the service queue is empty.
- Responsiveness for different devices and screen sizes.
- Accessibility following WCAG2 guidelines.
- High-quality design and user experience.

## Prerequisites

Make sure you have the following software installed:

- [Java](https://www.java.com) (for the API)
- [Node.js](https://nodejs.org) (for the web application)

## Getting Started

1. Clone this repository.
2. Navigate to the `/server` folder and follow the instructions to run it. (Instructions also provided below)
3. Navigate to the `/client` folder and follow the instructions to run it. (Instructions also provided below)
4. Access the web application in your browser (By default, `localhost:3030`).

## API Documentation

The API documentation can be found in the Swagger file provided in the repository.

------------------------------------------
------------------------------------------

# Server:
  Implemented in JAVA with Spring Boot and Maven.

## How to Run
  To run the server, navigate to the `/server` directory and run the command `./mvnw spring-boot:run`. 
  By default, the server will be running on localhost port 8080: `localhost:8080`.

### Swagger UI
  Swagger UI can be accessed at: `localhost:8080/swagger-ui.html`.

### Database
  The database is not persisted on the hard disk, only in memory, and will be deleted when the server is shut down.
  It can be accessed at:
    - URL: `http://localhost:8080/h2`
    - User Name: `sa`
    - Password: None
    - JDBC URL: Provided in the Spring Boot initial output

------------------------------------------
------------------------------------------

# Client
In this application, you can register, query, edit, and delete both legal entity and individual customers. Each registered customer will be added to a service queue. Any customer that is modified will be moved to the end of the queue.

## Main Navigation
- Home: Check if logged in and set the server URL.
- Add: Add/Register a new customer to the Database; they will automatically be added to the queue.
- Query: Query registered customers.
  - Modify/Delete: Accessed through buttons next to each listed customer.
- Process Queue: Remove the next customer from the queue.

## Running the Application Locally
To run the application locally:
- Clone this repository.
- Inside the root folder of the repository, execute the following commands:

```
npm i
npm run start
```
- The application will be running on port 3000 by default [http://localhost:3000](http://localhost:3000).

## Architecture
- /components: Folder where the components to be used on pages are located.
- /pages: Components that act as application pages, typically accessed through a route.
- /services: Central context and services.
- ServicesContext.tsx: Central context that loads unique instances of all other services:
- ApiService: Responsible for server calls.
- I18nService: Responsible for token translation.
- LoginService: Manages authentication.

------------------------------------------
------------------------------------------

## Contribution

Feel free to contribute to this project. If you encounter issues or have improvements to suggest, please open an [issue](https://github.com/your-username/your-repository/issues) or submit a [pull request](https://github.com/your-username/your-repository/pulls).

## License

This project is licensed under the [MIT License](LICENSE.md).
