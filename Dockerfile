FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN ["npm", "ci"]
# --production cannot be used because of build process

COPY . .

RUN ["npm", "run", "build"]

CMD [ "node", "build/main.js"]