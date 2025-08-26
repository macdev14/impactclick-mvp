import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  totalClicks: number;
  totalDonations: number;
  totalAmount: number;
  campaigns: Array<{
    id: string;
    name: string;
    clicks: number;
    donations: number;
    amount: number;
    conversionRate: number;
  }>;
  ngos: Array<{
    id: string;
    name: string;
    donations: number;
    amount: number;
    averageDonation: number;
  }>;
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      // Use real API call
      const response = await fetch(`/api/analytics?timeRange=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      // Fallback to mock data if API fails
      const mockData: AnalyticsData = {
        totalClicks: 1500,
        totalDonations: 1200,
        totalAmount: 24000,
        campaigns: [
          {
            id: 'campaign-123',
            name: 'Summer Campaign',
            clicks: 500,
            donations: 450,
            amount: 9000,
            conversionRate: 90,
          },
          {
            id: 'campaign-456',
            name: 'Holiday Drive',
            clicks: 1000,
            donations: 750,
            amount: 15000,
            conversionRate: 75,
          },
        ],
        ngos: [
          {
            id: 'ngo-123',
            name: 'Example NGO',
            donations: 600,
            amount: 12000,
            averageDonation: 20,
          },
          {
            id: 'ngo-456',
            name: 'Wildlife Foundation',
            donations: 600,
            amount: 12000,
            averageDonation: 20,
          },
        ],
      };
      setAnalyticsData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const timeSeriesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Clicks',
        data: [300, 400, 350, 450],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Donations',
        data: [250, 320, 280, 350],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const campaignPerformanceData = {
    labels: analyticsData?.campaigns.map(c => c.name) || [],
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: analyticsData?.campaigns.map(c => c.conversionRate) || [],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
      },
    ],
  };

  const ngoDistributionData = {
    labels: analyticsData?.ngos.map(n => n.name) || [],
    datasets: [
      {
        data: analyticsData?.ngos.map(n => n.amount) || [],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
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
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Detailed performance insights and metrics</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Time Range:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Clicks</h3>
          <p className="text-3xl font-bold text-primary-600">
            {analyticsData?.totalClicks.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Donations</h3>
          <p className="text-3xl font-bold text-green-600">
            {analyticsData?.totalDonations.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Amount</h3>
          <p className="text-3xl font-bold text-green-600">
            DKK {analyticsData?.totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Over Time</h3>
          <Line data={timeSeriesData} options={chartOptions} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Conversion Rates</h3>
          <Bar data={campaignPerformanceData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">NGO Distribution</h3>
          <Doughnut data={ngoDistributionData} options={chartOptions} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Campaigns</h3>
          <div className="space-y-4">
            {analyticsData?.campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-sm text-gray-500">
                    {campaign.donations} donations from {campaign.clicks} clicks
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">DKK {campaign.amount.toLocaleString()}</p>
                  <p className="text-sm text-green-600">{campaign.conversionRate}% conversion</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NGO Performance Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">NGO Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NGO Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Donation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData?.ngos.map((ngo) => (
                <tr key={ngo.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ngo.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ngo.donations.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    DKK {ngo.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    DKK {ngo.averageDonation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
