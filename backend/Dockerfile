# Use Node.js official image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all source files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
