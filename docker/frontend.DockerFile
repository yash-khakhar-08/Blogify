# =========================
# Build stage
# =========================
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files first (cache-friendly)
COPY frontend/package*.json ./

# Install ALL deps (including dev, needed for tsc + vite)
RUN npm ci

# Copy full source
COPY frontend/ .

# Run TypeScript + Vite build
RUN npm run build


# =========================
# Runtime stage
# =========================
FROM node:24-alpine

WORKDIR /app

# Lightweight static server for SPA
RUN npm install -g serve

# Copy only built assets
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Serve Vite dist folder
CMD ["serve", "-s", "dist", "-l", "3000"]
