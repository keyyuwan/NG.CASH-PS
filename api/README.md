# Como rodar o servidor da aplicação?

**1.** Dentro do diretório `/api`, instale as dependências:

```
$ npm i
```

**2.** Dentro do diretório `/api`, rode o comando abaixo para iniciar o servidor:

```
$ npm run dev
```

# Como rodar o banco de dados da aplicação?

**1.** Dentro do diretório `/api`, rode o comando abaixo para criar o container do banco postgres:

```
$ docker-compose up -d
```

**2.** Dentro do diretório `/api`, rode o comando abaixo para criar as tabelas no banco:

```
$ npx prisma migrate dev
```
