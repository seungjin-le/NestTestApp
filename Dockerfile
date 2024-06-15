FROM node:18

# MongoDB 클라이언트 설치
RUN npm install mongodb

RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3001

CMD ["npm", "run", "start:dev"]

