# Deployment Guide

## Quick Start - GitHub Pages (Free Hosting)

### Steps:

1. **Create a GitHub Account** (if not already done)
   - Go to https://github.com/signup

2. **Create a New Repository**
   - Repository name: `portfolio` or `yourname-portfolio`
   - Description: "Professional Java Backend Developer Portfolio"
   - Make it public
   - Add README (you can replace it later)

3. **Upload Your Files**
   - Option A: Git CLI
     ```bash
     cd portfolio
     git init
     git add .
     git commit -m "Initial portfolio commit"
     git branch -M main
     git remote add origin https://github.com/yourusername/portfolio.git
     git push -u origin main
     ```
   
   - Option B: GitHub Web Interface
     - Drag and drop files directly into repository

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "GitHub Pages" section
   - Select "Deploy from a branch"
   - Select "main" branch and "root" folder
   - Click Save

5. **Access Your Portfolio**
   - URL: `https://yourusername.github.io/portfolio/src/`
   - Or add custom domain in Settings → Pages

---

## Navigation

- **Home**: `src/index.html`
- **About**: `src/about.html`
- **Projects**: `src/projects.html`
- **Contact**: `src/contact.html`

All links are working! ✅

---

## Before Going Live - Customization Checklist

### Essential Updates:

- [ ] Replace "Chiranib Dash" with your name in all files
- [ ] Update email address in `contact.html`
- [ ] Update LinkedIn URL in all pages and `contact.html`
- [ ] Update GitHub username in all pages and `contact.html`
- [ ] Update Twitter/X profile URL (or remove if not applicable)
- [ ] Add your actual projects in `projects.html`
- [ ] Update project descriptions and GitHub links
- [ ] Customize technical skills in `about.html`
- [ ] Add any additional skills or achievements

### Optional Enhancements:

- [ ] Add profile picture/avatar
- [ ] Add project images/screenshots
- [ ] Add testimonials section
- [ ] Add blog link (if applicable)
- [ ] Add resume/CV download link
- [ ] Change color scheme (update CSS variables)
- [ ] Add animation libraries (Aos, GSAP, etc.)
- [ ] Integrate form submission backend (Formspree, Netlify Forms)
- [ ] Add analytics (Google Analytics)

---

## Alternative Hosting Options

### Netlify (Recommended for simplicity)

1. Go to https://app.netlify.com/signup
2. Connect your GitHub account
3. Select your portfolio repository
4. Deploy settings should auto-detect
5. Click "Deploy site"

**Advantages:**
- Automatic deployments on git push
- Free custom domain
- Built-in analytics
- Form handling available

### Vercel

1. Go to https://vercel.com/signup
2. Connect GitHub account
3. Import your project
4. Deploy (one-click)

**Advantages:**
- Very fast
- Free tier with generous limits
- Built-in analytics
- Easy to scale

### Firebase Hosting

1. Create Firebase project: https://console.firebase.google.com
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Deploy:
   ```bash
   firebase login
   firebase init
   firebase deploy
   ```

**Advantages:**
- Reliable Google infrastructure
- Free SSL certificate
- Global CDN

### AWS S3 + CloudFront

1. Create S3 bucket
2. Upload files
3. Enable static website hosting
4. Configure CloudFront distribution
5. Add custom domain (Route 53)

**Advantages:**
- Production-grade
- Pay-as-you-go
- Highly scalable
- Advanced features

---

## Form Submission Backend (for contact form)

Currently, the form logs to browser console. To make it functional:

### Option 1: Formspree (Easiest)

1. Go to https://formspree.io/
2. Create account and add form
3. Get your form endpoint
4. Update form action in `contact.html`

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms

1. Deploy to Netlify
2. Add `netlify` attribute to form
3. Works automatically

### Option 3: Backend Service

- EmailJS
- SendGrid
- AWS SES
- Your own Node.js server

---

## SEO Optimization

To improve search visibility:

1. **Add Meta Tags** in each HTML file:
   ```html
   <meta name="description" content="...">
   <meta name="keywords" content="...">
   <meta name="author" content="Your Name">
   ```

2. **Add Schema Markup** (in head):
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "Person",
     "name": "Your Name",
     "jobTitle": "Java Backend Developer",
     "url": "https://yourportufolio.com",
     "sameAs": ["https://linkedin.com/in/..."]
   }
   </script>
   ```

3. **Create Sitemap** (`sitemap.xml`):
   - List all pages
   - Submit to Google Search Console

4. **Add robots.txt**:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://yourportfolio.com/sitemap.xml
   ```

---

## Analytics Setup

### Google Analytics

1. Create account: https://analytics.google.com
2. Add tracking code to head of each page:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

---

## Maintenance

### Regular Tasks:

- Update projects with new work
- Refresh skills section with new technologies
- Review and respond to contact form submissions
- Monitor analytics
- Check for broken links
- Update GitHub links
- Refresh experience timeline

---

## Troubleshooting

### Navigation not working

- Ensure all files are in correct locations
- Check file extensions (.html)
- Verify href paths are relative, not absolute
- Clear browser cache

### Styles not loading

- Check CSS file paths
- Verify CSS files are in `css/` folder
- Clear browser cache
- Check browser console for errors

### Mobile view issues

- Zoom out in browser (Ctrl/Cmd + -)
- Check media queries in responsive.css
- Test on actual mobile device
- Use Chrome DevTools device emulation

### Form not working

- Check console for JavaScript errors
- Ensure form ID matches JavaScript code
- Validate email format
- Check if backend service is configured

---

## Support & Resources

- **MDN Web Docs**: https://developer.mozilla.org
- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **HTML/CSS Tutorial**: https://www.w3schools.com
- **Netlify Docs**: https://docs.netlify.com
- **Web.dev**: https://web.dev

---

**Last Updated**: April 2026
