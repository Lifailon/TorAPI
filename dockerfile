FROM node:latest

WORKDIR /torapi

# Install dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies for the project to work
COPY package.json ./
RUN npm install

COPY . .

ENV PORT=8443
EXPOSE 8443

# Set variables for connecting through a proxy server
ENV PROXY_ADDRESS=""
ENV PROXY_PORT=""
ENV USERNAME=""
ENV PASSWORD=""

CMD ["sh", "-c", "npm start -- --port $PORT --proxyAddress $PROXY_ADDRESS --proxyPort $PROXY_PORT --username $USERNAME --password $PASSWORD"]