FROM node:26-alpine3.23

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# env
ENV port=5000

EXPOSE 5000

# Final command to run app
CMD ["npm", "start"] 