FROM oven/bun:1 AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and bun.lockb to leverage Docker cache
COPY package.json bun.lock ./

# Install dependencies using Bun
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the port your Express app listens on
EXPOSE 3000
ENV NODE_ENV=production

# Start the application using Bun
CMD ["bun", "run", "start"]