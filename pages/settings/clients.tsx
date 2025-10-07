import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { 
  Users, 
  Plus, 
  Mail, 
  Key, 
  Building2, 
  Shield, 
  Check, 
  X, 
  Edit, 
  Trash2,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Download,
  Settings,
  Activity,
  ChevronRight
} from 'lucide-react';

interface Client {
  id: string;
  email: string;
  username: string;
  companyName: string;
  plan: string;
  dashboardAccess: string[];
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  apiKey: string;
}

export default function ClientsSettings() {
  const { data: session } = useSession();
  const [clients, setClients] = useState<Client[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showPassword, setShowPassword] = useState<string | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    plan: 'trial',
    dashboardAccess: ['basic'],
    sendCredentials: true
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients/list');
      if (response.ok) {
        const data = await response.json();
        setClients(data.clients || []);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/clients/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message with credentials
        if (data.client.temporaryPassword) {
          setShowPassword(data.client.id);
          alert(`Client created successfully!\n\nUsername: ${data.client.username}\nPassword: ${data.client.temporaryPassword}\n\nCredentials have been emailed to ${data.client.email}`);
        } else {
          alert('Client created successfully!');
        }
        
        // Refresh clients list
        fetchClients();
        
        // Reset form
        setFormData({
          email: '',
          companyName: '',
          plan: 'trial',
          dashboardAccess: ['basic'],
          sendCredentials: true
        });
        
        setShowCreateModal(false);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating client:', error);
      alert('Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const toggleClientStatus = async (clientId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/clients/${clientId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        fetchClients();
      }
    } catch (error) {
      console.error('Error updating client status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Client Management</h1>
              <p className="text-gray-400">Manage Cyfe white-label dashboard access</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Client
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Clients</p>
                <p className="text-2xl font-bold text-white">{clients.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Clients</p>
                <p className="text-2xl font-bold text-white">
                  {clients.filter(c => c.isActive).length}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Enterprise</p>
                <p className="text-2xl font-bold text-white">
                  {clients.filter(c => c.plan === 'enterprise').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Trial</p>
                <p className="text-2xl font-bold text-white">
                  {clients.filter(c => c.plan === 'trial').length}
                </p>
              </div>
              <RefreshCw className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Client Accounts</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-900/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-white font-medium">{client.companyName}</div>
                          <div className="text-gray-400 text-xs">ID: {client.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-gray-300">{client.username}</span>
                        <button
                          onClick={() => copyToClipboard(client.username)}
                          className="ml-2 text-gray-500 hover:text-gray-300"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        client.plan === 'enterprise' 
                          ? 'bg-purple-900/50 text-purple-300 border border-purple-500/50'
                          : client.plan === 'pro'
                          ? 'bg-blue-900/50 text-blue-300 border border-blue-500/50'
                          : client.plan === 'basic'
                          ? 'bg-green-900/50 text-green-300 border border-green-500/50'
                          : 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/50'
                      }`}>
                        {client.plan.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleClientStatus(client.id, client.isActive)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          client.isActive 
                            ? 'bg-green-900/50 text-green-300 border border-green-500/50'
                            : 'bg-red-900/50 text-red-300 border border-red-500/50'
                        }`}
                      >
                        {client.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                      {client.lastLogin 
                        ? new Date(client.lastLogin).toLocaleDateString()
                        : 'Never'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="text-blue-400 hover:text-blue-300"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-yellow-400 hover:text-yellow-300"
                          title="Reset Password"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-300"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="https://optz.siteoptz.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">White-Label Dashboard</h3>
                <p className="text-gray-400 text-sm mt-1">Access the client dashboard</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          
          <button
            className="bg-black border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all group text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Export Client List</h3>
                <p className="text-gray-400 text-sm mt-1">Download CSV file</p>
              </div>
              <Download className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            </div>
          </button>
          
          <button
            className="bg-black border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all group text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Dashboard Settings</h3>
                <p className="text-gray-400 text-sm mt-1">Configure dashboard options</p>
              </div>
              <Settings className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
            </div>
          </button>
        </div>
      </div>

      {/* Create Client Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Client</h2>
            
            <form onSubmit={handleCreateClient} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Plan
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="trial">Trial (30 days)</option>
                  <option value="basic">Basic</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Dashboard Access
                </label>
                <div className="space-y-2">
                  {['basic', 'marketing', 'advanced', 'executive'].map((dashboard) => (
                    <label key={dashboard} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.dashboardAccess.includes(dashboard)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              dashboardAccess: [...formData.dashboardAccess, dashboard]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              dashboardAccess: formData.dashboardAccess.filter(d => d !== dashboard)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-300 capitalize">{dashboard}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.sendCredentials}
                    onChange={(e) => setFormData({ ...formData, sendCredentials: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Send credentials via email</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  
  return {
    props: {},
  };
};