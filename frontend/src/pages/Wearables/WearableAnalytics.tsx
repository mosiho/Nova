import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, AdjustmentsIcon } from '@heroicons/react/outline';
import { Line, Bar } from 'react-chartjs-2';
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
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WearableAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('heart_rate');
  const [timeRange, setTimeRange] = useState('week');
  const [data, setData] = useState<any>(null);
  const [correlationData, setCorrelationData] = useState<any>(null);

  useEffect(() => {
    // In a real app, this would fetch from your API
    const fetchData = async () => {
      try {
        // Mock API call
        setTimeout(() => {
          if (selectedMetric === 'heart_rate') {
            setData({
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  label: 'Average Heart Rate (bpm)',
                  data: [68, 72, 70, 73, 69, 65, 67],
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  tension: 0.3
                },
                {
                  label: 'Resting Heart Rate (bpm)',
                  data: [62, 64, 63, 65, 61, 60, 61],
                  borderColor: 'rgb(54, 162, 235)',
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  tension: 0.3
                }
              ]
            });
          } else if (selectedMetric === 'sleep') {
            setData({
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  label: 'Sleep Duration (hours)',
                  data: [7.2, 6.8, 7.5, 8.1, 6.5, 7.8, 8.2],
                  borderColor: 'rgb(153, 102, 255)',
                  backgroundColor: 'rgba(153, 102, 255, 0.5)',
                  tension: 0.3
                },
                {
                  label: 'Deep Sleep (hours)',
                  data: [1.8, 1.5, 2.1, 2.3, 1.4, 2.0, 2.2],
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(75, 192, 192, 0.5)',
                  tension: 0.3
                }
              ]
            });
          } else if (selectedMetric === 'steps') {
            setData({
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  label: 'Steps',
                  data: [8245, 9102, 7563, 10254, 8321, 12087, 6532],
                  backgroundColor: 'rgba(75, 192, 192, 0.5)',
                  borderColor: 'rgb(75, 192, 192)',
                  borderWidth: 1
                }
              ]
            });
          }

          // Mock correlation data
          setCorrelationData({
            labels: ['Sleep Duration', 'Steps', 'Heart Rate', 'Stress Level', 'Vitamin D Level'],
            datasets: [
              {
                label: 'Correlation with Energy Level',
                data: [0.78, 0.65, -0.32, -0.85, 0.72],
                backgroundColor: [
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                  'rgb(75, 192, 192)',
                  'rgb(75, 192, 192)',
                  'rgb(255, 99, 132)',
                  'rgb(255, 99, 132)',
                  'rgb(75, 192, 192)'
                ],
                borderWidth: 1
              }
            ]
          });

          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMetric, timeRange]);

  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: false,
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  const correlationOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            return `Correlation: ${value.toFixed(2)} (${value > 0 ? 'Positive' : 'Negative'})`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        min: -1,
        ticks: {
          callback: function(value: any) {
            if (value === 1) return 'Strong Positive';
            if (value === 0.5) return 'Moderate Positive';
            if (value === 0) return 'No Correlation';
            if (value === -0.5) return 'Moderate Negative';
            if (value === -1) return 'Strong Negative';
            return '';
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/wearables" className="mr-4">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Advanced Health Analytics</h1>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <AdjustmentsIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <div>
              <label htmlFor="metric" className="sr-only">Metric</label>
              <select
                id="metric"
                name="metric"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="heart_rate">Heart Rate</option>
                <option value="sleep">Sleep</option>
                <option value="steps">Steps</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeRange" className="sr-only">Time Range</label>
              <select
                id="timeRange"
                name="timeRange"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">Last 12 Months</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Chart */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {selectedMetric === 'heart_rate' ? 'Heart Rate Trends' : 
           selectedMetric === 'sleep' ? 'Sleep Patterns' : 'Daily Step Count'}
        </h2>
        <div className="h-80">
          {selectedMetric === 'steps' ? (
            <Bar data={data} options={barOptions} />
          ) : (
            <Line data={data} options={lineOptions} />
          )}
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Average</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {selectedMetric === 'heart_rate' ? '69 bpm' : 
             selectedMetric === 'sleep' ? '7.4 hrs' : '8,872'}
          </p>
          <p className="mt-2 text-sm text-green-600">
            {selectedMetric === 'heart_rate' ? '3% lower than usual' : 
             selectedMetric === 'sleep' ? '8% better than usual' : '12% more than usual'}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Peak</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {selectedMetric === 'heart_rate' ? '128 bpm' : 
             selectedMetric === 'sleep' ? '8.2 hrs' : '12,087'}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {selectedMetric === 'heart_rate' ? 'During exercise' : 
             selectedMetric === 'sleep' ? 'On weekend' : 'On Saturday'}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Trend</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {selectedMetric === 'heart_rate' ? 'Stable' : 
             selectedMetric === 'sleep' ? 'Improving' : 'Varying'}
          </p>
          <p className="mt-2 text-sm text-blue-600">
            {selectedMetric === 'heart_rate' ? 'Within healthy range' : 
             selectedMetric === 'sleep' ? 'Better consistency' : 'More active on weekends'}
          </p>
        </div>
      </div>
      
      {/* Correlation Analysis */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Health Correlation Analysis</h2>
        <p className="text-sm text-gray-500 mb-4">
          This analysis shows how different health metrics correlate with your reported energy levels.
        </p>
        <div className="h-80">
          <Bar data={correlationData} options={correlationOptions} />
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800">Insight</h3>
          <p className="mt-1 text-sm text-blue-700">
            {selectedMetric === 'heart_rate' 
              ? 'Your energy levels are most positively correlated with sleep duration and most negatively with stress levels. Consider stress reduction techniques to improve energy levels.'
              : selectedMetric === 'sleep'
              ? 'Sleep quality shows the strongest positive correlation with your energy levels. Prioritize consistent sleep schedules to optimize your energy throughout the day.'
              : 'Physical activity consistently correlates with better energy levels and mood. Your data suggests a sweet spot of 8,000-10,000 steps for optimal energy the following day.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WearableAnalytics; 