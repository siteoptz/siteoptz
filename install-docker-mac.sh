#!/bin/bash

# Docker Installation Script for macOS
# Run this script with: bash install-docker-mac.sh

echo "🐳 Docker Installation Guide for macOS"
echo "======================================"
echo ""

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script is for macOS only"
    exit 1
fi

echo "📦 Step 1: Install Homebrew (if not installed)"
echo "----------------------------------------------"
if ! command -v brew &> /dev/null; then
    echo "Homebrew not found. Installing..."
    echo "Please run this command in your terminal:"
    echo ""
    echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    echo ""
    echo "After installation, run:"
    echo 'echo "export PATH=/opt/homebrew/bin:$PATH" >> ~/.zshrc'
    echo 'source ~/.zshrc'
    echo ""
    echo "Press Enter when Homebrew is installed..."
    read
else
    echo "✅ Homebrew is already installed"
    brew --version
fi

echo ""
echo "🐳 Step 2: Install Docker Desktop"
echo "----------------------------------"
echo "Installing Docker Desktop via Homebrew..."
brew install --cask docker

if [ $? -eq 0 ]; then
    echo "✅ Docker Desktop installed successfully"
else
    echo "❌ Docker Desktop installation failed"
    echo "Alternative: Download from https://www.docker.com/products/docker-desktop"
    exit 1
fi

echo ""
echo "🚀 Step 3: Start Docker Desktop"
echo "--------------------------------"
echo "Opening Docker Desktop..."
open /Applications/Docker.app

echo ""
echo "⏳ Waiting for Docker to start (this may take a minute)..."
echo "Docker Desktop will show in your menu bar when ready."
echo ""

# Wait for Docker to be ready
counter=0
while ! docker info > /dev/null 2>&1; do
    if [ $counter -eq 0 ]; then
        echo "Waiting for Docker daemon to start..."
    fi
    
    if [ $counter -gt 60 ]; then
        echo "❌ Docker daemon failed to start after 60 seconds"
        echo "Please start Docker Desktop manually from Applications"
        exit 1
    fi
    
    counter=$((counter+1))
    sleep 1
done

echo "✅ Docker is running!"
echo ""

# Verify Docker installation
echo "📊 Docker Version:"
docker --version
echo ""

echo "🎯 Step 4: Run Grafana Container"
echo "---------------------------------"
echo "Starting Grafana on port 3000..."

# Stop and remove any existing Grafana container
docker stop grafana 2>/dev/null
docker rm grafana 2>/dev/null

# Run Grafana
docker run -d \
  --name=grafana \
  -p 3000:3000 \
  -e "GF_SECURITY_ADMIN_PASSWORD=admin" \
  -e "GF_INSTALL_PLUGINS=grafana-piechart-panel" \
  -v grafana-storage:/var/lib/grafana \
  grafana/grafana

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Grafana is running successfully!"
    echo ""
    echo "🌐 Access Grafana at: http://localhost:3000"
    echo "👤 Default login:"
    echo "   Username: admin"
    echo "   Password: admin"
    echo ""
    echo "📊 Container Status:"
    docker ps --filter name=grafana
    echo ""
    echo "📝 Useful Docker Commands:"
    echo "   docker logs grafana          # View logs"
    echo "   docker stop grafana          # Stop container"
    echo "   docker start grafana         # Start container"
    echo "   docker restart grafana       # Restart container"
    echo "   docker exec -it grafana bash # Access container shell"
else
    echo "❌ Failed to start Grafana container"
    exit 1
fi

echo ""
echo "🎉 Installation Complete!"
echo ""
echo "Next steps:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Login with admin/admin"
echo "3. Change the default password when prompted"
echo "4. Start creating your dashboards!"