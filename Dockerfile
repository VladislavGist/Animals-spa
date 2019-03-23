FROM node
WORKDIR /app
COPY . /app
RUN npm i ; npm run build
EXPOSE 8090