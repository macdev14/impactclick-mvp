import { ImpactClickConfig, ClickRequest, ClickResponse, WidgetState } from './types';
import { generateSessionId, generateUUID } from './utils';

export class ImpactClickWidget {
  private config: ImpactClickConfig;
  private state: WidgetState;
  private element: HTMLElement | null = null;
  private sessionId: string;

  constructor(config: ImpactClickConfig) {
    this.config = {
      theme: 'light',
      position: 'bottom-right',
      donationAmount: 20,
      currency: 'DKK',
      ...config,
    };
    
    this.sessionId = generateSessionId();
    this.state = {
      isVisible: true,
      isClicked: false,
      isLoading: false,
      error: null,
      donationId: null,
    };
  }

  mount(): void {
    // Create widget element
    this.element = this.createWidgetElement();
    
    // Add to page
    document.body.appendChild(this.element);
    
    // Add styles
    this.addStyles();
    
    // Initialize
    this.render();
  }

  private createWidgetElement(): HTMLElement {
    const element = document.createElement('div');
    element.id = 'impactclick-widget';
    element.className = `impactclick-widget impactclick-${this.config.theme} impactclick-${this.config.position}`;
    return element;
  }

  private addStyles(): void {
    if (document.getElementById('impactclick-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'impactclick-styles';
    style.textContent = this.getStyles();
    document.head.appendChild(style);
  }

  private getStyles(): string {
    return `
      .impactclick-widget {
        position: fixed;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        line-height: 1.4;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-radius: 12px;
        transition: all 0.3s ease;
        max-width: 320px;
        min-width: 280px;
      }

      .impactclick-bottom-right {
        bottom: 20px;
        right: 20px;
      }

      .impactclick-bottom-left {
        bottom: 20px;
        left: 20px;
      }

      .impactclick-top-right {
        top: 20px;
        right: 20px;
      }

      .impactclick-top-left {
        top: 20px;
        left: 20px;
      }

      .impactclick-light {
        background: white;
        color: #333;
        border: 1px solid #e5e7eb;
      }

      .impactclick-dark {
        background: #1f2937;
        color: white;
        border: 1px solid #374151;
      }

      .impactclick-widget-header {
        padding: 16px;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .impactclick-dark .impactclick-widget-header {
        border-bottom-color: #374151;
      }

      .impactclick-widget-logo {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        object-fit: cover;
      }

      .impactclick-widget-title {
        font-weight: 600;
        font-size: 16px;
        margin: 0;
      }

      .impactclick-widget-body {
        padding: 16px;
      }

      .impactclick-widget-message {
        margin-bottom: 16px;
        color: #6b7280;
      }

      .impactclick-dark .impactclick-widget-message {
        color: #9ca3af;
      }

      .impactclick-widget-button {
        width: 100%;
        padding: 12px 16px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .impactclick-light .impactclick-widget-button {
        background: #3b82f6;
        color: white;
      }

      .impactclick-light .impactclick-widget-button:hover {
        background: #2563eb;
      }

      .impactclick-dark .impactclick-widget-button {
        background: #60a5fa;
        color: white;
      }

      .impactclick-dark .impactclick-widget-button:hover {
        background: #3b82f6;
      }

      .impactclick-widget-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .impactclick-widget-button .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .impactclick-widget-success {
        background: #10b981;
        color: white;
      }

      .impactclick-widget-error {
        background: #ef4444;
        color: white;
      }

      .impactclick-widget-close {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        font-size: 18px;
        line-height: 1;
      }

      .impactclick-widget-close:hover {
        background: rgba(0, 0, 0, 0.1);
      }

      .impactclick-dark .impactclick-widget-close:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      @media (max-width: 768px) {
        .impactclick-widget {
          max-width: calc(100vw - 40px);
          min-width: auto;
        }
      }
    `;
  }

  private render(): void {
    if (!this.element) return;

    const { isClicked, isLoading, error, donationId } = this.state;
    const { theme, brandLogo, ngoName, donationAmount, currency } = this.config;

    let buttonText = `Click to donate ${currency} ${donationAmount} to ${ngoName || 'Example NGO'}`;
    let buttonClass = 'impactclick-widget-button';
    let buttonContent = buttonText;

    if (isLoading) {
      buttonContent = '<span class="spinner"></span> Processing...';
      buttonClass += ' impactclick-widget-button:disabled';
    } else if (isClicked && donationId) {
      buttonContent = '✓ Donation Successful!';
      buttonClass += ' impactclick-widget-success';
    } else if (error) {
      buttonContent = 'Error - Please try again';
      buttonClass += ' impactclick-widget-error';
    }

    this.element.innerHTML = `
      <button class="impactclick-widget-close" onclick="this.parentElement.remove()">×</button>
      <div class="impactclick-widget-header">
        ${brandLogo ? `<img src="${brandLogo}" alt="Brand" class="impactclick-widget-logo">` : ''}
        <h3 class="impactclick-widget-title">Make an Impact</h3>
      </div>
      <div class="impactclick-widget-body">
        <p class="impactclick-widget-message">
          Your click will trigger a corporate donation to support ${ngoName || 'Example NGO'}.
        </p>
        <button 
          class="${buttonClass}"
          onclick="window.ImpactClickWidget.handleClick()"
          ${isLoading || isClicked ? 'disabled' : ''}
        >
          ${buttonContent}
        </button>
      </div>
    `;
  }

  async handleClick(): Promise<void> {
    if (this.state.isLoading || this.state.isClicked) return;

    this.state.isLoading = true;
    this.state.error = null;
    this.render();

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await this.getRecaptchaToken();
      
      // Prepare request
      const request: ClickRequest = {
        campaignId: this.config.campaignId,
        ngoId: this.config.ngoId,
        sessionId: this.sessionId,
        recaptchaToken,
        userAgent: navigator.userAgent,
      };

      // Send request
      const response = await this.sendClickRequest(request);
      
      // Update state
      this.state.isClicked = true;
      this.state.donationId = response.donationId;
      this.state.isLoading = false;
      
      // Show success message
      this.render();
      
      // Hide widget after 3 seconds
      setTimeout(() => {
        if (this.element) {
          this.element.style.opacity = '0';
          setTimeout(() => {
            if (this.element) {
              this.element.remove();
            }
          }, 300);
        }
      }, 3000);

    } catch (error) {
      console.error('Widget click error:', error);
      this.state.error = 'Failed to process donation';
      this.state.isLoading = false;
      this.render();
    }
  }

  private async getRecaptchaToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject(new Error('reCAPTCHA not loaded'));
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(this.config.recaptchaSiteKey, { action: 'click' })
          .then((token: string) => resolve(token))
          .catch(reject);
        });
    });
  }

  private async sendClickRequest(request: ClickRequest): Promise<ClickResponse> {
    const response = await fetch(`${this.config.apiUrl}/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

// Make handleClick available globally
declare global {
  interface Window {
    ImpactClickWidget: {
      handleClick: () => Promise<void>;
    };
  }
}

window.ImpactClickWidget = {
  handleClick: async () => {
    // This will be set by the widget instance
    console.warn('Widget not initialized');
  },
};
