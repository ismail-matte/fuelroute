# Vercel Deployment - Step-by-Step Guide

## 🎯 You're in Vercel! Here's what to do next:

---

## Step 1: Import Your Project

### Option A: If You See "Add New Project" Button
1. Click **"Add New Project"** or **"Import Project"**
2. You'll see options to import from:
   - GitHub
   - GitLab
   - Bitbucket

### Option B: If You Need to Connect Git
1. Click **"Continue with GitHub"** (or your Git provider)
2. Authorize Vercel to access your repositories
3. Select the repository with FuelRoute

---

## Step 2: Configure Project

Once you select your repository:

### Project Settings:
- **Project Name:** `fuelroute` (or any name you like)
- **Framework Preset:** Next.js (should auto-detect)
- **Root Directory:** `./` (leave as default)
- **Build Command:** `bun run build` or leave default
- **Output Directory:** `.next` (leave as default)
- **Install Command:** `bun install` or leave default

### Environment Variables (Optional):
- Skip for now (none required)
- Can add later if needed

### Click **"Deploy"**

---

## Step 3: Wait for Deployment (2-3 minutes)

You'll see:
- Building... (installing dependencies)
- Compiling... (building Next.js app)
- Deploying... (uploading to CDN)
- ✅ Success!

Vercel will give you a URL like:
`https://fuelroute-xxxxx.vercel.app`

**Test this URL first!** Make sure everything works.

---

## Step 4: Add Custom Domain (fuelroute.com)

### In Vercel Dashboard:

1. **Go to Project Settings:**
   - Click on your project
   - Click "Settings" tab
   - Click "Domains" in sidebar

2. **Add Domain:**
   - Click "Add Domain"
   - Enter: `fuelroute.com`
   - Click "Add"

3. **Add www Subdomain:**
   - Click "Add Domain" again
   - Enter: `www.fuelroute.com`
   - Click "Add"

4. **Vercel will show DNS records:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## Step 5: Update DNS Records

### In Your Domain Registrar (where you bought fuelroute.com):

1. **Login to Domain Provider:**
   - GoDaddy, Namecheap, Google Domains, etc.
   - Find DNS Management

2. **Add/Update Records:**
   
   **A Record:**
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `76.76.21.21`
   - TTL: 3600 (or default)
   
   **CNAME Record:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: 3600 (or default)

3. **Save Changes**

4. **Wait for Propagation:**
   - Usually 5-30 minutes
   - Can take up to 48 hours (rare)
   - Check status: https://dnschecker.org

---

## Step 6: Verify Deployment

### Once DNS Propagates:

1. **Visit:** https://fuelroute.com
2. **Test Features:**
   - Calculate a journey
   - Try chat widget
   - Check admin panel: https://fuelroute.com/admin
   - Test on mobile
   - Share a result

3. **Verify SSL:**
   - Should show 🔒 (padlock)
   - HTTPS automatic
   - Free certificate

---

## 🎉 You're Live!

### What Happens Next:

**Automatic Deployments:**
- Every time you push to Git
- Vercel auto-deploys
- Live in 2-3 minutes
- No manual work needed!

**Monitoring:**
- Vercel dashboard shows:
  - Deployment status
  - Analytics
  - Performance metrics
  - Error logs

---

## 🔧 Troubleshooting

### If Deployment Fails:

**Check Build Logs:**
1. In Vercel dashboard
2. Click on failed deployment
3. View logs
4. Fix errors
5. Push again

**Common Issues:**
- Missing dependencies → Run `bun install`
- TypeScript errors → Run `bun typecheck`
- Build errors → Check logs

### If Domain Not Working:

**Check DNS:**
1. Visit https://dnschecker.org
2. Enter fuelroute.com
3. Check if records propagated
4. Wait if still propagating

**Verify Records:**
- A record: 76.76.21.21
- CNAME: cname.vercel-dns.com

---

## 📊 Post-Deployment

### After Going Live:

1. **Update Documentation:**
   - Change URLs in guides
   - Update README
   - Share new link

2. **Test Everything:**
   - All features
   - Mobile version
   - Admin panel
   - Chat widget

3. **Launch Marketing:**
   - Social media announcement
   - Email contacts
   - Post in communities

4. **Monitor:**
   - Vercel analytics
   - User feedback
   - Error logs

---

## 💡 Pro Tips

### Vercel Features to Use:

1. **Analytics:**
   - Enable in project settings
   - Track visitors
   - Monitor performance

2. **Preview Deployments:**
   - Every Git branch gets preview URL
   - Test before merging
   - Share with testers

3. **Environment Variables:**
   - Add API keys securely
   - Different for production/preview
   - Never commit secrets

4. **Custom Domains:**
   - Add multiple domains
   - Redirect www → non-www
   - Add subdomains

---

## 🆘 Need Help?

**Vercel Support:**
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Support: support@vercel.com

**FuelRoute Support:**
- Email: imatte@engineer.com
- WhatsApp: +256 782 475 028

---

## 🎯 Quick Checklist

- [ ] Vercel account created
- [ ] Repository imported
- [ ] Project deployed
- [ ] Test URL works
- [ ] Custom domain added
- [ ] DNS records updated
- [ ] DNS propagated
- [ ] fuelroute.com works
- [ ] SSL certificate active
- [ ] All features tested
- [ ] Ready to launch!

---

**You're almost there! Follow these steps and fuelroute.com will be live! 🚀**

*Current Status: Vercel account created ✅*
*Next Step: Import your repository*
