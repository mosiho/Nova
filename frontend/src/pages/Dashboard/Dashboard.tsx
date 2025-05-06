import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BeakerIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  ClockIcon, 
  CubeIcon, 
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SparklesIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  ChatAlt2Icon
} from '@heroicons/react/outline';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  iconColor: string;
  to: string;
}

interface TestResult {
  id: string;
  name: string;
  date: string;
  provider: string;
  abnormalCount: number;
}

interface TestFactor {
  id: string;
  name: string;
  value: number;
  unit: string;
  range: {
    min: number;
    max: number;
  };
  history: {
    date: string;
    value: number;
  }[];
}

interface Recommendation {
  id: string;
  name: string;
  reason: string;
  priority: string;
  type: 'supplement' | 'lifestyle' | 'diet' | 'exercise';
  description: string;
  aiGenerated: boolean;
}

interface WearableStats {
  avgHeartRate: number;
  avgSleep: number;
  avgSteps: number;
}

interface HealthScore {
  current: number;
  previous: number;
  change: number;
  history: {
    date: string;
    score: number;
  }[];
  factorContributions: {
    name: string;
    score: number;
    maxScore: number;
  }[];
}

interface ComparisonData {
  enabled: boolean;
  factorPercentiles: {
    factorId: string;
    percentile: number;
  }[];
}

interface DashboardData {
  testCount: number;
  nextTestDate: string;
  recentTestResults: TestResult[];
  recommendations: Recommendation[];
  wearableStats: WearableStats;
  healthScore: HealthScore;
  testFactors: TestFactor[];
  comparison: ComparisonData;
}

