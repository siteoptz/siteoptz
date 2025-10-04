#!/bin/bash

# Development script for siteoptz.ai with Docker services
echo "🚀 Starting SiteOptz.ai Development with Docker Services"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Start Docker services
echo "📦 Starting Docker services..."
docker-compose up -d grafana redis postgres

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo "📊 Docker Services Status:"
docker-compose ps

echo ""
echo "✅ Docker services are ready!"
echo ""
echo "🌐 Services available at:"
echo "   • Grafana Dashboard: http://localhost:3001 (admin/admin)"
echo "   • Redis: localhost:6379"
echo "   • PostgreSQL: localhost:5432"
echo ""
echo "🚀 Starting Next.js development server..."
echo "   • SiteOptz App: http://localhost:3000"
echo ""

# Start Next.js development server
npm run dev
