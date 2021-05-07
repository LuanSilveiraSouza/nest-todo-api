<h1 align="center" style="display:flex;align-items:center;justify-content:center;">
Nest Todo API
</h1>

<p  align="center">
  <img  alt="Repository size"  src="https://img.shields.io/github/repo-size/LuanSilveiraSouza/nest-todo-api?color=282A36&style=for-the-badge">

  <a  href="https://github.com/LuanSilveiraSouza/nest-todo-api/commits/master">
    <img  alt="GitHub last commit"  src="https://img.shields.io/github/last-commit/LuanSilveiraSouza/nest-todo-api?color=282A36&style=for-the-badge">
  </a>

  <img  alt="License"  src="https://img.shields.io/badge/license-MIT-282A36?&style=for-the-badge">
</p>

# :pushpin: Sumary

* [Introduction](#paperclip-introduction)
* [How to Run](#rocket-how-to-use)
* [Contribution, Bugs and Issues](#bug-contribution-bugs-and-issues)
* [License](#books-license)

# :paperclip: Introduction

This project implements a Todo API using NestJS. It uses many functionalities of the framework, such as middlewares, guards, dependency injection, documentation, etc. 
The project uses TypeORM, Postgres and Docker too.


# :rocket: How to Run

```bash

$ git clone https://github.com/LuanSilveiraSouza/nest-todo-api.git

$ cd nest-todo-api

# The docker environment is adapted to development, so it needs to npm install outside it
$ npm i

# Run locally
$ npm start:debug

# Run in docker
$ docker-compose up 

# Clean run in docker
$ docker-compose up --build -V

```

# :bug: Contribution, Bugs and Issues

Feel free to open new issues and colaborate with others issues in [Nest Todo Api Issues](https://github.com/LuanSilveiraSouza/nest-todo-api/issues)

# :books: License

Released in 2020 under [MIT License](https://opensource.org/licenses/MIT)

Made with :heart: by Luan Souza.
