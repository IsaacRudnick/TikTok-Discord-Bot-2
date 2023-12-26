# Use the official Node.js 20 image as the base
FROM node:20

# Create a working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Command to run your application
CMD ["node", "index.js"]
