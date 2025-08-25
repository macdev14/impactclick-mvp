# ImpactClick Widget Usage Guide

## 🎯 Overview

The ImpactClick widget is an embeddable component that allows users to trigger corporate-funded donations to NGOs through simple clicks. It's designed to be easily integrated into any website.

## 🚀 Quick Start

### 1. Basic Integration

Add this code to your HTML page:

```html
<!-- Load the ImpactClick widget -->
<script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>

<!-- Initialize the widget -->
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

### 2. Demo Integration

For testing purposes, you can use the demo configuration:

```html
<script src="https://cdn.jsdelivr.net/npm/impactclick-widget@1.0.0/dist/impactclick-widget.js"></script>
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

## ⚙️ Configuration Options

### Required Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `campaignId` | string | Unique identifier for your campaign | `'summer-campaign-2024'` |
| `ngoId` | string | Unique identifier for the NGO | `'red-cross'` |
| `apiUrl` | string | Backend API endpoint | `'https://your-api.com/api'` |
| `recaptchaSiteKey` | string | Google reCAPTCHA site key | `'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'` |

### Optional Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `theme` | 'light' \| 'dark' | 'light' | Widget appearance theme |
| `position` | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | 'bottom-right' | Widget position on page |
| `brandLogo` | string | - | URL to your brand logo |
| `ngoName` | string | - | Display name for the NGO |
| `donationAmount` | number | 20 | Amount donated per click |
| `currency` | string | 'DKK' | Currency for donations |

## 🎨 Customization Examples

### 1. Dark Theme Widget

```html
<script>
  ImpactClick.init({
    campaignId: 'winter-campaign',
    ngoId: 'unicef',
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-key',
    theme: 'dark',
    position: 'top-right',
    ngoName: 'UNICEF',
    donationAmount: 50,
    currency: 'USD'
  });
</script>
```

### 2. Custom Branded Widget

```html
<script>
  ImpactClick.init({
    campaignId: 'holiday-drive',
    ngoId: 'doctors-without-borders',
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-key',
    theme: 'light',
    position: 'bottom-left',
    brandLogo: 'https://yourcompany.com/logo.png',
    ngoName: 'Doctors Without Borders',
    donationAmount: 25,
    currency: 'EUR'
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
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-key',
    position: 'bottom-right'
  });
  
  // Second widget (different position)
  ImpactClick.init({
    campaignId: 'campaign-2',
    ngoId: 'ngo-2',
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-key',
    position: 'top-left'
  });
</script>
```

## 🔧 Advanced Usage

### 1. Dynamic Configuration

You can update the widget configuration dynamically:

```html
<script>
  // Initialize with basic config
  let widgetConfig = {
    campaignId: 'dynamic-campaign',
    ngoId: 'dynamic-ngo',
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-key'
  };
  
  // Initialize widget
  ImpactClick.init(widgetConfig);
  
  // Update configuration based on user preferences
  function updateWidgetTheme(theme) {
    widgetConfig.theme = theme;
    // Re-initialize with new config
    ImpactClick.init(widgetConfig);
  }
  
  // Example: Switch to dark theme
  updateWidgetTheme('dark');
</script>
```

### 2. Event Handling

The widget provides callback functions for different events:

```html
<script>
  ImpactClick.init({
    campaignId: 'event-campaign',
    ngoId: 'event-ngo',
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-key',
    onSuccess: function(response) {
      console.log('Donation successful:', response);
      // Track conversion in analytics
      gtag('event', 'donation_completed', {
        value: response.amount,
        currency: 'DKK'
      });
    },
    onError: function(error) {
      console.error('Donation failed:', error);
      // Show error message to user
      alert('Sorry, the donation could not be processed. Please try again.');
    }
  });
</script>
```

## 🧪 Testing

### 1. Demo Mode

For development and testing, use the demo configuration:

```html
<script>
  ImpactClick.init({
    campaignId: 'demo-campaign',
    ngoId: 'demo-ngo',
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Test key
    theme: 'light',
    position: 'bottom-right'
  });
</script>
```

### 2. Local Development

For local development, point to your local backend:

```html
<script>
  ImpactClick.init({
    campaignId: 'local-campaign',
    ngoId: 'local-ngo',
    apiUrl: 'http://localhost:3001/api',
    recaptchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    theme: 'light',
    position: 'bottom-right'
  });
</script>
```

## 📱 Responsive Design

The widget is fully responsive and works on all devices:

- **Desktop**: Full widget with detailed information
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Compact design for small screens

## 🔒 Security Features

### 1. reCAPTCHA Integration

The widget automatically integrates with Google reCAPTCHA v3 for bot protection:

```html
<script>
  ImpactClick.init({
    campaignId: 'secure-campaign',
    ngoId: 'secure-ngo',
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-production-recaptcha-key', // Use production key
    theme: 'light',
    position: 'bottom-right'
  });
</script>
```

### 2. Session Management

The widget automatically generates unique session IDs to prevent duplicate donations.

## 📊 Analytics Integration

### 1. Google Analytics

Track widget interactions with Google Analytics:

```html
<script>
  ImpactClick.init({
    campaignId: 'analytics-campaign',
    ngoId: 'analytics-ngo',
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-key',
    onSuccess: function(response) {
      // Track successful donations
      gtag('event', 'donation_completed', {
        event_category: 'ImpactClick',
        event_label: response.ngo,
        value: parseFloat(response.amount.replace(/[^0-9.]/g, ''))
      });
    },
    onShow: function() {
      // Track widget impressions
      gtag('event', 'widget_impression', {
        event_category: 'ImpactClick'
      });
    }
  });
</script>
```

### 2. Custom Analytics

You can integrate with any analytics platform:

```html
<script>
  ImpactClick.init({
    campaignId: 'custom-analytics-campaign',
    ngoId: 'custom-analytics-ngo',
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-key',
    onSuccess: function(response) {
      // Custom analytics tracking
      mixpanel.track('Donation Completed', {
        campaign: response.campaignId,
        ngo: response.ngo,
        amount: response.amount,
        donationId: response.donationId
      });
    }
  });
</script>
```

## 🐛 Troubleshooting

### Common Issues

1. **Widget not appearing**
   - Check if the script is loaded correctly
   - Verify all required parameters are provided
   - Check browser console for errors

2. **reCAPTCHA errors**
   - Ensure the reCAPTCHA site key is correct
   - Check if the domain is authorized in reCAPTCHA settings

3. **API connection issues**
   - Verify the API URL is correct and accessible
   - Check CORS configuration on the backend
   - Ensure the backend is running

### Debug Mode

Enable debug mode for detailed logging:

```html
<script>
  // Enable debug mode
  window.ImpactClickDebug = true;
  
  ImpactClick.init({
    campaignId: 'debug-campaign',
    ngoId: 'debug-ngo',
    apiUrl: 'https://backend-q9cnjbs70-lauro-pimentels-projects.vercel.app/api',
    recaptchaSiteKey: 'your-recaptcha-key'
  });
</script>
```

## 📞 Support

For technical support or questions:

- **Documentation**: Check this guide and the README
- **Issues**: Report bugs on GitHub
- **Email**: support@impactclick.com

## 🎯 Best Practices

1. **Use descriptive campaign IDs**: Make them meaningful and unique
2. **Test thoroughly**: Always test in development before production
3. **Monitor performance**: Track widget interactions and conversions
4. **Update regularly**: Keep the widget version up to date
5. **Provide feedback**: Let users know their impact

---

**Ready to make an impact?** Start integrating the ImpactClick widget today! 🚀
