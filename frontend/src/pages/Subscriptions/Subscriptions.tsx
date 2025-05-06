import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { SparklesIcon } from '@heroicons/react/solid';

const Subscriptions: React.FC = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>(
    user?.subscriptionPlan || 'free'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      description: 'Basic health tracking for everyone',
      price: { monthly: 0 },
      features: [
        'Upload lab test results',
        'Basic health dashboard',
        'Track health metrics',
        'Connect basic wearable devices',
        'Supplement recommendations',
      ],
      limitations: [
        'Advanced analytics',
        'Health assistant AI',
        'Correlation insights',
        'Priority support',
        'Premium content'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      description: 'Advanced health analytics and personalized guidance',
      price: { monthly: 9.99 },
      features: [
        'All Free Plan features',
        'Advanced analytics dashboard',
        'Health assistant AI chat',
        'Correlation insights across metrics',
        'Priority support',
        'Premium health content'
      ],
      limitations: []
    }
  ];

  const handlePlanSelect = (planId: 'free' | 'premium') => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = async () => {
    if (selectedPlan === user?.subscriptionPlan) return;
    
    setIsProcessing(true);
    
    try {
      // In a real app, this would call the API to update the subscription
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating subscription:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Get the most out of your health data with our premium subscription that includes advanced analytics and personalized recommendations.
        </p>
      </div>
      
      {showSuccess && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckIcon className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {selectedPlan === 'premium' 
                  ? 'Successfully upgraded to Premium! Enjoy your new features.' 
                  : 'Successfully downgraded to Free Plan.'}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => setShowSuccess(false)}
                  className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {plans.map((plan) => {
          const isPremiumPlan = plan.id === 'premium';
          const isCurrentPlan = user?.subscriptionPlan === plan.id;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <div 
              key={plan.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all ${
                isSelected 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-transparent'
              }`}
            >
              {isPremiumPlan && (
                <div className="bg-blue-500 text-white text-center py-2 font-semibold text-sm uppercase">
                  Recommended
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                  </div>
                  {isPremiumPlan && (
                    <SparklesIcon className="h-6 w-6 text-yellow-400" />
                  )}
                </div>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.price.monthly}
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">/month</span>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Includes:</h3>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                    
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start opacity-50">
                        <div className="flex-shrink-0">
                          <XIcon className="h-5 w-5 text-red-500" />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{limitation}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => handlePlanSelect(plan.id as 'free' | 'premium')}
                    className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                      isPremiumPlan
                        ? isSelected
                          ? 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500'
                          : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                        : isSelected
                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500'
                          : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50 focus:ring-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  >
                    {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        {selectedPlan !== user?.subscriptionPlan ? (
          <button
            type="button"
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : selectedPlan === 'premium' ? (
              'Upgrade to Premium'
            ) : (
              'Downgrade to Free Plan'
            )}
          </button>
        ) : (
          <p className="text-gray-600 text-lg">You are currently on the {user?.subscriptionPlan === 'premium' ? 'Premium' : 'Free'} plan</p>
        )}
        
        {selectedPlan === 'premium' && user?.subscriptionPlan !== 'premium' && (
          <p className="mt-2 text-sm text-gray-500">
            You'll be charged ${plans.find(p => p.id === 'premium')?.price.monthly} per month. Cancel anytime.
          </p>
        )}
      </div>
      
      <div className="mt-10 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900">Frequently Asked Questions</h3>
        <dl className="mt-6 space-y-6 divide-y divide-blue-200">
          <div className="pt-6">
            <dt className="text-base font-medium text-blue-900">
              Can I cancel my subscription at any time?
            </dt>
            <dd className="mt-2 text-base text-blue-700">
              Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to premium features until the end of your billing period.
            </dd>
          </div>
          <div className="pt-6">
            <dt className="text-base font-medium text-blue-900">
              What payment methods do you accept?
            </dt>
            <dd className="mt-2 text-base text-blue-700">
              We accept all major credit cards and PayPal. Your payment information is securely processed and stored.
            </dd>
          </div>
          <div className="pt-6">
            <dt className="text-base font-medium text-blue-900">
              What happens to my data if I downgrade to the free plan?
            </dt>
            <dd className="mt-2 text-base text-blue-700">
              Your health data is always preserved regardless of your subscription status. However, you'll lose access to premium features like advanced analytics and the health assistant.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Subscriptions; 