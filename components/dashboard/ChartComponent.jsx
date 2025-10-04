// components/dashboard/ChartComponent.jsx
import React, { useMemo } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ChartComponent({ type, data, options = {} }) {
  const chartData = useMemo(() => {
    switch (type) {
      case 'line':
        return {
          labels: data.labels,
          datasets: data.datasets.map(dataset => ({
            ...dataset,
            borderColor: dataset.color || '#3B82F6',
            backgroundColor: dataset.color ? `${dataset.color}20` : '#3B82F620',
            tension: 0.4,
            pointBackgroundColor: dataset.color || '#3B82F6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }))
        };
      
      case 'bar':
        return {
          labels: data.labels,
          datasets: data.datasets.map(dataset => ({
            ...dataset,
            backgroundColor: dataset.color || '#3B82F6',
            borderColor: dataset.color || '#3B82F6',
            borderWidth: 1,
            borderRadius: 4
          }))
        };
      
      case 'doughnut':
        return {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: data.colors || [
              '#3B82F6',
              '#10B981',
              '#F59E0B',
              '#EF4444',
              '#8B5CF6'
            ],
            borderWidth: 2,
            borderColor: '#000000',
            hoverBorderWidth: 3
          }]
        };
      
      default:
        return data;
    }
  }, [type, data]);

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9CA3AF',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: options.title || 'Chart',
        color: '#FFFFFF',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#FFFFFF',
        bodyColor: '#D1D5DB',
        borderColor: '#374151',
        borderWidth: 1
      }
    },
    scales: type !== 'doughnut' ? {
      y: {
        beginAtZero: true,
        grid: {
          color: '#374151'
        },
        ticks: {
          color: '#9CA3AF'
        }
      },
      x: {
        grid: {
          color: '#374151'
        },
        ticks: {
          color: '#9CA3AF'
        }
      }
    } : {}
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={chartData} options={{ ...defaultOptions, ...options }} />;
      case 'bar':
        return <Bar data={chartData} options={{ ...defaultOptions, ...options }} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={{ ...defaultOptions, ...options }} />;
      default:
        return <div className="text-gray-400">Unsupported chart type</div>;
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6">
      <div className="h-80">
        {renderChart()}
      </div>
    </div>
  );
}