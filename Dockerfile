FROM node:carbon-slim

# Create app directory
WORKDIR /phets-file-ms

# Install app dependencies
COPY package.json /phets-file-ms/
RUN npm install --no-cache

COPY . /phets-file-ms/
RUN npm run build

ARG UPLOADS_DIR
RUN mkdir ${UPLOADS_DIR}

CMD [ "npm", "run", "start" ]
