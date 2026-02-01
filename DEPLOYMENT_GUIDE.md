# FuelRoute Deployment Guide

## 🚀 Deployment Options for fuelroute.com

You have several options to deploy FuelRoute to your custom domain. Here are the best approaches:

---

## Option 1: Vercel (Recommended - Easiest for Next.js)

### Why Vercel?
- ✅ Built specifically for Next.js
- ✅ Automatic deployments from Git
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Free tier available

### Steps:

1. **Create Vercel Account:**
   - Go to https://vercel.com
   - Sign up with GitHub/GitLab/Bitbucket

2. **Import Project:**
   - Click "Add New Project"
   - Import your Git repository
   - Vercel auto-detects Next.js

3. **Configure:**
   - Framework: Next.js (auto-detected)
   - Build Command: `bun run build`
   - Output Directory: `.next`
   - Install Command: `bun install`

4. **Add Custom Domain:**
   - Go to Project Settings → Domains
   - Add `fuelroute.com`
   - Add DNS records (Vercel provides them):
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

5. **Deploy:**
   - Push to Git → Auto-deploys
   - Live in 2-3 minutes!

**Cost:** FREE (Hobby plan) or $20/month (Pro)

---

## Option 2: Hostinger (Your Current Host)

### Why Hostinger?
- ✅ You already have an account
- ✅ Affordable pricing
- ✅ cPanel access
- ✅ Email hosting included
- ⚠️ Requires Node.js setup

### Steps:

#### A. Static Export (Simpler):

1. **Build Static Version:**
   ```bash
   # In your project directory
   bun run build
   bun run export
   ```

2. **Upload to Hostinger:**
   - Login to Hostinger cPanel
   - Go to File Manager
   - Navigate to `public_html`
   - Upload contents of `out/` folder
   - Done!

**Limitations:**
- No server-side features
- No API routes
- Chat widget may need adjustments

#### B. Node.js Deployment (Full Features):

1. **Enable Node.js in Hostinger:**
   - Login to hPanel
   - Go to Advanced → Node.js
   - Create Node.js application
   - Version: 20.x or higher

2. **Upload Files:**
   - Use FTP or File Manager
   - Upload entire project
   - Install dependencies:
     ```bash
     npm install
     npm run build
     ```

3. **Configure:**
   - Entry point: `server.js` or `npm start`
   - Port: As assigned by Hostinger
   - Environment: Production

4. **Point Domain:**
   - In hPanel, go to Domains
   - Point `fuelroute.com` to Node.js app
   - Update DNS if needed

**Cost:** Hostinger Business plan ($3-10/month)

---

## Option 3: Netlify (Alternative)

### Why Netlify?
- ✅ Easy deployment
- ✅ Free SSL
- ✅ Global CDN
- ✅ Form handling
- ✅ Free tier

### Steps:

1. **Create Account:** https://netlify.com
2. **Import from Git**
3. **Build Settings:**
   - Build command: `bun run build`
   - Publish directory: `.next`
4. **Add Domain:** fuelroute.com
5. **Deploy!**

**Cost:** FREE or $19/month (Pro)

---

## Option 4: Railway (Modern Platform)

### Why Railway?
- ✅ Modern platform
- ✅ Easy Next.js deployment
- ✅ Database support
- ✅ Auto-scaling
- ✅ $5/month credit free

### Steps:

1. **Create Account:** https://railway.app
2. **New Project from GitHub**
3. **Auto-detects Next.js**
4. **Add Domain:** fuelroute.com
5. **Deploy!**

**Cost:** Pay-as-you-go (~$5-20/month)

---

## 🎯 Recommended Approach

### For fuelroute.com:

**Best Option: Vercel**

**Why:**
1. **Zero Configuration** - Just connect Git
2. **Automatic Deployments** - Push code → Live in minutes
3. **Free SSL** - HTTPS included
4. **Global CDN** - Fast worldwide
5. **Next.js Optimized** - Built for your stack
6. **Free Tier** - Perfect for starting

**Setup Time:** 10-15 minutes
**Monthly Cost:** $0 (Free tier sufficient)

---

## 📋 Pre-Deployment Checklist

Before deploying to production:

### 1. Environment Variables (Optional)
Create `.env.local` file:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=https://fuelroute.com
```

### 2. Update URLs in Code
- Admin email links
- Social sharing URLs
- Contact forms

### 3. Test Everything
- ✅ All calculations work
- ✅ Chat widget responds
- ✅ Admin panel accessible
- ✅ Export/share functions
- ✅ Mobile responsive

### 4. SEO Optimization
- ✅ Meta tags (already done)
- Add `robots.txt`
- Add `sitemap.xml`
- Google Analytics (optional)

---

## 🔧 Hostinger Specific Instructions

### If You Choose Hostinger:

#### Step 1: Prepare Files

**Option A: Static Export (Recommended for Hostinger)**

1. In your project, update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

2. Build:
```bash
bun run build
```

3. This creates an `out/` folder with static files

#### Step 2: Upload to Hostinger

1. Login to Hostinger cPanel
2. File Manager → `public_html`
3. Delete default files
4. Upload all files from `out/` folder
5. Done!

#### Step 3: Configure Domain

1. In Hostinger, go to Domains
2. Point `fuelroute.com` to `public_html`
3. Enable SSL (free with Hostinger)
4. Wait for DNS propagation (5-30 minutes)

**Limitations of Static Export:**
- Chat widget will work (client-side)
- Admin panel will work (localStorage)
- All features functional!
- Just no server-side API routes (which we don't use)

---

## 🌐 DNS Configuration

### For fuelroute.com:

**If using Vercel:**
```
A Record:
Name: @
Value: 76.76.21.21

CNAME Record:
Name: www
Value: cname.vercel-dns.com
```

**If using Hostinger:**
```
A Record:
Name: @
Value: [Your Hostinger IP]

CNAME Record:
Name: www
Value: @
```

---

## 📊 Post-Deployment

### After Going Live:

1. **Test Everything:**
   - Visit fuelroute.com
   - Test all features
   - Check mobile version
   - Verify admin panel

2. **Submit to Search Engines:**
   - Google Search Console
   - Bing Webmaster Tools
   - Submit sitemap

3. **Set Up Analytics:**
   - Google Analytics
   - Track user behavior
   - Monitor performance

4. **Launch Marketing:**
   - Social media announcement
   - Email to contacts
   - Post in communities
   - Press release

---

## 💡 My Recommendation

**For fuelroute.com, use Vercel:**

**Pros:**
- 10-minute setup
- Free forever (for your traffic)
- Automatic HTTPS
- Global CDN
- Auto-deployments
- Perfect for Next.js

**Steps:**
1. Go to vercel.com
2. Sign up
3. Import your Git repo
4. Add fuelroute.com domain
5. Update DNS
6. Live!

**Alternative:** If you prefer Hostinger (since you have it), use the static export method above. It's simple and all features will work!

---

## 🆘 Need Help?

**For Deployment Support:**
- Email: imatte@engineer.com
- WhatsApp: +256 782 475 028

**For Technical Issues:**
- Check deployment logs
- Verify DNS propagation
- Test in incognito mode
- Contact hosting support

---

## 🎯 Next Steps

1. **Choose Platform:** Vercel (recommended) or Hostinger
2. **Follow Steps:** Use guide above
3. **Deploy:** Push to production
4. **Test:** Verify everything works
5. **Launch:** Start marketing!

**Your app is ready to go live on fuelroute.com! 🚀**

---

*Need help with deployment? Contact: imatte@engineer.com*
