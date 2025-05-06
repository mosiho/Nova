import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CubeIcon, SearchIcon } from '@heroicons/react/outline';
// Import mock data
import { mockSupplements } from '../../services/mockData';

interface Supplement {
  _id: string;
  name: string;
  description: string;
  category: string;
  benefits: string[];
  price: number;
  imageUrl?: string;
  inStock: boolean;
}

const Supplements: React.FC = () => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        // Comment out actual API call
        // const response = await axios.get('/api/supplements');
        // setSupplements(response.data.data || []);
        
        // Use mock data instead
        setTimeout(() => {
          setSupplements(mockSupplements);
          setLoading(false);
        }, 500); // Add a small delay to simulate network request
      } catch (err: any) {
        console.error('Error fetching supplements:', err);
        setError('Failed to load supplements');
        setLoading(false);
      }
    };

    fetchSupplements();
  }, []);

  // Filter supplements based on search term and category
  const filteredSupplements = supplements.filter(supplement => {
    const matchesSearch = searchTerm === '' || 
      supplement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplement.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || supplement.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // For demo purposes, using a mock list of categories
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'vitamin', label: 'Vitamins' },
    { value: 'mineral', label: 'Minerals' },
    { value: 'amino_acid', label: 'Amino Acids' },
    { value: 'herb', label: 'Herbs' },
    { value: 'probiotic', label: 'Probiotics' },
    { value: 'omega', label: 'Omegas' },
    { value: 'other', label: 'Other' }
  ];

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
        <h1 className="text-2xl font-semibold text-gray-900">Supplements</h1>
      </div>
      
      {/* Search and filter */}
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search supplements"
              />
            </div>
          </div>
          <div className="md:w-64">
            <label htmlFor="category" className="sr-only">Category</label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
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
      
      {/* Supplements grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSupplements.length > 0 ? (
          filteredSupplements.map((supplement) => (
            <Link
              key={supplement._id}
              to={`/supplements/${supplement._id}`}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                {supplement.imageUrl ? (
                  <img 
                    src={supplement.imageUrl} 
                    alt={supplement.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <CubeIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{supplement.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {supplement.category.replace('_', ' ')}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{supplement.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">${supplement.price.toFixed(2)}</span>
                  {supplement.inStock ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No supplements found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCategory ? 'Try adjusting your search or filter' : 'Check back later for supplements'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplements; 