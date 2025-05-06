import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BeakerIcon, PlusIcon } from '@heroicons/react/outline';
// Import mock data
import { mockApiResponses } from '../../services/mockData';

interface LabTest {
  _id: string;
  name: string;
  provider: string;
  date: string;
  type: string;
  status: string;
  results: Array<{
    name: string;
    value: number;
    unit: string;
    isAbnormal?: boolean;
  }>;
}

const LabTests: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [labTests, setLabTests] = useState<LabTest[]>([]);

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        // Comment out actual API call
        // const response = await axios.get('/api/lab-tests');
        // setLabTests(response.data.data);
        
        // Use mock data instead
        setTimeout(() => {
          setLabTests(mockApiResponses.getLabTests.data);
          setLoading(false);
        }, 500); // Add a small delay to simulate network request
      } catch (error) {
        console.error('Error fetching lab tests:', error);
        setLoading(false);
      }
    };

    fetchLabTests();
  }, []);

  const getAbnormalCount = (test: LabTest) => {
    return test.results.filter(result => result.isAbnormal).length;
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
        <h1 className="text-2xl font-semibold text-gray-900">Lab Tests</h1>
        <Link 
          to="/lab-tests/upload"
          className="btn btn-primary"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Upload Lab Test
        </Link>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {labTests.length > 0 ? (
            labTests.map((test) => (
              <li key={test._id}>
                <Link to={`/lab-tests/${test._id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-md p-2 mr-4">
                          <BeakerIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600 truncate">{test.name}</p>
                          <p className="text-sm text-gray-500">
                            {test.provider} • {new Date(test.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        {getAbnormalCount(test) > 0 ? (
                          <span className="badge badge-red">
                            {getAbnormalCount(test)} abnormal
                          </span>
                        ) : (
                          <span className="badge badge-green">Normal</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-gray-500">
              No lab tests found. Upload your first lab test to get started.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LabTests; 