FROM node:latest

WORKDIR /torapi
COPY package.json ./
RUN npm install
COPY . .

ENV PORT=8443
EXPOSE 8443

ENV PROXY_ADDRESS=""
ENV PROXY_PORT=""
ENV USERNAME=""
ENV PASSWORD=""

CMD ["sh", "-c", "npm start -- --port $PORT --proxyAddress $PROXY_ADDRESS --proxyPort $PROXY_PORT --username $USERNAME --password $PASSWORD"]