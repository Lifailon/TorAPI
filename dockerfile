FROM node:latest
WORKDIR /torapi
COPY package.json ./
RUN npm install
COPY . .

RUN export $(cat .env | xargs)
ENV PORT=$PORT
ENV PROXY_ADDRESS=$PROXY_ADDRESS
ENV PROXY_PORT=$PROXY_PORT
ENV USERNAME=$USERNAME
ENV PASSWORD=$PASSWORD

EXPOSE $PORT
CMD ["sh", "-c", "npm start -- --port $PORT --proxyAddress $PROXY_ADDRESS --proxyPort $PROXY_PORT --username $USERNAME --password $PASSWORD"]