import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface NGO {
  id: string;
  name: string;
  description: string;
  website: string;
  logo?: string;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  ngoId: string;
  ngoName: string;
  donationAmount: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  clicks: number;
  donations: number;
  amount: number;
}

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNGOModal, setShowNGOModal] = useState(false);
  const [showWidgetModal, setShowWidgetModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [editingNGO, setEditingNGO] = useState<NGO | null>(null);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ngoId: '',
    donationAmount: 20,
    startDate: '',
    endDate: '',
  });

  const [ngoFormData, setNgoFormData] = useState({
    name: '',
    description: '',
    website: '',
    logo: '',
  });

  useEffect(() => {
    fetchCampaigns();
    fetchNGOs();
  }, []);

  const fetchCampaigns = async () => {
    try {
      // Mock data - replace with actual API call
      const mockCampaigns: Campaign[] = [
        {
          id: 'campaign-123',
          name: 'Summer Campaign',
          description: 'Help children in need during summer vacation',
          ngoId: 'ngo-123',
          ngoName: 'Example NGO',
          donationAmount: 20,
          status: 'active',
          startDate: '2024-06-01',
          endDate: '2024-08-31',
          clicks: 500,
          donations: 450,
          amount: 9000,
        },
        {
          id: 'campaign-456',
          name: 'Holiday Drive',
          description: 'Support families during the holiday season',
          ngoId: 'ngo-456',
          ngoName: 'Wildlife Foundation',
          donationAmount: 20,
          status: 'active',
          startDate: '2024-11-01',
          endDate: '2024-12-31',
          clicks: 1000,
          donations: 750,
          amount: 15000,
        },
        {
          id: 'campaign-789',
          name: 'Year-End Appeal',
          description: 'Annual fundraising campaign for education',
          ngoId: 'ngo-123',
          ngoName: 'Example NGO',
          donationAmount: 50,
          status: 'paused',
          startDate: '2024-12-01',
          endDate: '2024-12-31',
          clicks: 300,
          donations: 200,
          amount: 10000,
        },
      ];
      
      setCampaigns(mockCampaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNGOs = async () => {
    try {
      // Use real API call
      const response = await fetch('/api/ngos', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setNgos(data);
    } catch (error) {
      console.error('Error fetching NGOs:', error);
      // Fallback to mock data if API fails
      const mockNGOs: NGO[] = [
        {
          id: 'ngo-123',
          name: 'Example NGO',
          description: 'A charitable organization helping children in need',
          website: 'https://example-ngo.org',
        },
        {
          id: 'ngo-456',
          name: 'Wildlife Foundation',
          description: 'Protecting wildlife and natural habitats',
          website: 'https://wildlife-foundation.org',
        },
      ];
      setNgos(mockNGOs);
    }
  };

  const generateWidgetCode = (campaign: Campaign) => {
    const ngo = ngos.find(n => n.id === campaign.ngoId);
    const apiUrl = 'https://backend-mqru8qxeq-lauro-pimentels-projects.vercel.app/api';
    
    return `<!-- ImpactClick Widget Code -->
<script>
  window.ImpactClickConfig = {
    apiUrl: '${apiUrl}',
    campaignId: '${campaign.id}',
    ngoId: '${campaign.ngoId}',
    recaptchaSiteKey: 'your-recaptcha-site-key',
    theme: 'light',
    position: 'bottom-right',
    donationAmount: ${campaign.donationAmount},
    ngoName: '${ngo?.name || campaign.ngoName}',
    ngoDescription: '${ngo?.description || ''}'
  };
</script>
<script src="https://your-widget-domain.com/widget.js"></script>`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateCampaign = () => {
    setFormData({
      name: '',
      description: '',
      ngoId: '',
      donationAmount: 20,
      startDate: '',
      endDate: '',
    });
    setEditingCampaign(null);
    setShowCreateModal(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setFormData({
      name: campaign.name,
      description: campaign.description,
      ngoId: campaign.ngoId,
      donationAmount: campaign.donationAmount,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
    });
    setEditingCampaign(campaign);
    setShowCreateModal(true);
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        // Mock API call - replace with actual implementation
        setCampaigns(campaigns.filter(c => c.id !== campaignId));
      } catch (error) {
        console.error('Error deleting campaign:', error);
      }
    }
  };

  const handleCreateNGO = () => {
    setNgoFormData({
      name: '',
      description: '',
      website: '',
      logo: '',
    });
    setEditingNGO(null);
    setShowNGOModal(true);
  };

  const handleEditNGO = (ngo: NGO) => {
    setNgoFormData({
      name: ngo.name,
      description: ngo.description,
      website: ngo.website,
      logo: ngo.logo || '',
    });
    setEditingNGO(ngo);
    setShowNGOModal(true);
  };

  const handleDeleteNGO = async (ngoId: string) => {
    if (window.confirm('Are you sure you want to delete this NGO?')) {
      try {
        const response = await fetch(`/api/ngos/${ngoId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.ok) {
          setNgos(ngos.filter(n => n.id !== ngoId));
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error deleting NGO:', error);
        alert('Failed to delete NGO. Please try again.');
      }
    }
  };

  const handleShowWidgetCode = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setShowWidgetModal(true);
  };

  const handleSubmitCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCampaign) {
        // Update existing campaign
        const updatedCampaign = { ...editingCampaign, ...formData };
        setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? updatedCampaign : c));
      } else {
        // Create new campaign
        const newCampaign: Campaign = {
          id: `campaign-${Date.now()}`,
          ...formData,
          ngoName: ngos.find(n => n.id === formData.ngoId)?.name || '',
          status: 'active',
          clicks: 0,
          donations: 0,
          amount: 0,
        };
        setCampaigns([...campaigns, newCampaign]);
        
        // Show widget code after creation
        setCurrentCampaign(newCampaign);
        setShowWidgetModal(true);
      }
      setShowCreateModal(false);
      setFormData({
        name: '',
        description: '',
        ngoId: '',
        donationAmount: 20,
        startDate: '',
        endDate: '',
      });
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  const handleSubmitNGO = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingNGO) {
        // Update existing NGO
        const response = await fetch(`/api/ngos/${editingNGO.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(ngoFormData),
        });
        
        if (response.ok) {
          const updatedNGO = await response.json();
          setNgos(ngos.map(n => n.id === editingNGO.id ? updatedNGO : n));
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        // Create new NGO
        const response = await fetch('/api/ngos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(ngoFormData),
        });
        
        if (response.ok) {
          const newNGO = await response.json();
          setNgos([...ngos, newNGO]);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      setShowNGOModal(false);
      setNgoFormData({
        name: '',
        description: '',
        website: '',
        logo: '',
      });
    } catch (error) {
      console.error('Error saving NGO:', error);
      alert('Failed to save NGO. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns & NGOs</h1>
          <p className="text-gray-600">Manage your CSR advertising campaigns and NGO partners</p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleCreateNGO}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Create NGO
          </button>
          <button
            onClick={handleCreateCampaign}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Campaigns</h3>
          <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Campaigns</h3>
          <p className="text-2xl font-bold text-green-600">
            {campaigns.filter(c => c.status === 'active').length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
          <p className="text-2xl font-bold text-blue-600">
            {campaigns.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Donations</h3>
          <p className="text-2xl font-bold text-green-600">
            {campaigns.reduce((sum, c) => sum + c.donations, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* NGOs Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">NGO Partners</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NGO Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ngos.map((ngo) => (
                <tr key={ngo.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ngo.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">{ngo.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:text-primary-900">
                      {ngo.website}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditNGO(ngo)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNGO(ngo.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NGO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.description}</div>
                      <div className="text-xs text-gray-400">
                        {campaign.startDate} - {campaign.endDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.ngoName}</div>
                    <div className="text-sm text-gray-500">DKK {campaign.donationAmount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.donations} donations</div>
                    <div className="text-sm text-gray-500">{campaign.clicks} clicks</div>
                    <div className="text-xs text-green-600">
                      {campaign.clicks > 0 ? Math.round((campaign.donations / campaign.clicks) * 100) : 0}% conversion
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    DKK {campaign.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShowWidgetCode(campaign)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Get Widget Code"
                      >
                        <CodeBracketIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditCampaign(campaign)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
              </h3>
              
              <form onSubmit={handleSubmitCampaign} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter campaign name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter campaign description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">NGO Partner</label>
                  <select
                    value={formData.ngoId}
                    onChange={(e) => setFormData({ ...formData, ngoId: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select an NGO</option>
                    {ngos.map((ngo) => (
                      <option key={ngo.id} value={ngo.id}>
                        {ngo.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Donation Amount (DKK)</label>
                  <input
                    type="number"
                    value={formData.donationAmount}
                    onChange={(e) => setFormData({ ...formData, donationAmount: parseInt(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="20"
                    min="1"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingCampaign(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
                  >
                    {editingCampaign ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit NGO Modal */}
      {showNGOModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingNGO ? 'Edit NGO' : 'Create New NGO'}
              </h3>
              
              <form onSubmit={handleSubmitNGO} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">NGO Name</label>
                  <input
                    type="text"
                    value={ngoFormData.name}
                    onChange={(e) => setNgoFormData({ ...ngoFormData, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter NGO name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={ngoFormData.description}
                    onChange={(e) => setNgoFormData({ ...ngoFormData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter NGO description"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website</label>
                  <input
                    type="url"
                    value={ngoFormData.website}
                    onChange={(e) => setNgoFormData({ ...ngoFormData, website: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="https://example.org"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Logo URL (Optional)</label>
                  <input
                    type="url"
                    value={ngoFormData.logo}
                    onChange={(e) => setNgoFormData({ ...ngoFormData, logo: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="https://example.org/logo.png"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNGOModal(false);
                      setEditingNGO(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
                  >
                    {editingNGO ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Widget Code Modal */}
      {showWidgetModal && currentCampaign && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Widget Code for: {currentCampaign.name}
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Copy and paste this code into your website to display the ImpactClick widget:
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">
                    {generateWidgetCode(currentCampaign)}
                  </pre>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-900 mb-2">Configuration Options:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>apiUrl:</strong> Backend API endpoint</li>
                  <li><strong>campaignId:</strong> Unique campaign identifier</li>
                  <li><strong>ngoId:</strong> NGO partner identifier</li>
                  <li><strong>donationAmount:</strong> Default donation amount in DKK</li>
                  <li><strong>theme:</strong> Widget theme (light/dark)</li>
                  <li><strong>position:</strong> Widget position (bottom-right, bottom-left, top-right, top-left)</li>
                </ul>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowWidgetModal(false);
                    setCurrentCampaign(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generateWidgetCode(currentCampaign));
                    alert('Widget code copied to clipboard!');
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
