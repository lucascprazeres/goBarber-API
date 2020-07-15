<h1 align=center>
💈 GoBarber - API 💈
<p align=center>
  <img src="https://img.shields.io/badge/server-express-green"/>

  <img src="https://img.shields.io/badge/database-postgres-blue" />

  <img src="https://img.shields.io/badge/orm-typeorm-7159c1" />

  <img src="https://img.shields.io/badge/from-rocketseat-blueviolet" />
</p>
</h1>

<p align=center>Uma API NodeJS para gerenciamento de agendamentos de serviços de barbearia<p>

<h2>Visão Geral 🔍</h2>

<p>
  Essa aplicação é responsável por gerenciar usuários (clientes e prestadores de serviço) e agendamentos de serviços, utilizando uma infraestrutura altamente escalável, de acordo com os princípios do DDD. Esse sistema serve não só como base para criação de apps de estabelecimentos específicos, como também para conectar profissionais liberais a seus clientes
</p>

<h2>
  Principais Tecnologias Utilizadas 👷🏽‍♂️
</h2>

<ul>
  <li>NodeJS</li>
  <li>TypeScript</li>
  <li>TypeOrm</li>
  <li>Postgres</li>
  <li>JWT</li>
  <li>multer</li>
</ul>

<h2>Requisitos de Software 🧐</h2>

<strong>Você precisa instalar, em sua máquina:</strong>

<ul>
  <li>NodeJS</li>
  <li>Postgres</li>
</ul>

<strong>opcionais:</strong>

<ul>
  <li>Insomnia (fazer requisições à api)</li>
  <li>DBeaver (gerenciar DB)</li>
</ul>

<h2>
  Funcionalidades 🤯
</h2>

<h3>
  Usuários
</h3>

<ul>
  <li>
    <strong>Criar usuário: post</strong>
    http://localhost:3333/users <br>
    <strong>Req body</strong>

  ```javascript
  {
    "name": "John Doe",
    "email": "johndoe@email.com",
    "password": "123456"
  }
  ```

  </li>
  <li>
    <strong>Iniciar sessão: post</strong>
    http://localhost:3333/sessions <br>
    <strong>Req body</strong>

  ```javascript
  {
    "email": "johndoe@email.com",
    "password": "123456"
  }
  ```
  </li>

  <li>
  <strong>Atualizar avatar do usuário: patch</strong>
  http://localhost:3333/users/avatar <br>
  <strong>Multipart Form -></strong>
  avatar: arquivo de imagem

  </li>
</ul>

<h3>
  Agendamentos
</h3>

<ul>
  <li>
    <strong>Criar agendamento: post</strong>
    http://localhost:3333/appointments <br>
    <strong>Req body</strong>

  ```javascript
  {
    "provider_id": uuid,
    "date": timestamp
  }
  ```
  </li>

  <li>
    <strong>Listar agendamentos: get</strong>
    http://localhost:3333/appointments <br>
  </li>
</ul>
<br>
<h2>
  Como contribuir? 😍
</h2>

<p>
  <strong>Faça um fork do repositório</strong>

  ```bash
  # clone  o repositório

  git clone <link-do-seu-fork> && cd GoBaber-API

  # baixe as dependências do projeto

  yarn

  # crie uma branch para fazer as alterações

  git checkout -b <sua-branch>

  # faça suas alterações
  # ...

  # faça um commit do que foi feito

  git add .
  git commit -m 'conte o que você fez'

  #Faça o push do que foi feito

  git push origin <sua-branch>
  ```
</p>

<hr>
<p align=center>Made with 💜 by <a href="https://www.linkedin.com/in/lucas-prazeres/">Lucas dos Prazeres</a><p>
