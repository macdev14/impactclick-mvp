# ⚡ Quick Start Guide

## Add ImpactClick Widget to Your Website in 5 Minutes

This guide shows you how to add the ImpactClick widget to different platforms and frameworks.

---

## 🌐 Plain HTML Website

### Step 1: Add the Script
Add this to your HTML `<head>` section:

```html
<script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>
```

### Step 2: Initialize the Widget
Add this before `</body>`:

```html
<script>
  ImpactClick.init({
    campaignId: 'your-campaign-id',
    ngoId: 'your-ngo-id',
    apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-site-key',
    theme: 'light',
    position: 'bottom-right'
  });
</script>
```

**Done!** The widget will appear in the bottom-right corner.

---

## ⚛️ React Website

### Step 1: Install the Widget
```bash
npm install impactclick-widget
```

### Step 2: Import and Use
```jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load the widget script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js';
    script.onload = () => {
      // Initialize the widget
      window.ImpactClick.init({
        campaignId: 'your-campaign-id',
        ngoId: 'your-ngo-id',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key',
        theme: 'light',
        position: 'bottom-right'
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <h1>Your React App</h1>
      {/* Your app content */}
    </div>
  );
}
```

---

## 🅰️ Angular Website

### Step 1: Add Script to index.html
Add this to `src/index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>
```

### Step 2: Initialize in Component
```typescript
import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    ImpactClick: any;
  }
}

@Component({
  selector: 'app-root',
  template: '<h1>Your Angular App</h1>'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Initialize the widget
    window.ImpactClick.init({
      campaignId: 'your-campaign-id',
      ngoId: 'your-ngo-id',
      apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
      recaptchaSiteKey: 'your-recaptcha-site-key',
      theme: 'light',
      position: 'bottom-right'
    });
  }
}
```

---

## 🟢 Vue.js Website

### Step 1: Add Script to index.html
Add this to `public/index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>
```

### Step 2: Initialize in Component
```vue
<template>
  <div>
    <h1>Your Vue App</h1>
  </div>
</template>

<script>
declare global {
  interface Window {
    ImpactClick: any;
  }
}

export default {
  name: 'App',
  mounted() {
    // Initialize the widget
    window.ImpactClick.init({
      campaignId: 'your-campaign-id',
      ngoId: 'your-ngo-id',
      apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
      recaptchaSiteKey: 'your-recaptcha-site-key',
      theme: 'light',
      position: 'bottom-right'
    });
  }
}
</script>
```

---

## 🔥 Next.js Website

### Step 1: Add Script to _document.tsx
Create or update `pages/_document.tsx`:

```tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

### Step 2: Initialize in _app.tsx
```tsx
import { useEffect } from 'react';
import type { AppProps } from 'next/app';

declare global {
  interface Window {
    ImpactClick: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize the widget
    if (window.ImpactClick) {
      window.ImpactClick.init({
        campaignId: 'your-campaign-id',
        ngoId: 'your-ngo-id',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key',
        theme: 'light',
        position: 'bottom-right'
      });
    }
  }, []);

  return <Component {...pageProps} />;
}
```

---

## 🎨 WordPress Website

### Method 1: Add to Theme (Recommended)

1. Go to your WordPress admin
2. Navigate to **Appearance > Theme Editor**
3. Select your theme's `footer.php` file
4. Add this code before `</body>`:

```php
<!-- ImpactClick Widget -->
<script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>
<script>
  ImpactClick.init({
    campaignId: 'your-campaign-id',
    ngoId: 'your-ngo-id',
    apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-site-key',
    theme: 'light',
    position: 'bottom-right'
  });
</script>
```

### Method 2: Using a Plugin

1. Install a "Custom HTML" plugin like "Insert Headers and Footers"
2. Add the widget code to the plugin settings

---

## 🛒 Shopify Store

### Method 1: Theme Customization

1. Go to your Shopify admin
2. Navigate to **Online Store > Themes**
3. Click **Actions > Edit code**
4. Open `theme.liquid`
5. Add this before `</body>`:

```liquid
<!-- ImpactClick Widget -->
<script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>
<script>
  ImpactClick.init({
    campaignId: 'your-campaign-id',
    ngoId: 'your-ngo-id',
    apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-site-key',
    theme: 'light',
    position: 'bottom-right'
  });
</script>
```

### Method 2: Using Shopify Apps

1. Install a "Custom Code" app from the Shopify App Store
2. Add the widget code through the app interface

---

## 🎯 Wix Website

### Method 1: Custom Code Element

1. Go to your Wix editor
2. Click the **+** button to add elements
3. Search for "Custom Code"
4. Add this code:

```html
<script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>
<script>
  ImpactClick.init({
    campaignId: 'your-campaign-id',
    ngoId: 'your-ngo-id',
    apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-site-key',
    theme: 'light',
    position: 'bottom-right'
  });
</script>
```

### Method 2: Site Settings

1. Go to **Settings > Custom Code**
2. Add the code to the **Head** section

---

## 🎨 Squarespace Website

### Method 1: Code Injection

1. Go to your Squarespace admin
2. Navigate to **Settings > Advanced > Code Injection**
3. Add this to the **Footer** section:

```html
<script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>
<script>
  ImpactClick.init({
    campaignId: 'your-campaign-id',
    ngoId: 'your-ngo-id',
    apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-site-key',
    theme: 'light',
    position: 'bottom-right'
  });
</script>
```

---

## 🔧 Configuration Options

### Basic Configuration
```javascript
ImpactClick.init({
  campaignId: 'your-campaign-id',        // Required
  ngoId: 'your-ngo-id',                  // Required
  apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api', // Required
  recaptchaSiteKey: 'your-recaptcha-key' // Required
});
```

### Advanced Configuration
```javascript
ImpactClick.init({
  campaignId: 'your-campaign-id',
  ngoId: 'your-ngo-id',
  apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
  recaptchaSiteKey: 'your-recaptcha-key',
  theme: 'dark',                         // 'light' or 'dark'
  position: 'top-left',                  // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
  ngoName: 'Red Cross',                  // Custom NGO name
  donationAmount: 25,                    // Custom donation amount
  currency: 'USD',                       // Custom currency
  brandLogo: 'https://yourcompany.com/logo.png' // Your brand logo
});
```

---

## 🧪 Testing

### Demo Configuration
For testing, use this configuration:

```javascript
ImpactClick.init({
  campaignId: 'demo-campaign',
  ngoId: 'demo-ngo',
  apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
  recaptchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Test key
  theme: 'light',
  position: 'bottom-right'
});
```

---

## 🎉 That's It!

Your ImpactClick widget is now live on your website! 

- ✅ Widget appears in the specified corner
- ✅ Users can click to donate
- ✅ reCAPTCHA protection is active
- ✅ Donations are tracked automatically

**Need help?** Check the [full tutorial](TUTORIAL.md) or [widget usage guide](WIDGET_USAGE.md) for more details.
