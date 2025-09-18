import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useUserPlan } from '../../../../hooks/useUserPlan';
import { DashboardHeader } from '../../../../components/dashboard/DashboardHeader';
import { 
  CreditCard,
  Calendar,
  TrendingUp,
  Download,
  Crown,
  ArrowRight,
  Check,
  FileText,
  DollarSign,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Users,
  Building,
  Shield,
  Clock,
  Settings,
  Phone,
  Mail,
  Zap,
  Target,
  PieChart,
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function EnterpriseBilling() {
  const { userPlan, loading } = useUserPlan();
  const [activeTab, setBillingTab] = useState('overview');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading enterprise billing...</p>
        </div>
      </div>
    );
  }

  const invoices = [
    { id: 'INV-ENT-2024-001', date: '2024-12-01', amount: 12500, status: 'paid', plan: 'Enterprise Annual', description: 'Annual Enterprise License + Premium Support' },
    { id: 'INV-ENT-2023-012', date: '2023-12-01', amount: 11800, status: 'paid', plan: 'Enterprise Annual', description: 'Annual Enterprise License' },
    { id: 'INV-ENT-2023-006', date: '2023-06-15', amount: 2500, status: 'paid', plan: 'Professional Services', description: 'Custom Integration Development' }
  ];

  const departmentUsage = [
    { department: 'Product Team', users: 12, apiCalls: 15420, cost: 2850, percentage: 28 },
    { department: 'Engineering', users: 18, apiCalls: 22680, cost: 3890, percentage: 35 },
    { department: 'Marketing', users: 8, apiCalls: 8930, cost: 1950, percentage: 18 },
    { department: 'Sales', users: 6, apiCalls: 5670, cost: 1320, percentage: 12 },
    { department: 'Support', users: 3, apiCalls: 3240, cost: 740, percentage: 7 }
  ];

  const monthlyTrends = [
    { month: 'Oct', apiCalls: 45000, cost: 8500, users: 42 },
    { month: 'Nov', apiCalls: 52000, cost: 9800, users: 45 },
    { month: 'Dec', apiCalls: 55940, cost: 10750, users: 47 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'usage', label: 'Usage Analytics', icon: Activity },
    { id: 'departments', label: 'Department Breakdown', icon: Building },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'contracts', label: 'Contracts & SLA', icon: Shield }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gray-900 rounded-lg">
                <div className="text-3xl font-bold text-yellow-400 mb-1">$10,750</div>
                <div className="text-sm text-gray-400">Current Month Cost</div>
                <div className="text-xs text-green-400 mt-1">↑ 9% vs last month</div>
              </div>
              <div className="p-6 bg-gray-900 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">47</div>
                <div className="text-sm text-gray-400">Active Users</div>
                <div className="text-xs text-green-400 mt-1">↑ 4% growth</div>
              </div>
              <div className="p-6 bg-gray-900 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">55.9K</div>
                <div className="text-sm text-gray-400">API Calls (This Month)</div>
                <div className="text-xs text-blue-400 mt-1">Unlimited plan</div>
              </div>
              <div className="p-6 bg-gray-900 rounded-lg">
                <div className="text-3xl font-bold text-white mb-1">99.98%</div>
                <div className="text-sm text-gray-400">Uptime SLA</div>
                <div className="text-xs text-green-400 mt-1">Above guarantee</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">Monthly Trend</h4>
                <div className="space-y-3">
                  {monthlyTrends.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300 font-medium">{month.month}</span>
                        <span className="text-gray-400 text-sm">{month.users} users</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">${month.cost.toLocaleString()}</div>
                        <div className="text-gray-400 text-xs">{month.apiCalls.toLocaleString()} calls</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">Contract Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract Type:</span>
                    <span className="text-white">Enterprise Annual</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Renewal Date:</span>
                    <span className="text-white">Dec 1, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Annual Commitment:</span>
                    <span className="text-yellow-400 font-medium">$129,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Used This Year:</span>
                    <span className="text-green-400">$127,540 (99%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Manager:</span>
                    <span className="text-blue-400">Alex Morrison</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Cost Optimization Insights</h4>
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">AI-Powered</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium text-sm">Optimization Opportunity</span>
                  </div>
                  <p className="text-gray-300 text-sm">Your Engineering team&apos;s API usage efficiency is 15% above average. Consider migrating similar patterns to other departments.</p>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-medium text-sm">Usage Pattern</span>
                  </div>
                  <p className="text-gray-300 text-sm">Peak usage occurs between 9-11 AM PST. Consider batch processing during off-peak hours for better performance.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">∞</div>
                <div className="text-sm text-gray-400">API Calls Limit</div>
                <div className="text-xs text-green-400 mt-1">Unlimited Enterprise</div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">47/∞</div>
                <div className="text-sm text-gray-400">Team Members</div>
                <div className="text-xs text-blue-400 mt-1">Unlimited seats</div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">2.1TB</div>
                <div className="text-sm text-gray-400">Data Processed</div>
                <div className="text-xs text-green-400 mt-1">This month</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">API Usage by Endpoint</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">/api/v1/tools/compare</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div className="w-4/5 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-white text-sm">22.4K</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">/api/v1/analytics</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div className="w-3/5 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-white text-sm">18.1K</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">/api/v1/reports</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div className="w-2/5 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-white text-sm">9.2K</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">/api/v1/webhooks</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div className="w-1/5 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-white text-sm">6.2K</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">98.7%</div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">45ms</div>
                    <div className="text-xs text-gray-400">Avg Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">99.98%</div>
                    <div className="text-xs text-gray-400">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">4.2/5</div>
                    <div className="text-xs text-gray-400">Performance Score</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-900 rounded-lg">
              <h4 className="text-white font-medium mb-4">Usage Timeline (Last 30 Days)</h4>
              <div className="h-32 flex items-end justify-between gap-1">
                {Array.from({length: 30}, (_, i) => (
                  <div key={i} className="flex-1 bg-gray-700 rounded-t" style={{height: `${Math.random() * 100 + 20}%`}}>
                    <div className="w-full bg-gradient-to-t from-yellow-600 to-orange-600 rounded-t" style={{height: '70%'}}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-gray-400 text-xs mt-2">
                <span>30 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>
        );

      case 'departments':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">Department Cost Distribution</h4>
                <div className="space-y-3">
                  {departmentUsage.map((dept, index) => (
                    <div key={dept.department} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{dept.department}</span>
                        <span className="text-white font-medium">${dept.cost.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full"
                          style={{ width: `${dept.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{dept.users} users</span>
                        <span>{dept.apiCalls.toLocaleString()} API calls</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">Department Efficiency</h4>
                <div className="space-y-4">
                  {departmentUsage.map((dept) => (
                    <div key={dept.department} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <div>
                        <h5 className="text-white font-medium">{dept.department}</h5>
                        <p className="text-gray-400 text-sm">${(dept.cost / dept.users).toFixed(0)} per user</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{(dept.apiCalls / dept.users).toFixed(0)}</div>
                        <div className="text-gray-400 text-xs">calls/user</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-1">Engineering</div>
                <div className="text-sm text-gray-400">Most Efficient</div>
                <div className="text-xs text-green-400 mt-1">1,260 calls/user avg</div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 mb-1">Product</div>
                <div className="text-sm text-gray-400">Highest Volume</div>
                <div className="text-xs text-yellow-400 mt-1">1,285 calls/user avg</div>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-1">Marketing</div>
                <div className="text-sm text-gray-400">Growth Potential</div>
                <div className="text-xs text-blue-400 mt-1">1,116 calls/user avg</div>
              </div>
            </div>

            <div className="p-6 bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Department Budget Allocation</h4>
                <button className="text-yellow-400 hover:text-yellow-300 text-sm">
                  Adjust Budgets
                </button>
              </div>
              <div className="space-y-4">
                {departmentUsage.map((dept) => (
                  <div key={dept.department} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-white font-medium">{dept.department}</span>
                      <span className="text-gray-400 text-sm">({dept.users} users)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-white">${dept.cost.toLocaleString()}</div>
                        <div className="text-gray-400 text-xs">{dept.percentage}% of total</div>
                      </div>
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'invoices':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">Invoice History</h4>
              <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </button>
            </div>

            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-6 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-6">
                    <FileText className="w-8 h-8 text-yellow-400" />
                    <div>
                      <h4 className="text-white font-medium text-lg">{invoice.id}</h4>
                      <p className="text-gray-400">{invoice.description}</p>
                      <p className="text-gray-500 text-sm">{invoice.plan}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">${invoice.amount.toLocaleString()}</div>
                      <div className="text-gray-400">{invoice.date}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-900 text-green-400 text-sm rounded-full">
                        Paid
                      </span>
                      <button className="p-2 text-gray-400 hover:text-white">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">Payment Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Paid (2024):</span>
                    <span className="text-white font-medium">$127,540</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Monthly:</span>
                    <span className="text-white">$10,628</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Payment:</span>
                    <span className="text-yellow-400">Dec 1, 2025</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-700">
                    <span className="text-white">Annual Contract:</span>
                    <span className="text-yellow-400">$129,000</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">Payment Method</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <CreditCard className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Corporate Visa</p>
                      <p className="text-gray-400 text-sm">•••• •••• •••• 8742</p>
                      <p className="text-gray-500 text-xs">Expires 08/27</p>
                    </div>
                    <button className="ml-auto text-yellow-400 hover:text-yellow-300 text-sm">
                      Update
                    </button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <Building className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-white font-medium">ACH Transfer</p>
                      <p className="text-gray-400 text-sm">Bank ending in 3456</p>
                      <p className="text-gray-500 text-xs">Primary payment method</p>
                    </div>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contracts':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl">
              <div className="flex items-start gap-4">
                <Crown className="w-8 h-8 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Enterprise Contract Active</h3>
                  <p className="text-gray-300 mb-4">
                    Your organization is covered under our Premium Enterprise SLA with dedicated support and guaranteed uptime.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">99.9% SLA Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">24/7 Priority Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Dedicated Account Manager</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">Contract Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract ID:</span>
                    <span className="text-white font-mono">ENT-2024-001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Start Date:</span>
                    <span className="text-white">December 1, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">End Date:</span>
                    <span className="text-white">November 30, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Auto-Renewal:</span>
                    <span className="text-green-400">Enabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract Value:</span>
                    <span className="text-yellow-400 font-medium">$129,000/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Terms:</span>
                    <span className="text-white">Annual, Net 30</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">SLA Performance</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime This Month:</span>
                      <span className="text-green-400 font-medium">99.98%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="w-full bg-green-500 rounded-full h-2"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response Time:</span>
                      <span className="text-green-400 font-medium">&lt; 15 minutes</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="w-5/6 bg-green-500 rounded-full h-2"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resolution Time:</span>
                      <span className="text-green-400 font-medium">&lt; 2 hours avg</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="w-4/5 bg-green-500 rounded-full h-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">Dedicated Support Team</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">AM</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-medium">Alex Morrison</h5>
                      <p className="text-gray-400 text-sm">Account Manager</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-400 hover:text-green-300">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">JC</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-medium">Jordan Chen</h5>
                      <p className="text-gray-400 text-sm">Technical Lead</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-purple-400 hover:text-purple-300">
                        <Zap className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="text-white font-medium mb-4">Recent Support Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Custom API endpoint deployed</p>
                      <p className="text-gray-400 text-xs">2 hours ago - Resolved</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Monthly business review scheduled</p>
                      <p className="text-gray-400 text-xs">1 day ago - Scheduled</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Integration optimization completed</p>
                      <p className="text-gray-400 text-xs">3 days ago - Resolved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Contract Actions</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                  <Download className="w-4 h-4 text-blue-400" />
                  <span className="text-white">Download Contract</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                  <FileText className="w-4 h-4 text-green-400" />
                  <span className="text-white">View Amendment</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg hover:border-yellow-400/50 transition-all">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400">Renewal Options</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <DashboardHeader userPlan={userPlan} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Enterprise Billing</h1>
          <p className="text-gray-400">Complete financial oversight and contract management for your organization</p>
        </div>

        {/* Enterprise Plan Status */}
        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Crown className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Enterprise Plan Active</h3>
              <p className="text-gray-300 mb-4">
                Premium enterprise service with unlimited everything, dedicated support team, and custom SLA. 
                Your contract runs through November 30, 2025 with automatic renewal enabled.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">Contract: $129K/year</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">SLA: 99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">Support: 24/7 Priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Billing Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setBillingTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Billing Content */}
          <div className="lg:col-span-3">
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || BarChart3, { className: "w-5 h-5 mr-2 text-yellow-400" })}
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/#login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};