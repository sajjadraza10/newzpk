# Use an official Node runtime as the base image
FROM node:18

# Set build arguments
ARG REACT_APP_GUARDIAN_API_KEY
ARG REACT_APP_NYT_API_KEY
ARG REACT_APP_NEWS_API_KEY

# Set environment variables
ENV REACT_APP_GUARDIAN_API_KEY=$REACT_APP_GUARDIAN_API_KEY
ENV REACT_APP_NYT_API_KEY=$REACT_APP_NYT_API_KEY
ENV REACT_APP_NEWS_API_KEY=$REACT_APP_NEWS_API_KEY

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN yarn build

# Install serve to serve the build
RUN yarn global add serve

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]