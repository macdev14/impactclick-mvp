# 🎯 ImpactClick Widget Tutorial

## How to Add the Widget to Your Website

This tutorial will guide you through the process of adding the ImpactClick widget to any website, from basic integration to advanced customization.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Basic Integration](#basic-integration)
3. [Customization Options](#customization-options)
4. [Advanced Features](#advanced-features)
5. [Testing & Debugging](#testing--debugging)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before you start, make sure you have:

- ✅ A website where you want to add the widget
- ✅ Access to edit the HTML code
- ✅ A reCAPTCHA site key (get one from [Google reCAPTCHA](https://www.google.com/recaptcha/admin))
- ✅ Campaign and NGO IDs (provided by your ImpactClick admin)

---

## 🚀 Basic Integration

### Step 1: Add the Widget Script

Add this script tag to your HTML page's `<head>` section:

```html
<head>
    <!-- Your existing head content -->
    
    <!-- Load the ImpactClick widget -->
    <script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>
</head>
```

### Step 2: Initialize the Widget

Add this script before the closing `</body>` tag:

```html
<body>
    <!-- Your website content -->
    
    <!-- Initialize the ImpactClick widget -->
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
</body>
```

### Step 3: Test the Integration

1. Save your HTML file
2. Open it in a web browser
3. The widget should appear in the bottom-right corner
4. Click the widget to test the donation functionality

---

## 🎨 Customization Options

### 1. Widget Position

You can position the widget in any of the four corners:

```html
<script>
    ImpactClick.init({
        campaignId: 'your-campaign-id',
        ngoId: 'your-ngo-id',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key',
        position: 'top-left'    // Options: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
    });
</script>
```

### 2. Theme Customization

Choose between light and dark themes:

```html
<script>
    ImpactClick.init({
        campaignId: 'your-campaign-id',
        ngoId: 'your-ngo-id',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key',
        theme: 'dark'    // Options: 'light', 'dark'
    });
</script>
```

### 3. Custom NGO Information

Display custom NGO name and donation amount:

```html
<script>
    ImpactClick.init({
        campaignId: 'your-campaign-id',
        ngoId: 'your-ngo-id',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key',
        ngoName: 'Red Cross',
        donationAmount: 25,
        currency: 'USD'
    });
</script>
```

### 4. Brand Logo

Add your company logo to the widget:

```html
<script>
    ImpactClick.init({
        campaignId: 'your-campaign-id',
        ngoId: 'your-ngo-id',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key',
        brandLogo: 'https://yourcompany.com/logo.png'
    });
</script>
```

---

## 🔧 Advanced Features

### 1. Event Callbacks

Track widget interactions with callback functions:

```html
<script>
    ImpactClick.init({
        campaignId: 'your-campaign-id',
        ngoId: 'your-ngo-id',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key',
        
        // Success callback
        onSuccess: function(response) {
            console.log('Donation successful:', response);
            
            // Track in Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'donation_completed', {
                    value: response.amount,
                    currency: 'DKK'
                });
            }
            
            // Show success message
            alert('Thank you for your donation!');
        },
        
        // Error callback
        onError: function(error) {
            console.error('Donation failed:', error);
            alert('Sorry, the donation could not be processed. Please try again.');
        },
        
        // Widget shown callback
        onShow: function() {
            console.log('Widget is now visible');
        }
    });
</script>
```

### 2. Dynamic Configuration

Update widget settings based on user preferences:

```html
<script>
    // Initial configuration
    let widgetConfig = {
        campaignId: 'dynamic-campaign',
        ngoId: 'dynamic-ngo',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key',
        theme: 'light'
    };
    
    // Initialize widget
    ImpactClick.init(widgetConfig);
    
    // Function to update theme
    function updateWidgetTheme(theme) {
        widgetConfig.theme = theme;
        // Re-initialize with new config
        ImpactClick.init(widgetConfig);
    }
    
    // Example: Switch to dark theme
    document.getElementById('dark-theme-btn').addEventListener('click', function() {
        updateWidgetTheme('dark');
    });
</script>
```

### 3. Multiple Widgets

You can have multiple widgets on the same page for different campaigns:

```html
<script>
    // First widget
    ImpactClick.init({
        campaignId: 'campaign-1',
        ngoId: 'ngo-1',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key',
        position: 'bottom-right'
    });
    
    // Second widget
    ImpactClick.init({
        campaignId: 'campaign-2',
        ngoId: 'ngo-2',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key',
        position: 'top-left'
    });
</script>
```

---

## 🧪 Testing & Debugging

### 1. Demo Mode

For testing purposes, use the demo configuration:

```html
<script>
    ImpactClick.init({
        campaignId: 'demo-campaign',
        ngoId: 'demo-ngo',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Test key
        theme: 'light',
        position: 'bottom-right'
    });
</script>
```

### 2. Debug Mode

Enable debug mode for detailed logging:

```html
<script>
    // Enable debug mode
    window.ImpactClickDebug = true;
    
    ImpactClick.init({
        campaignId: 'debug-campaign',
        ngoId: 'debug-ngo',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-recaptcha-site-key'
    });
</script>
```

### 3. Browser Console

Check the browser console for any errors or debug information:

1. Open Developer Tools (F12)
2. Go to the Console tab
3. Look for any error messages or debug logs

---

## 🚀 Production Deployment

### 1. Get Production reCAPTCHA Key

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Create a new site
3. Add your domain to the allowed domains
4. Copy the site key

### 2. Update Configuration

Replace the test configuration with production settings:

```html
<script>
    ImpactClick.init({
        campaignId: 'production-campaign',
        ngoId: 'production-ngo',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-production-recaptcha-key', // Use production key
        theme: 'light',
        position: 'bottom-right'
    });
</script>
```

### 3. Analytics Integration

Add analytics tracking for production:

```html
<script>
    ImpactClick.init({
        campaignId: 'production-campaign',
        ngoId: 'production-ngo',
        apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
        recaptchaSiteKey: 'your-production-recaptcha-key',
        
        onSuccess: function(response) {
            // Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'donation_completed', {
                    event_category: 'ImpactClick',
                    event_label: response.ngo,
                    value: parseFloat(response.amount.replace(/[^0-9.]/g, ''))
                });
            }
            
            // Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Purchase', {
                    value: parseFloat(response.amount.replace(/[^0-9.]/g, '')),
                    currency: 'DKK'
                });
            }
        }
    });
</script>
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Widget Not Appearing

**Problem**: The widget doesn't show up on the page.

**Solutions**:
- Check if the script is loaded correctly
- Verify all required parameters are provided
- Check browser console for errors
- Ensure the page is fully loaded before initializing

```html
<!-- Make sure script is loaded -->
<script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>

<!-- Initialize after page loads -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        ImpactClick.init({
            campaignId: 'your-campaign-id',
            ngoId: 'your-ngo-id',
            apiUrl: 'https://backend-mol3m0410-lauro-pimentels-projects.vercel.app/api',
            recaptchaSiteKey: 'your-recaptcha-site-key'
        });
    });
</script>
```

#### 2. reCAPTCHA Errors

**Problem**: reCAPTCHA verification fails.

**Solutions**:
- Ensure the reCAPTCHA site key is correct
- Check if the domain is authorized in reCAPTCHA settings
- Use the test key for development

#### 3. API Connection Issues

**Problem**: Widget can't connect to the backend API.

**Solutions**:
- Verify the API URL is correct and accessible
- Check CORS configuration
- Ensure the backend is running
- Test the API endpoint directly

### Debug Checklist

- [ ] Script loaded successfully
- [ ] All required parameters provided
- [ ] reCAPTCHA site key is valid
- [ ] API URL is accessible
- [ ] No JavaScript errors in console
- [ ] Domain is authorized in reCAPTCHA
- [ ] CORS is configured correctly

---

## 📱 Responsive Design

The widget is fully responsive and works on all devices:

### Desktop
- Full widget with detailed information
- Hover effects and animations
- Complete NGO information

### Tablet
- Optimized layout for medium screens
- Touch-friendly interactions
- Compact design

### Mobile
- Compact design for small screens
- Touch-optimized buttons
- Minimal information display

---

## 🎯 Best Practices

### 1. Performance
- Load the widget script asynchronously
- Initialize after page content loads
- Use production reCAPTCHA keys

### 2. User Experience
- Position the widget where it's visible but not intrusive
- Use appropriate themes for your website
- Provide clear feedback for user actions

### 3. Analytics
- Track widget interactions
- Monitor conversion rates
- A/B test different configurations

### 4. Security
- Use production reCAPTCHA keys
- Validate all user inputs
- Monitor for suspicious activity

---

## 📞 Support

If you encounter any issues:

1. **Check the documentation**: Review this tutorial and the widget usage guide
2. **Browser console**: Look for error messages
3. **GitHub Issues**: Report bugs on the repository
4. **Email Support**: Contact support@impactclick.com

---

## 🎉 Congratulations!

You've successfully added the ImpactClick widget to your website! 

The widget will now:
- ✅ Appear on your website
- ✅ Allow users to make donations with one click
- ✅ Track interactions and conversions
- ✅ Provide real-time feedback
- ✅ Work on all devices

**Ready to make an impact?** Start collecting donations and making a difference! 🚀
