FROM node:19.4.0
WORKDIR /backend 

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 4000

CMD [ "node" , "index.js" ]