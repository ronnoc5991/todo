FROM node:22

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "start"]
