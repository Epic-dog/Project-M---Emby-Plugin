FROM ubuntu:24.04
RUN apt-get update && apt-get install -y ffmpeg nginx nodejs npm
WORKDIR /app
COPY . .
RUN npm install
CMD ["node","server.js"]
