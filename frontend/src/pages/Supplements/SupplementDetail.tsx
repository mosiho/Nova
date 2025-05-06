import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  ExclamationIcon, 
  ShoppingCartIcon,
  InformationCircleIcon
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import { mockSupplements } from '../../services/mockData';

interface HealthCondition {
  name: string;
  description: string;
}

interface Supplement {
  _id: string;
  name: string;
  description: string;
  benefits: string[];
  category: string;
  recommendedDosage: string;
  recommendedForConditions: HealthCondition[];
  contraindications: string[];
  price: number;
  imageUrl?: string;
  inStock: boolean;
}

const SupplementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [supplement, setSupplement] = useState<Supplement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [subscriptionOption, setSubscriptionOption] = useState<'one-time' | 'monthly'>('one-time');

  useEffect(() => {
    const fetchSupplement = async () => {
      try {
        setTimeout(() => {
          const found = mockSupplements.find(s => s._id === id);
          
          if (found) {
            const supplementWithDetails = {
              ...found,
              recommendedDosage: "Take as directed by your healthcare provider",
              recommendedForConditions: [{ name: "General health", description: "Supports overall wellbeing" }],
              contraindications: ["Consult doctor if pregnant or nursing"]
            };
            setSupplement(supplementWithDetails);
          }
          setLoading(false);
        }, 500);
      } catch (err: any) {
        console.error('Error fetching supplement:', err);
        setError(err.response?.data?.message || 'Failed to load supplement details');
        setLoading(false);
      }
    };

    fetchSupplement();
  }, [id]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // This would normally send a request to add to cart or create a subscription
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Added ${quantity} ${supplement?.name} to cart (${subscriptionOption} purchase)`);
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !supplement) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 text-xl mb-4">{error || 'Supplement not found'}</div>
        <Link to="/supplements" className="btn btn-primary">
          Back to Supplements
        </Link>
      </div>
    );
  }

  // Helper function to format category name for display
  const formatCategory = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/supplements" className="mr-4">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">{supplement.name}</h1>
      </div>
      
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="md:flex">
          {/* Supplement image */}
          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-6">
            {supplement.imageUrl ? (
              <img 
                src={supplement.imageUrl} 
                alt={supplement.name} 
                className="max-w-full max-h-64 object-contain"
              />
            ) : (
              <div className="h-64 w-full flex items-center justify-center">
                <svg className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Supplement details */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-medium text-gray-900">{supplement.name}</h2>
                <p className="text-sm text-gray-500">Category: {formatCategory(supplement.category)}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                ${supplement.price.toFixed(2)}
              </span>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-1 text-gray-600">{supplement.description}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Benefits</h3>
              <ul className="mt-2 space-y-1">
                {supplement.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Recommended Dosage</h3>
              <p className="mt-1 text-gray-600">{supplement.recommendedDosage}</p>
            </div>
            
            {supplement.contraindications.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <span className="font-medium">Warning:</span> Consult with your healthcare provider before starting any supplement.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Purchase options */}
            {supplement.inStock ? (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">Purchase Options</h3>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    In Stock
                  </span>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-base font-medium text-gray-900">Purchase Type</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          id="one-time"
                          name="subscription-option"
                          type="radio"
                          checked={subscriptionOption === 'one-time'}
                          onChange={() => setSubscriptionOption('one-time')}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor="one-time" className="ml-3 block text-sm text-gray-700">
                          One-time purchase
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="monthly"
                          name="subscription-option"
                          type="radio"
                          checked={subscriptionOption === 'monthly'}
                          onChange={() => setSubscriptionOption('monthly')}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor="monthly" className="ml-3 block text-sm text-gray-700">
                          Monthly subscription (save 10%)
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <label htmlFor="quantity" className="mr-4 text-sm font-medium text-gray-700">
                      Quantity:
                    </label>
                    <div className="flex rounded-md shadow-sm">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                      >
                        <span className="sr-only">Decrease</span>
                        <span className="text-lg font-medium">-</span>
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="relative block w-16 border-gray-300 rounded-none focus:ring-blue-500 focus:border-blue-500 text-center"
                      />
                      <button
                        type="button"
                        onClick={increaseQuantity}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                      >
                        <span className="sr-only">Increase</span>
                        <span className="text-lg font-medium">+</span>
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="btn btn-primary w-full py-3"
                  >
                    {isAddingToCart ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    )}
                    {subscriptionOption === 'one-time' ? 'Add to Cart' : 'Subscribe Now'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="inline-flex items-center px-4 py-2 rounded-md bg-red-50 text-red-700">
                  <InformationCircleIcon className="h-5 w-5 mr-2" />
                  <span>Currently out of stock</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Health conditions section */}
      {supplement.recommendedForConditions.length > 0 && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Recommended For</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Health conditions that may benefit from this supplement
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {supplement.recommendedForConditions.map((condition, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-md">
                  <h4 className="text-md font-medium text-blue-700">{condition.name}</h4>
                  <p className="mt-1 text-sm text-blue-600">{condition.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Reviews section (mock) */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
          <div className="flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={`h-5 w-5 ${
                    rating < 4 ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-700">4.0 out of 5 stars</p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            <li className="p-4">
              <div className="flex space-x-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Jane Smith</h3>
                    <p className="text-sm text-gray-500">1 month ago</p>
                  </div>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`h-4 w-4 ${
                          rating < 5 ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    This supplement really helped improve my energy levels. I've been taking it for a month and have noticed a significant difference.
                  </p>
                </div>
              </div>
            </li>
            <li className="p-4">
              <div className="flex space-x-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">John Doe</h3>
                    <p className="text-sm text-gray-500">2 weeks ago</p>
                  </div>
                  <div className="flex items-center">
                    {[0, 1, 2].map((rating) => (
                      <StarIcon
                        key={rating}
                        className="h-4 w-4 text-yellow-400"
                      />
                    ))}
                    {[3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className="h-4 w-4 text-gray-300"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    It's okay, but I didn't see the results I was hoping for. Might need more time.
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div className="p-4 text-center">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplementDetail; 