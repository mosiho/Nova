import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, DocumentIcon, XIcon, CameraIcon, CheckCircleIcon } from '@heroicons/react/outline';
import { PaperClipIcon, SparklesIcon } from '@heroicons/react/solid';
import { useDropzone } from 'react-dropzone';
// Import mock data
import { mockApiResponses, mockLabTests } from '../../services/mockData';

interface LabTestResult {
  name: string;
  value: number;
  unit: string;
  referenceRangeLow?: number;
  referenceRangeHigh?: number;
  isAbnormal?: boolean;
}

interface LabTestFormData {
  type: string;
  name: string;
  provider: string;
  date: string;
  results: LabTestResult[];
  notes?: string;
}

const LabTestUpload: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [formData, setFormData] = useState<LabTestFormData>({
    type: 'blood',
    name: '',
    provider: '',
    date: new Date().toISOString().split('T')[0],
    results: [],
    notes: ''
  });
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setIsAnalyzed(false);
      // In a real application, you would upload the file to your server here
      // For now, we'll simulate file upload
      setTimeout(() => {
        setUploadedFileUrl(URL.createObjectURL(acceptedFiles[0]));
      }, 500);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  const removeFile = () => {
    setFile(null);
    setUploadedFileUrl(null);
    setIsAnalyzed(false);
    setFormData({
      type: 'blood',
      name: '',
      provider: '',
      date: new Date().toISOString().split('T')[0],
      results: [],
      notes: ''
    });
  };

  const analyzeFile = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    // Simulate AI analysis with a random lab test sample
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockLabTests.length);
      const sampleTest = mockLabTests[randomIndex];
      
      setFormData({
        type: 'blood',
        name: sampleTest.name,
        provider: sampleTest.provider,
        date: sampleTest.date,
        results: sampleTest.results,
        notes: 'Automatically analyzed by AI. Please verify the results.'
      });
      
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please upload a lab test document or image');
      return;
    }
    
    if (!isAnalyzed) {
      setError('Please analyze the document first');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Create lab test
      const testData = {
        ...formData,
        rawFileUrl: uploadedFileUrl
      };
      
      // Use mock data
      setTimeout(() => {
        const mockResponse = mockApiResponses.createLabTest(testData);
        navigate(`/lab-tests/${mockResponse.data._id}`);
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create lab test');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/lab-tests" className="mr-4">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Upload Lab Test</h1>
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
      
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">AI-Powered Lab Test Analysis</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Upload your lab test document or image and let our AI analyze the results
          </p>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="form-label flex items-center">
                  <span>Upload Lab Test Document</span>
                  <span className="ml-2 badge badge-blue">Step 1</span>
                </label>
                <div
                  {...getRootProps()}
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="space-y-1 text-center">
                    <input {...getInputProps()} />
                    {file ? (
                      <div className="flex flex-col items-center">
                        {file.type.includes('image/') ? (
                          <div className="relative w-32 h-32 mb-2">
                            <img 
                              src={uploadedFileUrl || ''} 
                              alt="Lab document preview" 
                              className="rounded-md object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <DocumentIcon className="h-12 w-12 text-blue-500" />
                        )}
                        <p className="text-sm text-gray-700 mt-2">{file.name}</p>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <DocumentIcon className="h-10 w-10 text-gray-400" />
                          <CameraIcon className="h-10 w-10 text-gray-400 ml-2" />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Drag and drop a file here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, JPG, or PNG (max 10MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {file && !isAnalyzed && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={analyzeFile}
                    disabled={isAnalyzing}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing document...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Analyze with AI
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-xs text-gray-500">Our AI will extract test name, provider, date, and results automatically</p>
                </div>
              )}
              
              {isAnalyzed && (
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Analysis Complete!</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>We've successfully analyzed your lab test document.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md shadow-sm">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700">Extracted Information</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Test Name</p>
                          <p className="text-sm font-medium">{formData.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Provider</p>
                          <p className="text-sm font-medium">{formData.provider}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-medium">{new Date(formData.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Test Type</p>
                          <p className="text-sm font-medium capitalize">{formData.type}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs text-gray-500 mb-2">Test Results</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marker</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {formData.results.map((result, index) => (
                                <tr key={index}>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{result.name}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{result.value}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{result.unit}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                                    {result.isAbnormal ? (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                        Abnormal
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        Normal
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <Link
                  to="/lab-tests"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading || !isAnalyzed}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  Save Results
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LabTestUpload; 