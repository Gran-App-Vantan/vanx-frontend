FROM node:22
WORKDIR /vanx-app

COPY . .
WORKDIR /vanx-app/vanx-app
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000