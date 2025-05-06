import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  PaperAirplaneIcon, 
  ChatAltIcon, 
  RefreshIcon,
  LightBulbIcon,
  ShieldCheckIcon
} from '@heroicons/react/outline';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionOpen, setSuggestionOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Check if user has premium subscription
  const isPremium = user?.subscriptionPlan === 'premium';

  // Add initial welcome message
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      role: 'assistant',
      content: `Hello ${user?.firstName || 'there'}! I'm your Nova Health Assistant. I can help answer questions about your health data, provide supplement information, or offer general health guidance. How can I assist you today?`,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [user]);

  // Automatically scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const suggestions = [
    "What supplements should I take for low vitamin D?",
    "How can I improve my sleep quality?",
    "What's the connection between my low iron and fatigue?",
    "Are my heart rate patterns normal?"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setSuggestionOpen(false);
    setInputValue(suggestion);
    // Optional: Auto-submit the suggestion
    // handleSubmit(suggestion);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent | string) => {
    if (e instanceof Event) {
      e.preventDefault();
    }
    
    // Don't submit empty messages
    const messageText = typeof e === 'string' ? e : inputValue;
    if (!messageText.trim() || isLoading) return;
    
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };
    
    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Clear input
    setInputValue('');
    
    // In a real application, this would call your AI service
    setIsLoading(true);
    
    try {
      // Simulating API call to get assistant's response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock responses based on keywords in the user message
      let responseContent = '';
      const lowerCaseMessage = messageText.toLowerCase();
      
      if (lowerCaseMessage.includes('vitamin d') || lowerCaseMessage.includes('vitamin')) {
        responseContent = "Based on your latest lab results, your vitamin D levels are indeed on the lower side. I'd recommend getting more sun exposure (about 15-30 minutes daily) and considering a vitamin D3 supplement. Our data shows that supplements with D3 and K2 combination work best for absorption. Would you like me to show you specific supplement options?";
      } else if (lowerCaseMessage.includes('sleep')) {
        responseContent = "Looking at your sleep data from your connected Apple Watch, your deep sleep has been averaging only 15% of your total sleep time, which is below the ideal range of 20-25%. Try establishing a consistent sleep schedule, avoid screens 1 hour before bed, and consider magnesium glycinate which may help improve sleep quality.";
      } else if (lowerCaseMessage.includes('iron') || lowerCaseMessage.includes('fatigue')) {
        responseContent = "Your latest lab tests from May 2023 show iron levels at the lower end of the normal range. This could contribute to your fatigue. I notice your ferritin is also low, suggesting depleted iron stores. Consider iron-rich foods like spinach, lentils, and grass-fed beef. A vitamin C-rich food paired with iron sources can help absorption.";
      } else if (lowerCaseMessage.includes('heart rate')) {
        responseContent = "Your heart rate patterns are within normal range. Your resting heart rate averages 68 bpm, which is healthy. I notice your heart rate variability has been improving over the last month, which is an excellent sign of cardiovascular health and stress resilience. Continue with your current exercise routine as it's showing positive effects.";
      } else {
        responseContent = "I understand you're asking about " + messageText.split(' ').slice(0, 3).join(' ') + "... To give you the most accurate guidance, I'd need to analyze your specific health data. Based on your profile, I can see your recent lab tests and connected devices data. Would you like me to check for any patterns or specific recommendations related to this topic?";
      }
      
      // Create assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      // Add assistant message to chat
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting to the server. Please try again in a moment.",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const resetChat = () => {
    // Add initial welcome message again
    const initialMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Hello ${user?.firstName || 'there'}! I'm your Nova Health Assistant. How can I assist you today?`,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    setSuggestionOpen(true);
  };

  if (!isPremium) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <LightBulbIcon className="mx-auto h-12 w-12 text-yellow-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Health Assistant is a Premium Feature</h2>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            Get personalized health guidance, supplement recommendations, and answers to all your health questions.
          </p>
          <div className="mt-6">
            <Link
              to="/subscriptions"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col">
      <div className="bg-white shadow rounded-lg flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full">
              <ChatAltIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-900">Health Assistant</h2>
              <p className="text-sm text-gray-500">Powered by AI</p>
            </div>
          </div>
          <button
            onClick={resetChat}
            className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
          >
            <RefreshIcon className="h-5 w-5" />
          </button>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs sm:max-w-md px-4 py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 text-right ${
                    message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}
                >
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggestions */}
        {suggestionOpen && messages.length === 1 && (
          <div className="px-4 py-3 bg-blue-50">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Suggested questions:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-sm bg-white border border-blue-300 rounded-full px-3 py-1 text-blue-700 hover:bg-blue-100"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Privacy notice */}
        <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 flex items-center">
            <ShieldCheckIcon className="h-3 w-3 mr-1" />
            Your conversations are private and used only to improve your health recommendations
          </p>
        </div>
        
        {/* Input form */}
        <form onSubmit={handleSubmit} className="p-4 border-t flex">
          <input
            type="text"
            placeholder="Ask about your health, lab results, or supplements..."
            className="flex-1 rounded-l-lg border-r-0 focus:ring-blue-500 focus:border-blue-500"
            value={inputValue}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-r-lg text-white ${
              isLoading || !inputValue.trim() 
                ? 'bg-blue-400' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant; 