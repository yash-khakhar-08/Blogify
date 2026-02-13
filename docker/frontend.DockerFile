# 1. Use Node base image
FROM node:24-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy only package files first (for better caching)
COPY frontend/package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy frontend source code
COPY frontend/ .

# 6. Expose frontend port (example: 5173)
EXPOSE 5173

# 7. Start frontend
CMD ["npm", "run", "dev","--","--host"]