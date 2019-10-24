FROM node:carbon-slim

# Create app directory
WORKDIR /phets-file-ms

# Install app dependencies
COPY package.json /phets-file-ms/
RUN npm install --no-cache

COPY . /phets-file-ms/
RUN npm run build

RUN mkdir -p /var/local/uploads

EXPOSE 4007

CMD [ "npm", "run", "start" ]
