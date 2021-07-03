
FROM node:14-slim as builder
WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
COPY ./nginx /etc/nginx/conf.d
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]