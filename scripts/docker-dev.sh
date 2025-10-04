#!/bin/bash

# Docker Development Script for siteoptz.ai
echo "🚀 Starting SiteOptz.ai Development Environment"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Build and start services
echo "📦 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "✅ Development environment is ready!"
echo ""
echo "🌐 Services available at:"
echo "   • SiteOptz App: http://localhost:3000"
echo "   • Grafana Dashboard: http://localhost:3001 (admin/admin)"
echo "   • Redis: localhost:6379"
echo "   • PostgreSQL: localhost:5432"
echo ""
echo "📝 Useful commands:"
echo "   • View logs: docker-compose logs -f"
echo "   • Stop services: docker-compose down"
echo "   • Restart services: docker-compose restart"
echo "   • Rebuild: docker-compose up --build"
