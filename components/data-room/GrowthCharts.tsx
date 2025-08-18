import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
// import { motion } from 'framer-motion';
import growthData from '../../data/growth.json';

export function GrowthCharts() {
  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Revenue' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Proven Growth Metrics
        </h2>
        <p className="text-lg text-gray-600">
          Our platform delivers measurable results month over month
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Monthly Recurring Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">Annual Growth</span>
            <span className="text-green-600 font-semibold">+499% YoY</span>
          </div>
        </div>

        {/* Clients Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Client Acquisition
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="clients"
                name="New Clients"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">Client Growth</span>
            <span className="text-green-600 font-semibold">+513% in 12 months</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">427%</div>
          <div className="text-sm text-gray-600 mt-1">ROI Average</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">92</div>
          <div className="text-sm text-gray-600 mt-1">Active Clients</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">4.8</div>
          <div className="text-sm text-gray-600 mt-1">Customer Rating</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">18h</div>
          <div className="text-sm text-gray-600 mt-1">Avg. Response Time</div>
        </div>
      </div>
    </section>
  );
}