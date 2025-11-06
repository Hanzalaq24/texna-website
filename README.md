# Texna - Jacquard Harness Systems Website

## 🏢 About Texna

Texna is India's leading manufacturer of Jacquard Harness Systems with over 35 years of experience in the textile machinery industry. The company specializes in installation, repair, maintenance, and custom solutions for textile machinery across India, with over 40,000+ successful installations.

## 🌐 Project Overview

This is a modern, responsive website for Texna that showcases their products, services, and company information. The website is designed to work seamlessly across all devices and is optimized for both desktop and mobile experiences.

### 🎯 Key Features

- **Multi-Domain Support**: Compatible with both `texna.in` and `texna.com` domains
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **SEO Optimized**: Complete meta tags, structured data, and sitemap
- **Performance Focused**: Optimized images, lazy loading, and caching
- **Interactive Elements**: Image sliders, product galleries, and search functionality
- **Professional Footer**: Contact information and social media links

## 📁 Project Structure

```
texna-website/
├── 📄 HTML Pages
│   ├── index.html              # Homepage with hero slider and features
│   ├── about.html              # Company information and history
│   ├── products.html           # Product catalog and listings
│   ├── services.html           # Service offerings
│   ├── search.html             # Search functionality
│   ├── product-detail.html     # Dynamic product detail pages
│   └── 404.html               # Custom error page
│
├── 🎨 Styling & Assets
│   ├── styles.css              # Main stylesheet with responsive design
│   ├── SVG/                    # Vector icons and logos
│   │   ├── Texna Logo.svg
│   │   ├── Home Button.svg
│   │   ├── Products Button.svg
│   │   └── [other navigation icons]
│   ├── Products Photos/        # Product images (WebP format)
│   └── [banner images]        # Hero slider images
│
├── ⚙️ Functionality
│   ├── script.js               # Main JavaScript functionality
│   ├── sw.js                   # Service Worker (if needed)
│   └── sitemap-generator.js    # Dynamic sitemap generation
│
├── 🔧 Configuration
│   ├── .htaccess              # Apache server configuration
│   ├── robots.txt             # Search engine crawling rules
│   ├── sitemap.xml            # SEO sitemap
│   ├── manifest.json          # PWA manifest
│   └── test-images.html       # Image testing utility
│
└── 📚 Documentation
    └── README.md              # This file
```

## 🚀 Technologies Used

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox, Grid, and responsive design
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **WebP Images**: Optimized image format for better performance

### Features & Libraries
- **Responsive Design**: Mobile-first approach with breakpoints
- **SEO Optimization**: Meta tags, structured data, Open Graph
- **Performance**: Image lazy loading, caching, compression
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

### Server Configuration
- **Apache (.htaccess)**: URL rewriting, caching, compression
- **Multi-domain Support**: Works with both texna.in and texna.com
- **Security Headers**: XSS protection, content type validation

## 📱 Pages Overview

### 🏠 Homepage (`index.html`)
- **Hero Slider**: Rotating banner images showcasing company highlights
- **Feature Boxes**: Key selling points (35+ years experience, quick service, etc.)
- **Product Showcase**: Featured products with "More Products" link
- **Team Profiles**: Leadership team information
- **Location Map**: Company location visualization

### 🏢 About Page (`about.html`)
- **Company Vision & Mission**: Core values and objectives
- **Why Choose Us**: Key differentiators and statistics
- **Expertise & Services**: Core competencies
- **Call-to-Action**: Contact encouragement

### 🛠️ Products Page (`products.html`)
- **Product Catalog**: Grid layout of all products
- **Product Cards**: Image, title, description, and details link
- **Categories**: Organized by product types
- **Dynamic Routing**: Links to detailed product pages

### 🔧 Services Page (`services.html`)
- **Service Cards**: Four main service offerings
  - New Machine Jala Installation
  - Jala Replacement Service
  - Jala Repair & Maintenance
  - Customized Harness Solutions
- **Contact CTA**: WhatsApp integration for inquiries

### 🔍 Search Page (`search.html`)
- **Search Functionality**: Real-time product and service search
- **Results Display**: Organized by products and services
- **No Results Handling**: User-friendly empty state

### 📋 Product Detail Page (`product-detail.html`)
- **Dynamic Content**: JavaScript-powered product information
- **Product Images**: High-quality product photography
- **Feature Lists**: Detailed product specifications
- **SEO Optimization**: Dynamic meta tags per product

