# Use Node.js LTS version as the base image
FROM node:18 AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as the base image for serving static files
FROM nginx:latest

# Copy the built React app to the appropriate directory in Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for incoming traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]