# syntax=docker/dockerfile:1

# Build stage
FROM node:22.13.1-slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies and build the application
COPY --link package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY --link . .
RUN npm run build

# Production stage
FROM node:22.13.1-slim AS final

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Create and use a non-root user
RUN useradd -m appuser
USER appuser

# Command to run the application
CMD ["npm", "start"]