FROM node:22.9.0-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn-lock.json
COPY yarn.lock package*.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Build the TypeScript files
RUN yarn run build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD yarn run start
