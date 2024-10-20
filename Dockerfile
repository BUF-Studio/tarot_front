FROM node:18-alpine

WORKDIR /app
ARG NEXT_PUBLIC_STRIPE_PUBLIC_KEY=" "
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]