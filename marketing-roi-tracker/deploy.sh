#!/bin/bash

# Optz BI Deployment Script
set -e

echo "🚀 Starting Optz BI Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker --version &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed or not running${NC}"
    exit 1
fi

# Check if Docker Compose is available
if ! docker-compose --version &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

# Check if SSL certificates exist
if [ ! -f "nginx/ssl/optz-bi.siteoptz.ai.crt" ]; then
    echo -e "${YELLOW}⚠️  SSL certificate for optz-bi.siteoptz.ai not found${NC}"
    echo -e "${BLUE}ℹ️  Please generate SSL certificates first. See DEPLOYMENT.md for instructions.${NC}"
    read -p "Continue without SSL? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create necessary directories
echo -e "${BLUE}📁 Creating directories...${NC}"
mkdir -p nginx/ssl
mkdir -p backups

# Check for .env file
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from template...${NC}"
    cat > .env << EOF
# JWT Secret for authentication (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# API URLs
REACT_APP_API_URL=https://optz-bi-api.siteoptz.ai

# Production environment
NODE_ENV=production
EOF
    echo -e "${YELLOW}⚠️  Please update the JWT_SECRET in .env file before production deployment!${NC}"
fi

# Stop existing containers
echo -e "${BLUE}🛑 Stopping existing containers...${NC}"
docker-compose down 2>/dev/null || true

# Build and start services
echo -e "${BLUE}🔨 Building and starting services...${NC}"
docker-compose up -d --build

# Wait for services to be ready
echo -e "${BLUE}⏳ Waiting for services to start...${NC}"
sleep 10

# Check service status
echo -e "${BLUE}🔍 Checking service status...${NC}"
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Services are running!${NC}"
    
    # Show running services
    docker-compose ps
    
    echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "\n${BLUE}Access URLs:${NC}"
    echo -e "Frontend: ${GREEN}https://optz-bi.siteoptz.ai${NC} (or http://localhost:3001 for development)"
    echo -e "Backend API: ${GREEN}https://optz-bi-api.siteoptz.ai${NC} (or http://localhost:5001 for development)"
    echo -e "\n${BLUE}Useful commands:${NC}"
    echo -e "View logs: ${YELLOW}docker-compose logs -f${NC}"
    echo -e "Stop services: ${YELLOW}docker-compose down${NC}"
    echo -e "Restart services: ${YELLOW}docker-compose restart${NC}"
    
else
    echo -e "${RED}❌ Some services failed to start!${NC}"
    echo -e "${BLUE}Service status:${NC}"
    docker-compose ps
    echo -e "\n${BLUE}Logs:${NC}"
    docker-compose logs
    exit 1
fi

# Optional: Test endpoints
read -p "Would you like to test the endpoints? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🧪 Testing endpoints...${NC}"
    
    # Test frontend (development)
    if curl -f -s http://localhost:3001 > /dev/null; then
        echo -e "${GREEN}✅ Frontend (localhost:3001) is responding${NC}"
    else
        echo -e "${RED}❌ Frontend (localhost:3001) is not responding${NC}"
    fi
    
    # Test backend (development)
    if curl -f -s http://localhost:5001/api/health > /dev/null; then
        echo -e "${GREEN}✅ Backend API (localhost:5001) is responding${NC}"
    else
        echo -e "${RED}❌ Backend API (localhost:5001) is not responding${NC}"
    fi
    
    # Test production URLs (if accessible)
    if curl -f -s https://optz-bi.siteoptz.ai > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Production frontend is responding${NC}"
    else
        echo -e "${YELLOW}⚠️  Production frontend not accessible (check DNS/SSL)${NC}"
    fi
    
    if curl -f -s https://optz-bi-api.siteoptz.ai/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Production API is responding${NC}"
    else
        echo -e "${YELLOW}⚠️  Production API not accessible (check DNS/SSL)${NC}"
    fi
fi

echo -e "\n${GREEN}🎯 Deployment complete! Optz BI is now available for Pro users.${NC}"