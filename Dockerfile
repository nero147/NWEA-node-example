# This is using the openjdk image as a base
FROM node:latest

MAINTAINER Noah
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

# This starts the actual process of the server, but there can only be one CMD call per docker instance
CMD ["npm", "start"]
