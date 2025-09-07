# Imagem base do Node
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Roda o comando que gera a pasta dist
RUN npm run env:dev

# Expõe a porta que a aplicação usa
EXPOSE 5173:5173

# Comando para iniciar a aplicação
# Ajuste se você tiver um script que serve a pasta dist
CMD ["npm","run", "dev"]