const StatCard: React.FC<CardProps> = ({ title, value, change, icon, iconColor, to }) => (
  <Link 
    to={to}
    className="bg-white overflow-hidden shadow rounded-lg transition-transform hover:transform hover:scale-105"
  >
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${iconColor} rounded-md p-3`}>
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    {change !== undefined && (
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <div className="flex items-center">
            {change > 0 ? (
              <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
            ) : change < 0 ? (
              <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
            ) : null}
            <span
              className={change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-500'}
            >
              {Math.abs(change)}% {change > 0 ? 'increase' : change < 0 ? 'decrease' : 'no change'} from last month
            </span>
          </div>
        </div>
      </div>
    )}
  </Link>
);

const HealthScoreCard: React.FC<{ score: HealthScore, onClick: () => void }> = ({ score, onClick }) => {
  // Calculate color based on score
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Chart data for the mini sparkline
  const sparklineData = {
    labels: score.history.map(h => new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        data: score.history.map(h => h.score),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 2,
      }
    ]
  };
  
  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { 
        display: false,
        min: 0,
        max: 100
      }
    },
    elements: {
      line: { tension: 0.4 }
    }
  };
  
  return (
    <div
      onClick={onClick}
      className="bg-white overflow-hidden shadow rounded-lg cursor-pointer transition hover:shadow-lg"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Health Score</h3>
            <div className="flex items-baseline mt-2">
              <p className={`text-4xl font-bold ${getScoreColor(score.current)}`}>
                {score.current}
              </p>
              <p className="ml-2 text-sm text-gray-500">/ 100</p>
            </div>
            <div className="flex items-center mt-2">
              {score.change > 0 ? (
                <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
              ) : score.change < 0 ? (
                <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
              ) : (
                <span className="w-4 h-4 mr-1" />
              )}
              <span
                className={
                  score.change > 0 
                    ? 'text-green-500 text-sm' 
                    : score.change < 0 
                      ? 'text-red-500 text-sm' 
                      : 'text-gray-500 text-sm'
                }
              >
                {score.change > 0 ? '+' : ''}{score.change} pts
              </span>
              <span className="text-gray-500 text-sm ml-1">from last period</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheckIcon className="h-10 w-10 text-blue-500" />
            <div className="text-xs text-gray-500 mt-1">Tap for details</div>
          </div>
        </div>
        <div className="h-12 mt-3">
          <Line data={sparklineData} options={sparklineOptions} />
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    testCount: 0,
    nextTestDate: new Date().toISOString(),
    recentTestResults: [],
    recommendations: [],
    wearableStats: {
      avgHeartRate: 0,
      avgSleep: 0,
      avgSteps: 0
    },
    healthScore: {
      current: 0,
      previous: 0,
      change: 0,
      history: [],
      factorContributions: []
    },
    testFactors: [],
    comparison: {
      enabled: false,
      factorPercentiles: []
    }
  });
  
  // Fetch dashboard data
  useEffect(() => {
    // This would normally fetch data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      const today = new Date();
      const pastDates = Array.from({length: 7}, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - (6-i));
        return date.toISOString().split('T')[0];
      });
      
      setDashboardData({
        testCount: 12,
        nextTestDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        recentTestResults: [
          { id: '1', name: 'Complete Blood Count', date: '2023-05-15', provider: 'LabCorp', abnormalCount: 2 },
          { id: '2', name: 'Lipid Panel', date: '2023-04-10', provider: 'Quest', abnormalCount: 1 },
          { id: '3', name: 'Thyroid Panel', date: '2023-03-22', provider: 'LabCorp', abnormalCount: 0 }
        ],
        recommendations: [
          { 
            id: '1', 
            name: 'Vitamin D', 
            reason: 'Low vitamin D levels', 
            priority: 'High',
            type: 'supplement',
            description: 'Take 2000 IU daily with food for optimal absorption',
            aiGenerated: true
          },
          { 
            id: '2', 
            name: 'Omega-3', 
            reason: 'Improve cholesterol levels', 
            priority: 'Medium',
            type: 'supplement',
            description: '1000mg of high-quality fish oil or algae-based omega-3 daily',
            aiGenerated: false
          },
          { 
            id: '3', 
            name: 'Morning Walks', 
            reason: 'Boost cardiovascular health', 
            priority: 'Medium',
            type: 'exercise',
            description: '20-minute brisk walk each morning to improve heart health',
            aiGenerated: true
          },
          { 
            id: '4', 
            name: 'Reduce Processed Foods', 
            reason: 'Lower inflammation markers', 
            priority: 'Medium',
            type: 'diet',
            description: 'Limit processed foods and increase whole food consumption',
            aiGenerated: true
          },
          { 
            id: '5', 
            name: 'Meditation', 
            reason: 'Reduce cortisol levels', 
            priority: 'Low',
            type: 'lifestyle',
            description: '10 minutes of daily meditation to manage stress',
            aiGenerated: false
          }
        ],
        wearableStats: {
          avgHeartRate: 68,
          avgSleep: 7.2,
          avgSteps: 8500
        },
        healthScore: {
          current: 83,
          previous: 79,
          change: 4,
          history: [
            { date: pastDates[0], score: 79 },
            { date: pastDates[1], score: 78 },
            { date: pastDates[2], score: 80 },
            { date: pastDates[3], score: 81 },
            { date: pastDates[4], score: 82 },
            { date: pastDates[5], score: 82 },
            { date: pastDates[6], score: 83 }
          ],
          factorContributions: [
            { name: 'Cardiovascular', score: 85, maxScore: 100 },
            { name: 'Metabolism', score: 75, maxScore: 100 },
            { name: 'Immune Function', score: 90, maxScore: 100 },
            { name: 'Stress', score: 70, maxScore: 100 },
            { name: 'Sleep', score: 88, maxScore: 100 }
          ]
        },
        testFactors: [
          {
            id: 'cholesterol',
            name: 'Total Cholesterol',
            value: 185,
            unit: 'mg/dL',
            range: { min: 125, max: 200 },
            history: [
              { date: '2023-01-15', value: 195 },
              { date: '2023-02-15', value: 190 },
              { date: '2023-03-15', value: 188 },
              { date: '2023-04-15', value: 186 },
              { date: '2023-05-15', value: 185 }
            ]
          },
          {
            id: 'hdl',
            name: 'HDL Cholesterol',
            value: 62,
            unit: 'mg/dL',
            range: { min: 40, max: 100 },
            history: [
              { date: '2023-01-15', value: 58 },
              { date: '2023-02-15', value: 60 },
              { date: '2023-03-15', value: 61 },
              { date: '2023-04-15', value: 60 },
              { date: '2023-05-15', value: 62 }
            ]
          },
          {
            id: 'ldl',
            name: 'LDL Cholesterol',
            value: 105,
            unit: 'mg/dL',
            range: { min: 0, max: 100 },
            history: [
              { date: '2023-01-15', value: 120 },
              { date: '2023-02-15', value: 115 },
              { date: '2023-03-15', value: 112 },
              { date: '2023-04-15', value: 108 },
              { date: '2023-05-15', value: 105 }
            ]
          },
          {
            id: 'glucose',
            name: 'Fasting Glucose',
            value: 88,
            unit: 'mg/dL',
            range: { min: 70, max: 100 },
            history: [
              { date: '2023-01-15', value: 92 },
              { date: '2023-02-15', value: 90 },
              { date: '2023-03-15', value: 89 },
              { date: '2023-04-15', value: 90 },
              { date: '2023-05-15', value: 88 }
            ]
          },
          {
            id: 'vitaminD',
            name: 'Vitamin D',
            value: 38,
            unit: 'ng/mL',
            range: { min: 30, max: 100 },
            history: [
              { date: '2023-01-15', value: 28 },
              { date: '2023-02-15', value: 30 },
              { date: '2023-03-15', value: 32 },
              { date: '2023-04-15', value: 35 },
              { date: '2023-05-15', value: 38 }
            ]
          }
        ],
        comparison: {
          enabled: false,
          factorPercentiles: [
            { factorId: 'cholesterol', percentile: 65 },
            { factorId: 'hdl', percentile: 75 },
            { factorId: 'ldl', percentile: 40 },
            { factorId: 'glucose', percentile: 60 },
            { factorId: 'vitaminD', percentile: 45 }
          ]
        }
      });
      setLoading(false);
    }, 1000);
  }, []);
  
  // Mock chart data for heart rate over time
  const heartRateData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: [65, 68, 70, 72, 67, 63, 64],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  
  // Mock chart data for sleep over time
  const sleepData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Sleep (hours)',
        data: [7.5, 6.8, 7.2, 8.0, 6.5, 7.8, 8.2],
        fill: false,
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1
      }
    ]
  };
  
  // Health score donut chart data
  const healthScoreChartData = {
    labels: dashboardData.healthScore.factorContributions.map(f => f.name),
    datasets: [
      {
        data: dashboardData.healthScore.factorContributions.map(f => f.score),
        backgroundColor: [
          'rgba(66, 153, 225, 0.8)',  // Blue
          'rgba(72, 187, 120, 0.8)',  // Green
          'rgba(246, 173, 85, 0.8)',  // Orange
          'rgba(159, 122, 234, 0.8)', // Purple
          'rgba(237, 100, 166, 0.8)'  // Pink
        ],
        borderWidth: 1
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  // Function to create factor trend chart
  const getFactorChartData = (factor: TestFactor) => {
    const dates = factor.history.map(h => new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    const values = factor.history.map(h => h.value);
    
    const lowerRange = Array(dates.length).fill(factor.range.min);
    const upperRange = Array(dates.length).fill(factor.range.max);
    
    return {
      labels: dates,
      datasets: [
        {
          label: `${factor.name} (${factor.unit})`,
          data: values,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: 'rgb(59, 130, 246)'
        },
        {
          label: 'Lower Range',
          data: lowerRange,
          borderColor: 'rgba(209, 213, 219, 0.5)',
          borderDash: [5, 5],
          borderWidth: 1,
          tension: 0,
          pointRadius: 0,
          fill: false
        },
        {
          label: 'Upper Range',
          data: upperRange,
          borderColor: 'rgba(209, 213, 219, 0.5)',
          borderDash: [5, 5],
          borderWidth: 1,
          tension: 0,
          pointRadius: 0,
          fill: false
        }
      ]
    };
  };
  
  // Function to handle opening the factor detail modal
  const handleFactorClick = (factorId: string) => {
    setSelectedFactor(factorId);
    setShowDetailModal(true);
  };
  
  // Function to render the factor detail modal
  const renderFactorDetailModal = () => {
    if (!selectedFactor || !showDetailModal) return null;
    
    const factor = dashboardData.testFactors.find(f => f.id === selectedFactor);
    if (!factor) return null;
    
    // Get percentile data if comparison is enabled
    const percentileData = dashboardData.comparison.enabled ? 
      dashboardData.comparison.factorPercentiles.find(p => p.factorId === selectedFactor)?.percentile : null;
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-900">{factor.name}</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowDetailModal(false)}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-500">Current Value</span>
                  <div className="text-xl font-bold text-blue-600">
                    {factor.value} <span className="text-sm font-normal">{factor.unit}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-500">Normal Range</span>
                  <div className="text-lg font-medium text-gray-700">
                    {factor.range.min} - {factor.range.max} <span className="text-sm font-normal">{factor.unit}</span>
                  </div>
                </div>
                
                {percentileData !== null && (
                  <div className="bg-purple-50 px-4 py-2 rounded-lg">
                    <span className="text-sm text-gray-500">Percentile</span>
                    <div className="text-lg font-medium text-purple-700">
                      {percentileData}th
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Trend Over Time</h4>
                <div className="h-80">
                  <Line 
                    data={getFactorChartData(factor)} 
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        legend: {
                          display: true,
                          position: 'top' as const
                        }
                      }
                    }} 
                  />
                </div>
              </div>
              
              {percentileData !== null && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">How You Compare</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                            Your Percentile
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {percentileData}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div 
                          style={{ width: `${percentileData}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {percentileData && percentileData < 25 && 'Your value is lower than most people in your demographic.'}
                        {percentileData && percentileData >= 25 && percentileData < 50 && 'Your value is somewhat lower than average for your demographic.'}
                        {percentileData && percentileData >= 50 && percentileData < 75 && 'Your value is better than average for your demographic.'}
                        {percentileData && percentileData >= 75 && 'Your value is excellent compared to others in your demographic.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Recommendations</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-3">
                    {dashboardData.recommendations
                      .filter(r => r.reason.toLowerCase().includes(factor.name.toLowerCase()))
                      .map(r => (
                        <li key={r.id} className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            {r.aiGenerated ? (
                              <SparklesIcon className="h-5 w-5 text-purple-500" />
                            ) : (
                              <BeakerIcon className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{r.name}</p>
                            <p className="text-sm text-gray-500">{r.description}</p>
                          </div>
                        </li>
                      ))}
                    {dashboardData.recommendations.filter(r => 
                      r.reason.toLowerCase().includes(factor.name.toLowerCase())).length === 0 && (
                      <p className="text-gray-500 text-sm italic">No specific recommendations for this factor.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
      {renderFactorDetailModal()}
      
      {/* Page header with responsive layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link 
            to="/chat-assistant"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none w-full sm:w-auto"
          >
            <ChatAlt2Icon className="h-5 w-5 mr-2" />
            Ask AI Assistant
          </Link>
          <Link 
            to="/lab-tests/upload"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none w-full sm:w-auto"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Upload Lab Test
          </Link>
        </div>
      </div>
      
      {/* Health Score Card */}
      <HealthScoreCard 
        score={dashboardData.healthScore} 
        onClick={() => setShowDetailModal(true)}
      />
      
      {/* Summary Cards - Responsive grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          title="Total Lab Tests"
          value={dashboardData.testCount}
          change={8}
          icon={<BeakerIcon className="h-6 w-6 text-white" />}
          iconColor="bg-blue-500"
          to="/lab-tests"
        />
        <StatCard
          title="Next Test Due"
          value={new Date(dashboardData.nextTestDate).toLocaleDateString()}
          icon={<CalendarIcon className="h-6 w-6 text-white" />}
          iconColor="bg-green-500"
          to="/lab-tests/schedule"
        />
        <StatCard
          title="AI Insights"
          value="3 New"
          change={50}
          icon={<SparklesIcon className="h-6 w-6 text-white" />}
          iconColor="bg-purple-500"
          to="/recommendations"
        />
      </div>
      
      {/* Health Score Breakdown */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Health Score Breakdown</h3>
          <p className="mt-1 text-sm text-gray-500">
            See how different factors contribute to your overall health
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2 lg:col-span-1">
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center h-full">
                <h4 className="text-base font-medium text-gray-700 mb-4">Overall Score Components</h4>
                <div className="w-64 h-64 mx-auto">
                  <Doughnut 
                    data={healthScoreChartData} 
                    options={{
                      responsive: true,
                      cutout: '70%',
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            usePointStyle: true,
                            padding: 20
                          }
                        }
                      }
                    }}
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Your score is calculated based on these key health categories
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-4 rounded-lg h-full">
                <h4 className="text-base font-medium text-gray-700 mb-4">Score History</h4>
                <div className="h-64">
                  <Line 
                    data={{
                      labels: dashboardData.healthScore.history.map(h => 
                        new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      ),
                      datasets: [
                        {
                          label: 'Health Score',
                          data: dashboardData.healthScore.history.map(h => h.score),
                          borderColor: 'rgb(59, 130, 246)',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          fill: true,
                          tension: 0.4
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      scales: {
                        y: {
                          min: 0,
                          max: 100,
                          title: {
                            display: true,
                            text: 'Score (0-100)'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Lab Test Factors */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Key Health Factors</h3>
            <p className="mt-1 text-sm text-gray-500">
              Your most important lab test results
            </p>
          </div>
          {!dashboardData.comparison.enabled && (
            <div className="flex items-center">
              <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">Unlock comparisons with Premium</span>
            </div>
          )}
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardData.testFactors.map(factor => {
              // Determine if value is in range
              const isInRange = factor.value >= factor.range.min && factor.value <= factor.range.max;
              // Calculate how far into the range (as percentage)
              const rangeWidth = factor.range.max - factor.range.min;
              const valuePosition = Math.min(100, Math.max(0, 
                ((factor.value - factor.range.min) / rangeWidth) * 100
              ));
              
              // Get percentile if available
              const percentile = dashboardData.comparison.enabled
                ? dashboardData.comparison.factorPercentiles.find(p => p.factorId === factor.id)?.percentile
                : null;
              
              return (
                <div 
                  key={factor.id}
                  onClick={() => handleFactorClick(factor.id)}
                  className="bg-white border rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-900">{factor.name}</h4>
                      {percentile !== null && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {percentile}th percentile
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-2xl font-semibold text-gray-900">
                        {factor.value}
                      </span>
                      <span className="text-sm text-gray-500">
                        {factor.unit}
                      </span>
                    </div>
                    
                    {/* Range visualization */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{factor.range.min} {factor.unit}</span>
                        <span>{factor.range.max} {factor.unit}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${isInRange ? 'bg-green-500' : 'bg-red-500'}`} 
                          style={{ width: `${valuePosition}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-center">
                        <span className={isInRange ? 'text-green-600' : 'text-red-600'}>
                          {isInRange ? 'Within normal range' : 'Outside normal range'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Trend line - mini chart */}
                    <div className="h-16 mt-3">
                      <Line 
                        data={{
                          labels: factor.history.map(h => 
                            new Date(h.date).toLocaleDateString('en-US', { month: 'short' })
                          ),
                          datasets: [{
                            data: factor.history.map(h => h.value),
                            borderColor: 'rgb(59, 130, 246)',
                            tension: 0.4,
                            borderWidth: 2,
                            pointRadius: 0
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false }
                          },
                          scales: {
                            x: { display: false },
                            y: { display: false }
                          }
                        }}
                      />
                    </div>
                    
                    <div className="mt-2 text-center">
                      <button 
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Enhanced Recommendations */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Personalized Recommendations</h3>
          <Link to="/recommendations" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>
        <div className="px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardData.recommendations.map((recommendation) => (
              <div 
                key={recommendation.id} 
                className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`px-4 py-3 border-b ${
                  recommendation.type === 'supplement' ? 'bg-blue-50' :
                  recommendation.type === 'diet' ? 'bg-green-50' :
                  recommendation.type === 'exercise' ? 'bg-orange-50' :
                  'bg-purple-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-medium ${
                      recommendation.type === 'supplement' ? 'text-blue-800' :
                      recommendation.type === 'diet' ? 'text-green-800' :
                      recommendation.type === 'exercise' ? 'text-orange-800' :
                      'text-purple-800'
                    }`}>
                      {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}
                    </span>
                    {recommendation.aiGenerated && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        <SparklesIcon className="h-3 w-3 mr-1" />
                        AI Generated
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-900">{recommendation.name}</h4>
                  <p className="mt-1 text-xs text-gray-500">{recommendation.reason}</p>
                  <p className="mt-2 text-sm text-gray-700">{recommendation.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      recommendation.priority === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : recommendation.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {recommendation.priority} Priority
                    </span>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Wearable charts */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Wearable Health Data</h3>
          <p className="mt-1 text-sm text-gray-500">
            Weekly trends from your connected devices
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="h-80 md:h-72 flex flex-col">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Heart Rate (avg: {dashboardData.wearableStats.avgHeartRate} bpm)</h4>
              <div className="flex-1 w-full">
                <Line 
                  data={heartRateData} 
                  options={{
                    ...chartOptions,
                    elements: {
                      line: {
                        tension: 0.4
                      },
                      point: {
                        radius: 4,
                        hoverRadius: 6
                      }
                    },
                    plugins: {
                      ...chartOptions.plugins
                    }
                  }} 
                />
              </div>
            </div>
            <div className="h-80 md:h-72 flex flex-col">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Sleep Duration (avg: {dashboardData.wearableStats.avgSleep} hrs)</h4>
              <div className="flex-1 w-full">
                <Line 
                  data={sleepData} 
                  options={{
                    ...chartOptions,
                    elements: {
                      line: {
                        tension: 0.4
                      },
                      point: {
                        radius: 4,
                        hoverRadius: 6
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Last synced: Today, 8:42 AM
            </span>
            <Link 
              to="/wearables" 
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View detailed stats
              <svg className="ml-1 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 