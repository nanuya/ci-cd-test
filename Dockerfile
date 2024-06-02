# Step 1: Build the React app
FROM node:14 AS build

WORKDIR /app

COPY package.json ./
COPY yarn-lock.json ./
RUN yarn install

COPY . ./
RUN yarn run build

# Step 2: Serve the React app using nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
