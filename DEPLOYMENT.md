# Nutra Grow E-Commerce Demo - Deployment Guide

## Hostinger VPS Deployment Instructions

### Prerequisites
- Hostinger VPS with Node.js support
- SSH access to your VPS
- Domain name configured (optional but recommended)

### Step 1: Prepare Your VPS

1. **Connect to your VPS via SSH**
   ```bash
   ssh user@your-vps-ip
   ```

2. **Update system packages**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

3. **Install Node.js (v18 or higher)**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

4. **Install PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   ```

5. **Install Nginx (Web Server)**
   ```bash
   sudo apt install -y nginx
   ```

### Step 2: Deploy Your Application

1. **Clone your repository**
   ```bash
   cd /var/www
   sudo git clone https://github.com/your-username/nutragrow.git
   sudo chown -R $USER:$USER nutragrow
   cd nutragrow
   ```

2. **Install dependencies**
   ```bash
   npm install --production
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   nano .env
   ```
   Update the values with your actual configuration

5. **Start the application with PM2**
   ```bash
   pm2 start npm --name "nutragrow" -- start
   pm2 save
   pm2 startup
   ```

### Step 3: Configure Nginx

1. **Create Nginx configuration**
   ```bash
   sudo nano /etc/nginx/sites-available/nutragrow
   ```

2. **Add the following configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable the site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/nutragrow /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Step 4: SSL Certificate (Optional but Recommended)

1. **Install Certbot**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

### Step 5: Update Application

To update your application after making changes:

```bash
cd /var/www/nutragrow
git pull origin main
npm install --production
npm run build
pm2 restart nutragrow
```

### Environment Variables

For production, ensure you set these environment variables:

- `NEXT_PUBLIC_SITE_URL` - Your production domain
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (live mode)
- `STRIPE_SECRET_KEY` - Stripe secret key (live mode)
- `NODE_ENV` - Set to `production`

### Stripe Integration (Production)

1. Create a Stripe account at https://stripe.com/
2. Get your API keys from the Stripe Dashboard
3. Replace test keys with live keys in your environment variables
4. Update the checkout flow to use actual Stripe integration

### Monitoring

Check application logs:
```bash
pm2 logs nutragrow
```

Check application status:
```bash
pm2 status
```

### Troubleshooting

**Application not starting:**
- Check logs: `pm2 logs nutragrow`
- Ensure Node.js version is 18 or higher
- Verify environment variables are set correctly

**Nginx 502 error:**
- Ensure the Next.js app is running: `pm2 status`
- Check if port 3000 is accessible
- Verify Nginx configuration

**Build errors:**
- Clear cache: `rm -rf .next node_modules`
- Reinstall dependencies: `npm install`
- Rebuild: `npm run build`

### Performance Optimization

The application is already optimized for production:
- Server-side rendering with Next.js
- Static generation where possible
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Tailwind CSS for minimal CSS bundle size

### Security Considerations

- Keep Node.js and dependencies updated
- Use environment variables for sensitive data
- Enable HTTPS with SSL certificate
- Configure firewall rules
- Regular backups of database (if added)
- Implement rate limiting for API routes

### Support

For issues or questions:
- Email: Nutragrowsupplements@gmail.com
- Company: Parsa and Parsa LLC, Newark, DE 19713
