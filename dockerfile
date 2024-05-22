FROM node:latest
WORKDIR /torapi
COPY package.json ./
RUN npm install
COPY . .
ENV PORT=8443
EXPOSE $PORT
CMD ["npm", "start"]