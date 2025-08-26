// API configuration for different environments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backend-mqru8qxeq-lauro-pimentels-projects.vercel.app/api'
  : 'http://localhost:3001/api';

// Helper function to convert time range to date range
const getDateRangeFromTimeRange = (timeRange: string) => {
  const endDate = new Date();
  const startDate = new Date();
  
  switch (timeRange) {
    case '7':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '90':
      startDate.setDate(endDate.getDate() - 90);
      break;
    default:
      startDate.setDate(endDate.getDate() - 30);
  }
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

// API utility functions
export const api = {
  // Analytics endpoints
  getAnalytics: async (timeRange: string = '30') => {
    const { startDate, endDate } = getDateRangeFromTimeRange(timeRange);
    const response = await fetch(`${API_BASE_URL}/analytics?startDate=${startDate}&endDate=${endDate}`, {
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

  // NGO endpoints
  getNGOs: async () => {
    const response = await fetch(`${API_BASE_URL}/ngos`, {
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

  createNGO: async (ngoData: any) => {
    const response = await fetch(`${API_BASE_URL}/ngos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(ngoData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  updateNGO: async (ngoId: string, ngoData: any) => {
    const response = await fetch(`${API_BASE_URL}/ngos/${ngoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(ngoData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  deleteNGO: async (ngoId: string) => {
    const response = await fetch(`${API_BASE_URL}/ngos/${ngoId}`, {
      method: 'DELETE',
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
