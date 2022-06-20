# Nosso Sangue Bom API

# Como usar o nosso sangue bom API?

1. Configure a conexão do banco de dados no arquivo .env . Segue exemplo:

`DATABASE_URL="postgresql://USUÁRIO:SENHA@IP:PORTA/BANCO_DE_DADOS?schema=public"`

2. Execute o comando `npm install` ou `yarn install`

3. Aplique as migrations com o comando `npx prisma migrate deploy` ou ` yarn prisma migrate deploy`

4. Execute o comando `npx prisma generate` ou `yarn prisma generate` para gerar as tipagens do prisma

5. Execute o comando `npm run seed` ou `yarn seed` para aplicar as seeds

6. Execute o comando `npm run dev` ou `yarn dev` para iniciar o servidor na porta :2333
