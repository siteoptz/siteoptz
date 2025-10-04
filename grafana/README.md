# 📊 SiteOptz Grafana Analytics Setup

Complete monitoring and analytics solution for SiteOptz marketing campaigns with Grafana, PostgreSQL, Prometheus, and Redis.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Port 3000, 5432, 6379, 9090 available

### 1. Start the Stack

```bash
# Navigate to grafana directory
cd grafana

# Start all services
docker-compose up -d

# Check status
docker-compose ps
```

### 2. Access Dashboards

- **Grafana**: http://localhost:3000
  - Username: `admin`
  - Password: `siteoptz2024`
- **Prometheus**: http://localhost:9090
- **PostgreSQL**: localhost:5432
  - Database: `marketing_analytics`
  - Username: `siteoptz`
  - Password: `siteoptz2024`

## 📊 Available Dashboards

### Marketing Analytics Overview
- **URL**: http://localhost:3000/d/marketing-overview
- **Features**:
  - Revenue trends by platform
  - Marketing spend distribution
  - ROI gauge and metrics
  - Campaign performance table
  - Real-time KPIs

### Key Metrics Tracked
- **Spend**: Total marketing investment
- **Revenue**: Generated revenue
- **ROI**: Return on investment percentage
- **CTR**: Click-through rates
- **Conversions**: Conversion tracking
- **Platform Performance**: Google Ads, Meta Ads, TikTok, LinkedIn

## 🗄️ Database Schema

### Main Tables
- `marketing_campaigns`: Master campaign data
- `google_ads_metrics`: Google Ads specific metrics
- `meta_ads_metrics`: Facebook/Instagram ads data
- `google_analytics_metrics`: Website analytics
- `tiktok_ads_metrics`: TikTok advertising data
- `linkedin_ads_metrics`: LinkedIn B2B campaigns

### Sample Data
The setup includes sample data for 30 days with:
- 125+ sample campaigns across platforms
- Realistic performance metrics
- Historical trend data

## 🔧 Configuration

### Data Sources
1. **PostgreSQL** (Primary): Campaign and revenue data
2. **Prometheus**: System and application metrics
3. **Redis**: Real-time caching and sessions
4. **Marketing API**: External data integration

### Auto-Provisioning
- Dashboards auto-load from `/dashboards` folder
- Data sources configured via `/provisioning`
- No manual setup required

## 📈 Integration with SiteOptz

### API Endpoints
Connect your Next.js app to push data:

```javascript
// Push campaign data to PostgreSQL
POST /api/marketing/campaigns
{
  "campaign_id": "google_001",
  "platform": "Google Ads",
  "spend": 1500.00,
  "revenue": 4500.00,
  "impressions": 50000,
  "clicks": 2500,
  "conversions": 45
}
```

### Real-time Updates
- Campaigns update every 30 seconds
- Automatic data aggregation
- Historical trend analysis

## 🛠️ Customization

### Adding New Dashboards
1. Create JSON file in `dashboards/` folder
2. Dashboard auto-loads on restart
3. Use existing data sources

### Adding Data Sources
1. Edit `provisioning/datasources/datasources.yml`
2. Restart Grafana container
3. Configure queries in dashboards

### Custom Metrics
Add to `prometheus/prometheus.yml`:

```yaml
- job_name: "custom-app"
  static_configs:
    - targets: ["your-app:port"]
```

## 📊 Dashboard Panels

### Marketing Overview Dashboard
1. **Marketing Spend by Platform** (Donut Chart)
2. **Overall ROI** (Gauge)
3. **Revenue Trend** (Time Series)
4. **Active Campaigns** (Stat)
5. **Total Spend** (Stat)
6. **Average CTR** (Stat)
7. **Total Conversions** (Stat)
8. **Campaign Performance** (Table)

### Advanced Features
- **Annotations**: Mark important events
- **Templating**: Dynamic dashboard variables
- **Alerts**: Set up threshold alerts
- **Export**: PDF/PNG dashboard exports

## 🔍 Monitoring & Alerts

### Built-in Alerts
- ROI below threshold
- High spend campaigns
- Low conversion rates
- System performance issues

### Custom Alerts
Configure in Grafana UI or via:
```yaml
# Add to alerting rules
groups:
  - name: marketing_alerts
    rules:
      - alert: LowROI
        expr: roi_percentage < 100
        for: 5m
```

## 📱 Mobile Access

Grafana dashboards are mobile-responsive:
- Touch-friendly navigation
- Optimized panel layouts
- Mobile app available

## 🔒 Security

### Production Recommendations
1. Change default passwords
2. Enable HTTPS
3. Configure authentication
4. Restrict network access
5. Regular backups

```bash
# Change passwords
docker-compose exec grafana grafana-cli admin reset-admin-password newpassword
```

### Backup Strategy
```bash
# Backup PostgreSQL
docker-compose exec postgres pg_dump -U siteoptz marketing_analytics > backup.sql

# Backup Grafana settings
docker-compose exec grafana tar -czf /tmp/grafana-backup.tar.gz /var/lib/grafana
```

## 🚀 Production Deployment

### Environment Variables
```bash
# Create .env file
GF_SECURITY_ADMIN_PASSWORD=secure_password
POSTGRES_PASSWORD=secure_db_password
REDIS_PASSWORD=secure_redis_password
```

### Scale for Production
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  grafana:
    deploy:
      replicas: 2
    environment:
      - GF_DATABASE_TYPE=postgres
      - GF_DATABASE_HOST=postgres:5432
```

## 📊 Performance Optimization

### Query Optimization
- Use proper indexes on date columns
- Limit time ranges in queries
- Use aggregation views

### Resource Management
```yaml
services:
  grafana:
    mem_limit: 1g
    cpus: '0.5'
  postgres:
    mem_limit: 2g
    cpus: '1.0'
```

## 🆘 Troubleshooting

### Common Issues

1. **Grafana won't start**
   ```bash
   docker-compose logs grafana
   # Check port conflicts
   ```

2. **Database connection failed**
   ```bash
   docker-compose exec postgres pg_isready
   # Verify credentials
   ```

3. **No data in dashboards**
   ```bash
   # Check PostgreSQL data
   docker-compose exec postgres psql -U siteoptz -d marketing_analytics -c "SELECT COUNT(*) FROM marketing_campaigns;"
   ```

### Reset Everything
```bash
docker-compose down -v  # Remove volumes
docker-compose up -d    # Fresh start
```

## 📈 Analytics Insights

### Key Business Metrics
- **Customer Acquisition Cost (CAC)**
- **Lifetime Value (LTV)**
- **Return on Ad Spend (ROAS)**
- **Attribution Analysis**
- **Channel Performance**

### Automated Reporting
- Daily performance summaries
- Weekly trend analysis
- Monthly ROI reports
- Alert notifications

## 🔮 Advanced Features

### Machine Learning Integration
- Predictive analytics
- Anomaly detection
- Automated optimization
- Trend forecasting

### API Integration
- Google Ads API
- Facebook Marketing API
- Google Analytics 4
- Custom webhook endpoints

---

## 📞 Support

For issues or customization requests:
1. Check logs: `docker-compose logs [service]`
2. Verify configuration files
3. Test database connections
4. Review Grafana data source settings

**Happy Analytics!** 📊✨