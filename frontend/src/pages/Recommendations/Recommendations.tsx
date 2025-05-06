import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CubeIcon, CheckIcon, XIcon } from '@heroicons/react/outline';
// Import mock data
import { mockApiResponses } from '../../services/mockData';

interface Recommendation {
  _id: string;
  supplementId: {
    _id: string;
    name: string;
    category: string;
    imageUrl?: string;
    price: number;
  };
  labTestId: {
    _id: string;
    name: string;
    date: string;
  };
  reason: string;
  priority: number;
  dosage?: string;
  isAccepted: boolean;
}

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Comment out actual API call
        // const response = await axios.get('/api/supplements/recommendations');
        // setRecommendations(response.data.data || []);
        
        // Use mock data instead
        setTimeout(() => {
          setRecommendations(mockApiResponses.getRecommendations.data);
          setLoading(false);
        }, 500); // Add a small delay to simulate network request
      } catch (err: any) {
        console.error('Error fetching recommendations:', err);
        setError(err.response?.data?.message || 'Failed to load recommendations');
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleAcceptRecommendation = async (id: string) => {
    setActionInProgress(id);
    try {
      // In a real app this would be a real API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setRecommendations(prevRecs => 
        prevRecs.map(rec => 
          rec._id === id ? { ...rec, isAccepted: true } : rec
        )
      );
    } catch (err) {
      console.error('Error accepting recommendation:', err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleRejectRecommendation = async (id: string) => {
    setActionInProgress(id);
    try {
      // In a real app this would be a real API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setRecommendations(prevRecs => 
        prevRecs.filter(rec => rec._id !== id)
      );
    } catch (err) {
      console.error('Error rejecting recommendation:', err);
    } finally {
      setActionInProgress(null);
    }
  };

  // Priority labels and styles
  const getPriorityLabel = (priority: number) => {
    if (priority >= 8) return { label: 'High', classes: 'bg-red-100 text-red-800' };
    if (priority >= 5) return { label: 'Medium', classes: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Low', classes: 'bg-green-100 text-green-800' };
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
        <h1 className="text-2xl font-semibold text-gray-900">Supplement Recommendations</h1>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Personalized Recommendations
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Based on your lab test results, we recommend the following supplements to improve your health.
          </p>
        </div>
        
        {recommendations.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {recommendations.map((recommendation) => {
              const priority = getPriorityLabel(recommendation.priority);
              
              return (
                <li key={recommendation._id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/4 mb-4 sm:mb-0 sm:mr-6">
                      <Link to={`/supplements/${recommendation.supplementId._id}`} className="block">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                          {recommendation.supplementId.imageUrl ? (
                            <img 
                              src={recommendation.supplementId.imageUrl} 
                              alt={recommendation.supplementId.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <CubeIcon className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                    
                    <div className="sm:w-3/4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <Link 
                            to={`/supplements/${recommendation.supplementId._id}`}
                            className="text-lg font-medium text-blue-600 hover:text-blue-800"
                          >
                            {recommendation.supplementId.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Based on your {recommendation.labTestId.name} results from {new Date(recommendation.labTestId.date).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="mt-2 sm:mt-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priority.classes}`}>
                            {priority.label} Priority
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-900">Why we recommend this:</h4>
                        <p className="mt-1 text-sm text-gray-600">{recommendation.reason}</p>
                      </div>
                      
                      {recommendation.dosage && (
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-900">Recommended Dosage:</h4>
                          <p className="mt-1 text-sm text-gray-600">{recommendation.dosage}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-lg font-medium text-gray-900">
                          ${recommendation.supplementId.price.toFixed(2)}
                        </div>
                        
                        <div className="flex space-x-3">
                          {recommendation.isAccepted ? (
                            <span className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100">
                              <CheckIcon className="h-5 w-5 mr-1" />
                              Added to Supplements
                            </span>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => handleAcceptRecommendation(recommendation._id)}
                                disabled={!!actionInProgress}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                              >
                                {actionInProgress === recommendation._id ? (
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <CheckIcon className="h-5 w-5 mr-1" />
                                )}
                                Accept
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRejectRecommendation(recommendation._id)}
                                disabled={!!actionInProgress}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                              >
                                {actionInProgress === recommendation._id ? (
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <XIcon className="h-5 w-5 mr-1" />
                                )}
                                Decline
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-12">
            <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations yet</h3>
            <p className="mt-1 text-sm text-gray-500">We'll generate personalized recommendations once you upload lab test results.</p>
            <div className="mt-6">
              <Link
                to="/lab-tests/upload"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Lab Test
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations; 