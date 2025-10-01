# Optz BI Deployment Guide

This guide covers deploying Optz BI to the `optz-bi.siteoptz.ai` subdomain.

## Prerequisites

- Docker and Docker Compose installed
- Domain control for siteoptz.ai
- SSL certificates for subdomains

## Subdomain Setup

### 1. DNS Configuration

Add these DNS records to your domain provider:

```
optz-bi.siteoptz.ai     A     YOUR_SERVER_IP
optz-bi-api.siteoptz.ai A     YOUR_SERVER_IP
```

### 2. SSL Certificates

Generate SSL certificates for both subdomains:

```bash
# Using Let's Encrypt (recommended)
certbot certonly --standalone -d optz-bi.siteoptz.ai
certbot certonly --standalone -d optz-bi-api.siteoptz.ai

# Copy certificates to nginx directory
cp /etc/letsencrypt/live/optz-bi.siteoptz.ai/fullchain.pem ./nginx/ssl/optz-bi.siteoptz.ai.crt
cp /etc/letsencrypt/live/optz-bi.siteoptz.ai/privkey.pem ./nginx/ssl/optz-bi.siteoptz.ai.key
cp /etc/letsencrypt/live/optz-bi-api.siteoptz.ai/fullchain.pem ./nginx/ssl/optz-bi-api.siteoptz.ai.crt
cp /etc/letsencrypt/live/optz-bi-api.siteoptz.ai/privkey.pem ./nginx/ssl/optz-bi-api.siteoptz.ai.key
```

### 3. Environment Configuration

Create a `.env` file:

```bash
# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# API URLs
REACT_APP_API_URL=https://optz-bi-api.siteoptz.ai

# Production environment
NODE_ENV=production
```

## Deployment Steps

### 1. Build and Deploy

```bash
# Clone the repository (if not already done)
git clone https://github.com/siteoptz/siteoptz.git
cd siteoptz/marketing-roi-tracker

# Create SSL directory
mkdir -p nginx/ssl

# Copy SSL certificates (see SSL section above)

# Build and start services
docker-compose up -d --build

# Check status
docker-compose ps
```

### 2. Verify Deployment

```bash
# Check frontend
curl -I https://optz-bi.siteoptz.ai

# Check backend API
curl -I https://optz-bi-api.siteoptz.ai/api/health

# View logs
docker-compose logs -f
```

## Integration with SiteOptz Pro Dashboard

The Optz BI application is automatically integrated with the SiteOptz Pro dashboard:

### URL Configuration

- **Development**: `http://localhost:3001`
- **Production**: `https://optz-bi.siteoptz.ai`

### Authentication Flow

1. Pro users access Optz BI from `/dashboard/pro/optz-bi`
2. User data is passed via URL parameters for automatic authentication
3. No separate login required - uses Pro dashboard session

### Pro Dashboard Changes

The Pro dashboard now includes:

- **Featured section** with prominent "Launch Optz BI" button
- **Quick Access card** in the grid
- **Automatic URL switching** based on environment

## Architecture

```
┌─────────────────────┐    ┌─────────────────────┐
│   siteoptz.ai       │    │  optz-bi.siteoptz.ai│
│   (Main Site)       │────▶│  (Optz BI Frontend) │
│   Pro Dashboard     │    │                     │
└─────────────────────┘    └─────────────────────┘
                                      │
                                      ▼
                           ┌─────────────────────┐
                           │optz-bi-api.siteoptz │
                           │  (Optz BI Backend)  │
                           └─────────────────────┘
```

## Monitoring and Maintenance

### Health Checks

```bash
# Frontend health
curl https://optz-bi.siteoptz.ai

# Backend health
curl https://optz-bi-api.siteoptz.ai/api/health
```

### Log Monitoring

```bash
# View all logs
docker-compose logs -f

# Specific service logs
docker-compose logs -f optz-bi-frontend
docker-compose logs -f optz-bi-backend
docker-compose logs -f nginx
```

### Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Security Features

- **SSL/TLS encryption** for all traffic
- **Rate limiting** on API endpoints
- **CORS protection** for cross-origin requests
- **Security headers** (XSS, CSRF, etc.)
- **Authentication required** for all endpoints
- **Non-root containers** for security

## Backup and Recovery

### Database Backup

```bash
# Backup SQLite database
docker-compose exec optz-bi-backend cp /app/data/optz_bi.db /app/data/backup_$(date +%Y%m%d_%H%M%S).db

# Copy backup to host
docker cp optz-bi-backend:/app/data/backup_*.db ./backups/
```

### Restore

```bash
# Stop services
docker-compose down

# Restore database
docker-compose up -d optz-bi-backend
docker cp ./backups/backup_YYYYMMDD_HHMMSS.db optz-bi-backend:/app/data/optz_bi.db

# Restart services
docker-compose restart
```

## Troubleshooting

### Common Issues

1. **SSL Certificate Errors**
   - Verify certificates exist in `nginx/ssl/` directory
   - Check certificate validity: `openssl x509 -in cert.crt -text -noout`

2. **Connection Refused**
   - Check if services are running: `docker-compose ps`
   - Verify ports are not in use: `netstat -tulpn | grep :80`

3. **CORS Errors**
   - Verify nginx CORS configuration
   - Check browser console for specific errors

4. **Authentication Issues**
   - Verify JWT_SECRET is set correctly
   - Check backend logs for authentication errors

### Support

For deployment support, contact the development team or create an issue in the repository.