## 🎨 Design System

### Color Palette
- **Primary**: `#343770` (Deep Blue)
- **Secondary**: `#6062A9` (Light Blue)
- **Accent**: `#FFD700` (Gold)
- **Background**: `#F6F6F6` (Light Gray)
- **Text**: `#343770` (Dark Blue)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

### Responsive Breakpoints
- **Mobile**: `< 480px`
- **Small Mobile**: `480px - 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

## ⚡ Key JavaScript Features

### 🖼️ Image Slider
- **Auto-play**: 4-second intervals
- **Touch Support**: Swipe gestures for mobile
- **Indicators**: Clickable dots for navigation
- **Fallback**: Graceful degradation for failed images

### 🌐 Multi-Domain Support
- **Dynamic URLs**: Automatic domain detection
- **SEO Compatibility**: Updates canonical URLs and meta tags
- **Structured Data**: Dynamic schema.org markup

### 🔍 Search Functionality
- **Real-time Search**: Instant results as you type
- **Product Matching**: Searches titles, descriptions, and features
- **Service Matching**: Includes service offerings in results

### 📱 Product Details
- **Dynamic Loading**: JavaScript-powered content updates
- **SEO Meta Tags**: Automatic meta tag updates per product
- **Image Optimization**: Responsive image loading

## 🔧 Setup & Installation

### Prerequisites
- Web server (Apache/Nginx)
- Modern web browser
- Optional: Node.js for development tools

### Quick Start
1. **Clone/Download** the project files
2. **Upload** to your web server
3. **Configure** domain settings in `.htaccess`
4. **Test** the website functionality

### Domain Configuration
The website supports both `texna.in` and `texna.com`:
- Update `.htaccess` for your specific domains
- Ensure DNS points to the same server
- JavaScript automatically handles domain-specific URLs

## 📊 SEO & Performance

### SEO Features
- ✅ **Meta Tags**: Title, description, keywords for all pages
- ✅ **Open Graph**: Social media sharing optimization
- ✅ **Structured Data**: Schema.org markup for search engines
- ✅ **Sitemap**: XML sitemap for search engine indexing
- ✅ **Robots.txt**: Search engine crawling guidelines

### Performance Optimizations
- ✅ **Image Optimization**: WebP format, lazy loading
- ✅ **Caching**: Browser caching via .htaccess
- ✅ **Compression**: Gzip compression for text files
- ✅ **Minification**: Optimized CSS and JavaScript
- ✅ **CDN Ready**: Optimized for content delivery networks

## 📞 Contact Information

### Company Details
- **Address**: Plot No 1026, Rd Number 87, GIDC, Sachin, Surat, Gujarat 394230
- **Phone**: +91 9978617177
- **Instagram**: [@texna_harness](https://www.instagram.com/texna_harness?igsh=ZmlzMnNwcTB4eXpn)
- **Facebook**: [Texna](https://www.facebook.com/people/Texna/61571191199435/)

## 🛠️ Maintenance & Updates

### Regular Tasks
- **Image Optimization**: Compress new images to WebP format
- **Content Updates**: Update product information and company details
- **SEO Monitoring**: Check search engine rankings and optimize
- **Performance Testing**: Monitor page load speeds

### File Updates
- **Products**: Add new products to `script.js` productData object
- **Images**: Upload to appropriate directories (SVG/, Products Photos/)
- **Content**: Update HTML files for company information changes

## 🔒 Security Features

- **XSS Protection**: Content Security Policy headers
- **HTTPS Enforcement**: Automatic redirect to secure connections
- **Input Validation**: Sanitized search and form inputs
- **Error Handling**: Custom 404 page, graceful error management

## 📈 Analytics & Tracking

The website is ready for analytics integration:
- Google Analytics 4 (GA4)
- Google Search Console
- Facebook Pixel
- Custom event tracking for user interactions

## 🤝 Contributing

For updates and maintenance:
1. Test changes on a staging environment
2. Validate HTML, CSS, and JavaScript
3. Check responsive design across devices
4. Verify SEO elements are intact
5. Test performance and loading speeds

## 📄 License

This website is proprietary to Texna and contains company-specific branding and content. All rights reserved.

---

**Built with ❤️ for Texna - Leading the textile machinery industry for 35+ years**