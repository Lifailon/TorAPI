FROM node:latest
WORKDIR /torapi
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8443
CMD ["npm", "start"]