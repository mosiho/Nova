import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  DeviceMobileIcon, 
  PlusCircleIcon,
  ArrowRightIcon,
  HeartIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/outline';
import { useAuth } from '../../contexts/AuthContext';

interface ConnectedDevice {
  id: string;
  type: string;
  name: string;
  lastSynced: string;
  connected: boolean;
}

interface WearableData {
  id: string;
  type: string;
  data: {
    avg: number;
    min?: number;
    max?: number;
  };
  date: string;
}

const Wearables: React.FC = () => {
  const { user } = useAuth();
  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>([]);
  const [wearableData, setWearableData] = useState<{
    heartRate: WearableData | null;
    sleep: WearableData | null;
    steps: WearableData | null;
  }>({
    heartRate: null,
    sleep: null,
    steps: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        setTimeout(() => {
          // Mock data
          setConnectedDevices([
            {
              id: '1',
              type: 'apple_watch',
              name: 'Apple Watch Series 7',
              lastSynced: new Date().toISOString(),
              connected: true
            }
          ]);
          
          setWearableData({
            heartRate: {
              id: '1',
              type: 'heart_rate',
              data: {
                avg: 68,
                min: 52,
                max: 120
              },
              date: new Date().toISOString()
            },
            sleep: {
              id: '2',
              type: 'sleep',
              data: {
                avg: 7.5 // hours
              },
              date: new Date().toISOString()
            },
            steps: {
              id: '3',
              type: 'steps',
              data: {
                avg: 8765
              },
              date: new Date().toISOString()
            }
          });
          
          setLoading(false);
        }, 1000);
      } catch (err: any) {
        console.error('Error fetching wearable data:', err);
        setError('Failed to fetch wearable data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const syncDevices = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update last synced time
      setConnectedDevices(devices => 
        devices.map(device => ({
          ...device,
          lastSynced: new Date().toISOString()
        }))
      );
      
      setLoading(false);
    } catch (err: any) {
      console.error('Error syncing devices:', err);
      setError('Failed to sync devices');
      setLoading(false);
    }
  };

  const getDeviceTypeName = (type: string): string => {
    const deviceTypes: Record<string, string> = {
      'apple_watch': 'Apple Watch',
      'fitbit': 'Fitbit',
      'garmin': 'Garmin',
      'oura': 'Oura Ring',
      'whoop': 'Whoop',
      'other': 'Other Device'
    };
    
    return deviceTypes[type] || type;
  };
  
  const formatLastSynced = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Wearable Devices</h1>
        <div className="flex space-x-3">
          {connectedDevices.length > 0 && (
            <button
              type="button"
              onClick={syncDevices}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Sync Devices
            </button>
          )}
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" />
            Connect New Device
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Connected Devices */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Connected Devices</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage your connected health devices
            </p>
          </div>
        </div>
        
        {connectedDevices.length > 0 ? (
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {connectedDevices.map((device) => (
                <li key={device.id} className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-lg p-3">
                        <DeviceMobileIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">{device.name}</h4>
                        <p className="text-sm text-gray-500">
                          {getDeviceTypeName(device.type)} • Last synced: {formatLastSynced(device.lastSynced)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        device.connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {device.connected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-12 border-t border-gray-200">
            <DeviceMobileIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No devices connected</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by connecting your wearable device.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" />
                Connect Device
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Health Metrics Overview */}
      {connectedDevices.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-medium text-gray-900">Health Metrics Overview</h2>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Heart Rate */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                    <HeartIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Heart Rate
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {wearableData.heartRate ? (
                            <span>{wearableData.heartRate.data.avg} <span className="text-sm text-gray-500">bpm</span></span>
                          ) : (
                            'No data'
                          )}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/wearables/analytics" className="font-medium text-blue-700 hover:text-blue-900 flex items-center">
                    View details
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Sleep */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                    <ClockIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Sleep Duration
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {wearableData.sleep ? (
                            <span>{wearableData.sleep.data.avg} <span className="text-sm text-gray-500">hours</span></span>
                          ) : (
                            'No data'
                          )}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/wearables/analytics" className="font-medium text-blue-700 hover:text-blue-900 flex items-center">
                    View details
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Steps */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <ChartBarIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Daily Steps
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {wearableData.steps ? (
                            <span>{wearableData.steps.data.avg.toLocaleString()}</span>
                          ) : (
                            'No data'
                          )}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/wearables/analytics" className="font-medium text-blue-700 hover:text-blue-900 flex items-center">
                    View details
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Advanced Analytics Promo */}
          {user?.subscriptionPlan !== 'premium' && (
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-blue-800">Unlock Advanced Analytics</h3>
                  <p className="mt-2 text-sm text-blue-700">
                    Get detailed insights into your health data, correlations between metrics, and personalized recommendations with our Premium plan.
                  </p>
                  <div className="mt-4">
                    <Link
                      to="/subscriptions"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Upgrade to Premium
                    </Link>
                  </div>
                </div>
                <div className="sm:ml-6 mt-4 sm:mt-0">
                  <img 
                    src="/analytics-preview.png" 
                    alt="Analytics Preview" 
                    className="max-h-32 rounded-md shadow-sm" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Wearables; 