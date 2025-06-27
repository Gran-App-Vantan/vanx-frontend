FROM node:22
WORKDIR /vanx-app
COPY vanx-app/ .
WORKDIR /vanx-app
ENV NODE_ENV=development LIGHTNINGCSS_PLATFORM=linux-arm64-gnu
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]