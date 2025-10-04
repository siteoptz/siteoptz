# Dockerfile for siteoptz.ai Next.js application
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install system dependencies for Puppeteer/Sharp
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy package files
COPY package*.json ./

# Install dependencies with phantomjs workaround
RUN npm ci --omit=dev || \
    (npm ci --omit=dev --ignore-scripts && \
     npm rebuild sharp && \
     npm run postinstall || true)

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
