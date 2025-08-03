'use client';

import { useState } from 'react';

export default function Home() {
  const [tokenInput, setTokenInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateTokenAddress = (address: string): boolean => {
    const hexPattern = /^0x[a-fA-F0-9]{40}$/;
    return hexPattern.test(address);
  };

  const handleCheckPrice = async () => {
    if (!tokenInput) return;
    
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      // Search for token by symbol or address using our API route
      const tokenResponse = await fetch(`/api/search-token?query=${encodeURIComponent(tokenInput)}`);
      
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        throw new Error(errorData.error || 'Token not found or not supported');
      }
      
      const tokenData = await tokenResponse.json();
      
      if (!tokenData || tokenData.length === 0) {
        throw new Error('Token not found or not supported');
      }
      
      const token = tokenData[0];
      const tokenAddress = token.address;
      
      // Get spot price using our API route
      const priceResponse = await fetch('/api/spot-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: tokenAddress })
      });
      
      if (!priceResponse.ok) {
        const errorData = await priceResponse.json();
        throw new Error(errorData.error || 'Unable to fetch price');
      }
      
      const priceData = await priceResponse.json();
      const price = priceData[tokenAddress];
      
      if (price) {
        setResult(`${token.name} (${token.symbol}): $${parseFloat(price).toFixed(2)}`);
      } else {
        setResult(`${token.name} (${token.symbol}): Price not available`);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection error. Check your internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Token Worth Checker
        </h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="tokenInput" className="block text-sm font-medium text-gray-700 mb-2">
              Token Symbol or Address:
            </label>
            <input
              id="tokenInput"
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="LINK, UNI, or 0x..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
          
          <button
            onClick={handleCheckPrice}
            disabled={loading || !tokenInput}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Checking...' : 'Check Price'}
          </button>
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {result && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-center font-medium">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
