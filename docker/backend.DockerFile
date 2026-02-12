# 1. Use Node base image
FROM node:24-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy only package files first (for better caching)
COPY backend/package*.json ./

# 4. Install dependencies
RUN npm install --only=production

# 5. Copy backend source code
COPY backend/ .

# 6. Expose backend port (example: 8080)
EXPOSE 8080

# 7. Start backend
CMD ["npm", "run", "dev"]
