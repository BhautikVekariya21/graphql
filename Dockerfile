# Use the official Node.js image based on Alpine Linux
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the application port, defaulting to 5055 if not specified
ENV PORT=5055
EXPOSE $PORT

# Run the application
CMD ["npm", "run", "start"]
