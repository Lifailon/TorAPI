# Build stage
FROM --platform=$BUILDPLATFORM node:alpine AS build

WORKDIR /torapi

# Install dependencies
COPY package.json ./
RUN npm install && npm cache clean --force

COPY . .

# Final stage
FROM --platform=$BUILDPLATFORM node:alpine

WORKDIR /torapi

COPY --from=build /torapi/node_modules ./node_modules
COPY --from=build /torapi/package.json ./package.json
COPY --from=build /torapi/main.js ./main.js
COPY --from=build /torapi/swagger/swagger.js ./swagger/swagger.js

ENV PORT=8443
EXPOSE 8443

# Set variables for connecting through a proxy server
ENV PROXY_ADDRESS=""
ENV PROXY_PORT=""
ENV USERNAME=""
ENV PASSWORD=""

CMD ["sh", "-c", "npm start -- --port $PORT --proxyAddress $PROXY_ADDRESS --proxyPort $PROXY_PORT --username $USERNAME --password $PASSWORD"]
