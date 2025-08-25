import { ImpactClickWidget } from './widget';
import { ImpactClickConfig } from './types';

// Global configuration
let globalConfig: ImpactClickConfig = {
  campaignId: 'demo-campaign',
  ngoId: 'demo-ngo',
  apiUrl: 'http://localhost:3000/api',
  recaptchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Test key
  theme: 'light',
  position: 'bottom-right',
};

// Initialize the widget
export function init(config: Partial<ImpactClickConfig> = {}): void {
  globalConfig = { ...globalConfig, ...config };
  
  // Load reCAPTCHA script if not already loaded
  if (!window.grecaptcha) {
    loadRecaptchaScript();
  }
  
  // Create and mount widget
  const widget = new ImpactClickWidget(globalConfig);
  widget.mount();
}

// Load reCAPTCHA script
function loadRecaptchaScript(): void {
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${globalConfig.recaptchaSiteKey}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Add global type declaration for grecaptcha
declare global {
  interface Window {
    grecaptcha: any;
    ImpactClick: {
      init: typeof init;
    };
  }
}

// Export types and classes
export { ImpactClickWidget } from './widget';
export { ImpactClickConfig } from './types';



window.ImpactClick = {
  init,
};
