# care

## Instalação do Projeto

### Clonando o repositório

git clone: `git clone https://github.com/joaoazevedoJS/care.git`

---

### Configurando o back-end

Primeiro vamos acessar a pasta back-end

`cd backend`

#### 1. Instale as dependencias do projeto:
  
```ts
yarn

// ou use

npm i
```

#### 2. Configurando o .env

dentro da pasta do back-end, você pode encontrar o arquivo de template chamado `.env.example`! Remova o **.example** do arquivo.

Para configurar o SMTP utilize o serviço https://mailtrap.io/ e coloque o usuário e nome na env!

Comandos para criação de chaves privada e pública para colocar na env

```bash
openssl genrsa -out private-key.pem 2048 
openssl rsa -in private-key.pem -pubout -out public-key.pem
```

#### 3. Configure o arquivo ORMConfig

Assim como o `.env.example` remova o **.example** do arquivo `ormconfig.example.json` deixando somente `ormconfig.json`

dentro desse aquivo você pode configurar seu banco **postgres**!

#### 4. Populando o banco

Após configurar o banco rode os seguintes comandos na sua linha de comando:

`yarn typeorm migration:run` ou `npm run typeorm migration:run`

> O comando `typeorm migration:run` ele cria as tabelas para você poder utilizar o back-end

`yarn seed:run` ou `npm run seed:run`

> o comando `seed:run` ele vai popular algumas tabelas no banco, mas especificamente o user_type e status, adicionando os valores padrões nele

#### 5. Rodando os testes

Antes de iniciar o back-end, vamos rodar os teste para verificar se está tudo ok, não se preeocupe, os teste vai demorar no max 10s

**Observação:** assim que você rodar o teste, o sistema vai criar uma pasta `coverage` onde você pode ter acesso a um html que contem todos os teste.

#### 6. Rodando o back-end

Agora finalmente vamos rodar o back-end, execute o seguinte comando: 

```js
yarn dev:server

// ou use

npm run dev:server
```

---

### Rotas da API

Caso você use o insomnia, na pasta template, dentro do back-end, você pode encontrar um arquivo `insomnia_template.json` nele vai está configurado todas as rotas! **(Recomendado)**

Caso não tenha o insomnia, você pode instalar gratuitamente no site: https://insomnia.rest/download

#### Rota de Usuário

| Rota | Método | Params | Descrição | Observação | Auth |
| :--- | :--- | :--- | :--- |:--- | :--- |
| `/users/signup` | Post   | `name` `email` `password` - body params | Criar um novo usuário / admin | Você pode cadastrar como admin caso use um email que termine com @care.com.br e validar o seu email | false |
| `/users/authenticated` | Patch   | `code` - body params        | Validar email | Vai ser enviado um email com o código para validação |  true |
| `/users/avatar` | Patch   | `avatar` - multipart | Adicionar foto do usuário | |  true |

#### Rota de Sessão

| Rota | Método | Params | Descrição | Observação | Auth |
| :--- | :--- | :--- | :--- |:--- | :--- | 
| `/sessions/signin` | Post   | `email` `password` - body params | Criar uma sessão para usuário logar no site |  | false |
| `/sessions/user` | Get   | | Pegar informações do usuário logado |  | true |

#### Rota de Emails

| Rota | Método | Params | Descrição | Observação | Auth |
| :--- | :--- | :--- | :--- |:--- | :--- |
| `/mails/resendcode` | Post   |  | Reenviar o código para o email do usuário |  | true |

#### Rota de Admin

| Rota | Método | Params | Descrição | Observação | Auth |
| :--- | :--- | :--- | :--- |:--- | :--- |
| `/admin/doctor/signup` | Post   | `name` `email` `password` | Sómente os admins pode criar uma conta de Doutor | O admin precisa estar com o email autenticado | true |

#### Rota de Serviços

| Rota | Método | Params | Descrição | Observação | Auth |
| :--- | :--- | :--- | :--- |:--- | :--- |
| `/services` | Get   | | Pegar as todos os serviços cadastrados da clinica | | false |
| `/services` | Post   | `image` `name` `description` `price` `percentage_commission` - multipart | Cadastrar novo serviço | Somente os admins podem cadastrar serviços. o parâmetro percentage_commission é valor inteiro! | true |
| `/services/csv` | Post   | `services` - multipart | Pegar os serviços dentro do CSV e cadastrar no banco | Você pode encontrar um template de CSV dentro da `backend\src\templates` | true |
| `/services/:service_id/image` | Patch   | `image` - multipart e service_id - params | Atualizar a foto do serviço | Somente admins com email autenticado pode atualizar a foto | true |

#### Rota de Apontamentos

| Rota | Método | Params | Descrição | Observação | Auth |
| :--- | :--- | :--- | :--- |:--- | :--- |
| `/appointment/resume/:appointment_id` | Get   | | Obter resumo do appointment | Nesse end-point você pode ver a comissão do doutor, o status, o tempo levado na consulta, etc... | true |
| `/appointment/:service_id` | Get   | | Pegar todos appointments do serviços | | true |
| `/appointment/:service_id` | Post   | `time_minutes` `date` | Cadastrar um novo appointment | o `time_minutes` é o tempo que medico vai estar disponivel no dia (`date`). Somente um admin pode cadastrar serviços | true |
| `/appointment/contract/:appointment_id` | Patch   | | O usuários pode agendar uma consulta | Todos os usuário autenticado pode agendar! | true |
| `/appointment/:service_id/openings` | Get   | | Pegar todos appointments em abertos | | true |
| `/appointment/:service_id/progress` | Get   | | Pegar todos appointments que estão em andamento | | true |
| `/appointment/:service_id/closeds` | Get   | | Pegar todos appointments foram finalizadas | | true |
| `/appointment/:appointment_id/progress` | Put   | | Atualizar o status do appointment para em andamento | | true |
| `/appointment/:appointment_id/progress/cancel` | Put   | | Voltar o status do appointment para em aberto | | true |
| `/appointment/:appointment_id/closed` | Put   | | Atualizar o status do appointment para fechado | | true |

### Configurando o front-end

Primeiro vamos acessar a pasta front-end

> caso você esteje na pasta back-end use `cd ..`

`cd backend`

#### 1. Instale as dependencias do projeto:
  
```ts
yarn

// ou use

npm i
```

#### 2. Rode o Projeto

```ts
yarn start

// ou use

npm start
```
