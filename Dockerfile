FROM node:20-alpine

# node-pty needs build tools + python
RUN apk add --no-cache python3 make g++ linux-headers

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
