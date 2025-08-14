#!/bin/bash

# SiteOptz Deployment Script
# This script handles the deployment process with pre-flight checks

set -e

echo "🚀 SiteOptz Deployment Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed and version
print_status "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version $NODE_VERSION detected. Please upgrade to Node.js 18+."
    exit 1
fi

print_success "Node.js version $(node --version) detected"

# Check if npm is available
print_status "Checking npm version..."
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi

print_success "npm version $(npm --version) detected"

# Check if .env.local exists
print_status "Checking environment configuration..."
if [ ! -f ".env.local" ]; then
    print_warning ".env.local file not found. Please create it with required environment variables."
    print_status "See DEPLOYMENT.md for required variables."
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    print_success ".env.local file found"
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

print_success "Dependencies installed"

# Run linting and type checking
print_status "Running code quality checks..."
npm run lint
print_success "Linting passed"

npm run type-check
print_success "Type checking passed"

# Run tests
print_status "Running tests..."
if npm run test; then
    print_success "All tests passed"
else
    print_warning "Some tests failed, but continuing deployment"
fi

# Build the project
print_status "Building project..."
npm run build
print_success "Build completed successfully"

# Ask for deployment method
echo ""
echo "Choose deployment method:"
echo "1) Deploy to Vercel (CLI)"
echo "2) Build for static export"
echo "3) Exit without deploying"
echo ""
read -p "Enter your choice (1-3): " -n 1 -r
echo ""

case $REPLY in
    1)
        print_status "Deploying to Vercel..."
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            print_status "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        # Deploy to production
        vercel --prod
        print_success "Deployment to Vercel completed!"
        ;;
    2)
        print_status "Building static export..."
        npm run export
        print_success "Static export completed! Files are in the 'out' directory."
        print_status "You can now upload the 'out' directory to any static hosting service."
        ;;
    3)
        print_status "Exiting without deployment."
        exit 0
        ;;
    *)
        print_error "Invalid choice. Exiting."
        exit 1
        ;;
esac

# Post-deployment checks
echo ""
print_status "Post-deployment recommendations:"
echo "1. Test the live site: https://siteoptz.ai"
echo "2. Verify email capture functionality"
echo "3. Run Lighthouse audit for performance"
echo "4. Check Google Search Console for any issues"
echo "5. Monitor error logs in Vercel dashboard"

print_success "Deployment process completed! 🎉"