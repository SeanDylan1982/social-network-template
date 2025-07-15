# Deployment Guide

This guide provides comprehensive instructions for deploying the Social Network Template to various platforms and environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deployment Options](#deployment-options)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Docker](#docker)
  - [Self-Hosted](#self-hosted)
  - [AWS](#aws)
  - [Google Cloud Platform](#google-cloud-platform)
  - [Azure](#azure)
- [Database Setup](#database-setup)
- [SSL/HTTPS Configuration](#sslhttps-configuration)
- [Scaling](#scaling)
- [Monitoring](#monitoring)
- [Backup and Recovery](#backup-and-recovery)
- [Troubleshooting](#troubleshooting)
- [CI/CD](#cicd)

## Prerequisites

Before deploying, ensure you have:

- Node.js 18+ installed
- npm 9+ or yarn 1.22+
- MongoDB 6.0+ or MongoDB Atlas account
- Git
- A domain name (recommended)
- SSL certificate (recommended)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# App
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/social-network

# Authentication
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# File Storage
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=10485760 # 10MB

# Email (for notifications, password reset, etc.)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=your-smtp-password
SMTP_FROM=noreply@yourdomain.com

# Analytics (optional)
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_SIGNUP=true
NEXT_PUBLIC_MAINTENANCE_MODE=false
```

## Deployment Options

### Vercel (Recommended)

[Vercel](https://vercel.com/) provides the best experience for deploying Next.js applications.

1. **Import your project**
   - Sign in to [Vercel](https://vercel.com/)
   - Click "New Project"
   - Import your Git repository

2. **Configure project**
   - Framework: Next.js
   - Root Directory: (leave as default)
   - Build Command: `npm run build` or `yarn build`
   - Output Directory: `.next`
   - Install Command: `npm install` or `yarn`

3. **Environment Variables**
   - Add all variables from your `.env` file
   - For serverless functions, add `NEXT_PUBLIC_` variables to both "Production" and "Preview"

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy your app

5. **Custom Domain (Optional)**
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain and follow the instructions

### Docker

1. **Build the Docker image**
   ```bash
   docker build -t social-network .
   ```

2. **Run the container**
   ```bash
   docker run -d \
     --name social-network \
     -p 3000:3000 \
     --env-file .env \
     social-network
   ```

3. **Using Docker Compose**
   Create a `docker-compose.yml` file:
   ```yaml
   version: '3.8'
   
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - MONGODB_URI=mongodb://mongo:27017/social-network
         # Add other environment variables here
       depends_on:
         - mongo
     
     mongo:
       image: mongo:6.0
       volumes:
         - mongodb_data:/data/db
       environment:
         - MONGO_INITDB_DATABASE=social-network
   
   volumes:
     mongodb_data:
   ```

   Then run:
   ```bash
   docker-compose up -d
   ```

### Self-Hosted

1. **Build the application**
   ```bash
   npm install
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Use PM2 for process management**
   ```bash
   # Install PM2 globally
   npm install -g pm2
   
   # Start the application
   pm2 start npm --name "social-network" -- start
   
   # Save the process list
   pm2 save
   
   # Set up startup script
   pm2 startup
   
   # Start PM2 on system boot
   pm2 save
   ```

### AWS

#### AWS Elastic Beanstalk

1. **Install EB CLI**
   ```bash
   npm install -g aws-elastic-beanstalk-cli
   ```

2. **Initialize EB**
   ```bash
   eb init -p node.js-16 social-network
   ```

3. **Create an environment**
   ```bash
   eb create social-network-prod \
     --elb-type application \
     --envvars NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   eb deploy
   ```

#### AWS ECS with Fargate

1. **Build and push Docker image**
   ```bash
   aws ecr create-repository --repository-name social-network
   aws ecr get-login-password | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com
   docker build -t social-network .
   docker tag social-network:latest YOUR_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/social-network:latest
   docker push YOUR_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/social-network:latest
   ```

2. **Create ECS task definition and service**
   (See AWS ECS documentation for detailed instructions)

### Google Cloud Platform

#### Google Cloud Run

1. **Install Google Cloud SDK**
   ```bash
   gcloud components install beta
   ```

2. **Build and push Docker image**
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/social-network
   ```

3. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy social-network \
     --image gcr.io/YOUR_PROJECT_ID/social-network \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars="NODE_ENV=production"
   ```

### Azure

#### Azure App Service

1. **Install Azure CLI**
   ```bash
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   ```

2. **Login to Azure**
   ```bash
   az login
   ```

3. **Create App Service plan**
   ```bash
   az appservice plan create --name social-network-plan --resource-group YourResourceGroup --sku B1 --is-linux
   ```

4. **Create web app**
   ```bash
   az webapp create --resource-group YourResourceGroup --plan social-network-plan --name your-app-name --runtime "NODE|16-lts"
   ```

5. **Configure app settings**
   ```bash
   az webapp config appsettings set --resource-group YourResourceGroup --name your-app-name --settings NODE_ENV=production
   ```

6. **Deploy from Git**
   ```bash
   az webapp deployment source config-local-git --name your-app-name --resource-group YourResourceGroup
   ```

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create a cluster**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new project and cluster
   - Choose your preferred cloud provider and region

2. **Set up database access**
   - Go to Database Access
   - Add a new database user
   - Set appropriate permissions (readWrite for the application database)

3. **Network Access**
   - Go to Network Access
   - Add your application server's IP address or allow access from anywhere (not recommended for production)

4. **Get connection string**
   - Go to Database > Connect
   - Choose "Connect your application"
   - Copy the connection string and update your environment variables

### Self-Hosted MongoDB

1. **Install MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install -y mongodb
   
   # Start MongoDB
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

2. **Create database and user**
   ```bash
   mongo
   > use social-network
   > db.createUser({
       user: "socialuser",
       pwd: "your-secure-password",
       roles: [{ role: "readWrite", db: "social-network" }]
     })
   > exit
   ```

3. **Update MongoDB configuration**
   Edit `/etc/mongod.conf`:
   ```yaml
   storage:
     dbPath: /var/lib/mongodb
     journal:
       enabled: true
   systemLog:
     destination: file
     logAppend: true
     path: /var/log/mongodb/mongod.log
   net:
     port: 27017
     bindIp: 127.0.0.1  # Change to 0.0.0.0 to allow remote connections
   security:
     authorization: enabled
   ```

4. **Restart MongoDB**
   ```bash
   sudo systemctl restart mongod
   ```

## SSL/HTTPS Configuration

### Let's Encrypt with Certbot

1. **Install Certbot**
   ```bash
   sudo apt update
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. **Auto-renewal**
   Certbot will automatically set up a cron job for renewal. Test it with:
   ```bash
   sudo certbot renew --dry-run
   ```

### Cloudflare SSL

1. **Sign up at [Cloudflare](https://www.cloudflare.com/)**
2. **Add your domain** and follow the setup instructions
3. **Change your domain's nameservers** to Cloudflare's
4. **Enable SSL/TLS** in Cloudflare dashboard:
   - Go to SSL/TLS > Overview
   - Select "Full" or "Full (strict)" encryption mode
5. **Enable Always Use HTTPS**
   - Go to SSL/TLS > Edge Certificates
   - Toggle "Always Use HTTPS" to On

## Scaling

### Vertical Scaling

- **Database**: Upgrade to a larger instance size
- **Application**: Increase CPU/memory of your application servers
- **Caching**: Implement Redis or Memcached for session and data caching

### Horizontal Scaling

1. **Load Balancing**
   - Set up a load balancer (AWS ALB, Nginx, HAProxy)
   - Configure health checks
   - Enable sticky sessions if using server-side sessions

2. **Stateless Application**
   - Ensure your application is stateless
   - Store sessions in a database or distributed cache
   - Use environment variables for configuration

3. **Database Replication**
   - Set up MongoDB replica sets
   - Configure read preferences
   - Monitor replication lag

## Monitoring

### Application Monitoring

1. **Error Tracking**
   - [Sentry](https://sentry.io/)
   - [LogRocket](https://logrocket.com/)

2. **Performance Monitoring**
   - [New Relic](https://newrelic.com/)
   - [Datadog](https://www.datadoghq.com/)

3. **Logging**
   - [ELK Stack](https://www.elastic.co/what-is/elk-stack)
   - [Papertrail](https://www.papertrail.com/)
   - [LogDNA](https://www.logdna.com/)

### Database Monitoring

1. **MongoDB Atlas**
   - Built-in monitoring and alerts
   - Performance advisor
   - Real-time metrics

2. **Self-Hosted**
   - [MongoDB Ops Manager](https://www.mongodb.com/ops-manager)
   - [Percona Monitoring and Management](https://www.percona.com/software/database-tools/percona-monitoring-and-management)
   - [Prometheus + Grafana](https://prometheus.io/)

## Backup and Recovery

### Database Backups

#### MongoDB Atlas
- Enable Cloud Backups in the Atlas UI
- Set up scheduled snapshots
- Configure point-in-time recovery

#### Self-Hosted MongoDB

1. **Scheduled Backups**
   ```bash
   # Create a backup
   mongodump --uri="mongodb://username:password@localhost:27017/social-network" --out=/path/to/backup
   
   # Restore from backup
   mongorestore --uri="mongodb://username:password@localhost:27017/social-network" /path/to/backup/social-network
   ```

2. **Automated Backup Script**
   ```bash
   #!/bin/bash
   BACKUP_DIR="/var/backups/mongodb"
   DATE=$(date +%Y%m%d_%H%M%S)
   
   mkdir -p $BACKUP_DIR
   mongodump --uri="mongodb://username:password@localhost:27017/social-network" --out=$BACKUP_DIR/$DATE
   
   # Keep last 7 days of backups
   find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;
   ```
   Add to crontab:
   ```
   0 2 * * * /path/to/backup-script.sh
   ```

### Application Backups

1. **File Uploads**
   - Sync to cloud storage (S3, Google Cloud Storage, etc.)
   - Use versioning and lifecycle policies

2. **Configuration**
   - Store in version control (without secrets)
   - Use secret management for sensitive data

## Troubleshooting

### Common Issues

#### Application Won't Start
- Check logs: `pm2 logs` or `docker logs <container-id>`
- Verify environment variables are set
- Check port availability

#### Database Connection Issues
- Verify MongoDB is running: `systemctl status mongod`
- Check connection string
- Verify network/firewall settings

#### Performance Issues
- Check database queries with `db.currentOp()`
- Enable slow query logging
- Monitor system resources

### Log Files

- **Application Logs**: `pm2 logs` or in your deployment platform's logging system
- **Database Logs**: `/var/log/mongodb/mongod.log`
- **Nginx/Apache Logs**: `/var/log/nginx/` or `/var/log/apache2/`

## CI/CD

### GitHub Actions

Example workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
      env:
        NODE_ENV: production
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: ./
        vercel-args: '--prod'
```

### GitLab CI/CD

Example `.gitlab-ci.yml`:

```yaml
image: node:18

stages:
  - test
  - build
  - deploy

cache:
  paths:
    - node_modules/

test:
  stage: test
  script:
    - npm ci
    - npm test

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next/
    expire_in: 1 week
  only:
    - main

deploy_production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - mkdir -p ~/.ssh
    - echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
    - chmod 600 ~/.ssh/id_rsa
    - ssh-keyscan -H your-server-ip >> ~/.ssh/known_hosts
  script:
    - scp -r .next your-server:/path/to/app/
    - ssh your-server "cd /path/to/app && npm install --production && pm2 restart social-network"
  only:
    - main
```

## Security Best Practices

1. **Keep Dependencies Updated**
   - Regularly run `npm audit`
   - Use Dependabot or similar

2. **Secrets Management**
   - Never commit secrets to version control
   - Use environment variables or secret management services

3. **Rate Limiting**
   - Implement rate limiting on authentication endpoints
   - Use `express-rate-limit` or similar

4. **Security Headers**
   - Use Helmet.js for Express apps
   - Set Content Security Policy (CSP)

5. **Regular Audits**
   - Perform security audits
   - Use tools like `npm audit`, `snyk`, or `dependabot`

## Support

For deployment support, please contact [support@yourdomain.com](mailto:support@yourdomain.com) or open an issue on our [GitHub repository](https://github.com/yourusername/social-network-template/issues).
