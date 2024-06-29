# Use an official Node.js alpine runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env .env

# Build the application
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Run the application in production mode
CMD ["npm", "run", "start"]

# Build the Docker image
# docker build -t tae .

# Run the Docker Container
# docker run -d -p 3000:3000 --env-file .env tae
