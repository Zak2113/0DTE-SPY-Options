# ==========================================
# Stage 1: Build
# ==========================================
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to cache dependencies
# (If you use pnpm or yarn, copy their lock files instead)
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies needed for building)
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Nuxt application (compiles to the .output directory)
RUN npm run build

# ==========================================
# Stage 2: Production Runner
# ==========================================
FROM node:20-alpine

WORKDIR /app

# Set environment variables for production
ENV NODE_ENV=production
# Exposing the host is required for Nuxt/Nitro to be accessible outside the container
ENV HOST=0.0.0.0
ENV PORT=3000

# Copy ONLY the built output from the builder stage
COPY --from=builder /app/.output ./.output

# Expose the port your app runs on
EXPOSE 3000

# Start the Nitro server
CMD ["node", ".output/server/index.mjs"]