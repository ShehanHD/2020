# FROM nginx:latest

# WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install


# COPY . .

# CMD ["npm", "start"]

FROM alpine:latest

WORKDIR /app

RUN apk update && \
    apk add make && \
    apk add g++ && \
    apk add python2 && \
    apk add --update nodejs npm

COPY . .

EXPOSE 3000/tcp

RUN npm install

CMD ["npm", "start"]