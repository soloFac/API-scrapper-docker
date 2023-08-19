FROM ghcr.io/puppeteer/puppeteer:21.1.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /build

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "tsc" ]