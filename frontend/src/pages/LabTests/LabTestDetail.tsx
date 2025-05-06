import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftIcon, BeakerIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { CalendarIcon } from '@heroicons/react/solid';
// Import mock data
import { mockApiResponses } from '../../services/mockData';

interface LabTestResult {
  name: string;
  value: number;
  unit: string;
  referenceRangeLow?: number;
  referenceRangeHigh?: number;
  isAbnormal?: boolean;
}

interface LabTest {
  _id: string;
  userId?: string;
  type: string;
  name: string;
  provider: string;
  date: string;
  status: string;
  results: LabTestResult[];
  rawFileUrl?: string;
  nextTestDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

const LabTestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [labTest, setLabTest] = useState<LabTest | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLabTest = async () => {
      try {
        // Comment out actual API call
        // const response = await axios.get(`/api/lab-tests/${id}`);
        // setLabTest(response.data.data);
        
        // Use mock data instead
        setTimeout(() => {
          const mockResponse = mockApiResponses.getLabTestById(id || "");
          if (mockResponse.data) {
            setLabTest(mockResponse.data);
          } else {
            setError("Lab test not found");
          }
          setLoading(false);
        }, 500); // Add a small delay to simulate network request
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch lab test');
        setLoading(false);
      }
    };

    fetchLabTest();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <Link to="/lab-tests" className="btn btn-primary">
          Back to Lab Tests
        </Link>
      </div>
    );
  }

  if (!labTest) {
    return (
      <div className="text-center py-10">
        <div className="text-gray-500 text-xl mb-4">Lab test not found</div>
        <Link to="/lab-tests" className="btn btn-primary">
          Back to Lab Tests
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/lab-tests" className="mr-4">
            <ArrowLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">{labTest.name}</h1>
        </div>
        <div className="flex space-x-3">
          <Link to={`/lab-tests/${id}/edit`} className="btn btn-secondary">
            <PencilIcon className="h-5 w-5 mr-2" />
            Edit
          </Link>
          <button className="btn btn-danger">
            <TrashIcon className="h-5 w-5 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Lab Test Details</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {labTest.provider} • {new Date(labTest.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center">
              <BeakerIcon className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">{labTest.type}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Biomarker
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Your Value
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference Range
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {labTest.results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.value} {result.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.referenceRangeLow !== undefined && result.referenceRangeHigh !== undefined ? (
                        `${result.referenceRangeLow} - ${result.referenceRangeHigh} ${result.unit}`
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.isAbnormal ? (
                        <span className="badge badge-red">Abnormal</span>
                      ) : (
                        <span className="badge badge-green">Normal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {labTest.notes && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Notes</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <p className="text-sm text-gray-500">{labTest.notes}</p>
          </div>
        </div>
      )}

      {labTest.nextTestDate && (
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Next Test Due</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Your next recommended test is due on {new Date(labTest.nextTestDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabTestDetail; 