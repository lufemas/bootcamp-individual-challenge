# Cliente
Nesta aplicação, é possível cadastrar, consultar, editar e excluir clientes Pessoa Física e Jurídica. Cada cliente cadastrado será adicionado a uma fila de atendimento. Todo cliente que for alterado será movido para o final da fila.

## Navegação Principal
- Início: Definir a URL do servidor.
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

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa a aplicação no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no navegador.

A página será recarregada se você fizer edições.\
Você também verá quaisquer erros de lint no console.

### `npm run build`

Compila a aplicação para produção na pasta `build`.\
Ele agrupa o React corretamente no modo de produção e otimiza a compilação para obter o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.\
Sua aplicação está pronta para ser implantada!
