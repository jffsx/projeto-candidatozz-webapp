# Candidatozz

> Projeto Candidatozz frontend

# Instalação

## Requisitos

* NodeJS >= 8
* NPM >= 5

## Comandos para instalação

``` bash
# install dependencies
npm install

# configurar o env.js com as configurações da API
cp src/env.example.js src/env.js

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# usuário | senha
user@admin.com | 1234
user@candidate.com | 1234
```

# Docker

Subir a aplicação com o Docker

## Requisitos

* Dcoker >= 17
* docker-compose >= 1

## Comandos para instalação com docker

A aplicação será iniciada na porta :8080 caso haja a necessidade de trocar a porta alterar o arquivo docker-compose.yml

``` bash
# configurar o env.js com as configurações da API
# API_CLIENT_ID e API_CLIENT_SECRET são as configurações oauth da api "Password Grant Client"
cp src/env.example.js src/env.js

# inicia a aplicação com as configurações definidas no docker-compose.yml
docker-compose up -d

# usuário | senha
user@admin.com | 1234
user@candidate.com | 1234
```
