// API configuration for different environments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backend-r26dorhkq-lauro-pimentels-projects.vercel.app/api'
  : 'http://localhost:3001/api';

// API utility functions
export const api = {
  // Analytics endpoints
  getAnalytics: async (timeRange: string = '30') => {
    const response = await fetch(`${API_BASE_URL}/analytics?timeRange=${timeRange}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  // Dashboard endpoints
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  // Campaigns endpoints
  getCampaigns: async () => {
    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  createCampaign: async (campaignData: any) => {
    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(campaignData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  // Click tracking endpoint
  trackClick: async (clickData: any) => {
    const response = await fetch(`${API_BASE_URL}/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};

export default api;
