# Use an official Node.js runtime as the base image for the build stage
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

COPY package.json yarn.lock ./

# Install the dependencies using yarn
RUN yarn
ARG TYPESENSE_API_KEY
ENV TYPESENSE_API_KEY=${TYPESENSE_API_KEY}

# Copy the rest of the application files
COPY . .

# Build the Docusaurus site
RUN yarn build

# Start a new stage for the production environment
FROM nginx:stable-alpine

# Copy the built files from the build stage to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html/content


COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]