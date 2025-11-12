import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, RefreshCw, Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface X402Data {
  priceUsd: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  timestamp: number;
  history?: Array<{ price: number; timestamp: number }>;
  lastUpdate?: string;
  error?: string;
}

const X402DashboardCard: React.FC = () => {
  const [data, setData] = useState<X402Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [priceHistory, setPriceHistory] = useState<Array<{ price: number; timestamp: number }>>([]);

  const fetchPrice = async () => {
    try {
      setIsRefreshing(true);
      
      // Fetch langsung dari Dexscreener API
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=X402');
      const result = await response.json();
      
      if (result.pairs && result.pairs.length > 0) {
        const pair = result.pairs[0];
        
        const priceData: X402Data = {
          priceUsd: parseFloat(pair.priceUsd || 0),
          priceChange24h: parseFloat(pair.priceChange?.h24 || 0),
          volume24h: parseFloat(pair.volume?.h24 || 0),
          liquidity: parseFloat(pair.liquidity?.usd || 0),
          timestamp: Date.now(),
          lastUpdate: new Date().toISOString()
        };
        
        setData(priceData);
        setError(null);
        
        // Update price history untuk chart
        setPriceHistory(prev => {
          const newHistory = [...prev, {
            price: priceData.priceUsd,
            timestamp: priceData.timestamp
          }];
          // Keep max 20 data points
          if (newHistory.length > 20) {
            newHistory.shift();
          }
          console.log('Price History Updated:', newHistory.length, 'points');
          return newHistory;
        });
      } else {
        setError('No data available');
      }
    } catch (err) {
      console.error('Error fetching X402 price:', err);
      setError('Connection error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchPrice();

    // Auto-refresh setiap 5 detik
    const interval = setInterval(fetchPrice, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 1) return price.toFixed(2);
    if (price >= 0.01) return price.toFixed(4);
    return price.toFixed(8);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(2)}M`;
    if (volume >= 1_000) return `$${(volume / 1_000).toFixed(2)}K`;
    return `$${volume.toFixed(2)}`;
  };

  if (loading && !data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 right-6 z-50 w-80 glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-center space-x-3">
          <RefreshCw className="w-5 h-5 text-accent-yellow animate-spin" />
          <span className="text-text-secondary text-sm">Fetching X402 price...</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 right-6 z-50 w-80 glass-card rounded-2xl p-6 card-hover card-glow shadow-accent-yellow/25"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-accent-yellow to-orange-400 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-h4 font-semibold text-text-primary">X402 Token</h3>
        </div>
        <motion.div
          animate={{ rotate: isRefreshing ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'text-accent-yellow' : 'text-text-muted'}`} />
        </motion.div>
      </div>

      {error ? (
        <div className="text-center py-4">
          <p className="text-semantic-error text-sm">{error}</p>
          <button 
            onClick={fetchPrice}
            className="mt-2 text-accent-yellow text-sm hover:underline"
          >
            Retry
          </button>
        </div>
      ) : data ? (
        <>
          {/* Price Display */}
          <div className="mb-4">
            <div className="flex items-baseline space-x-2 mb-1">
              <span className="text-3xl font-bold text-text-primary">
                ${formatPrice(data.priceUsd)}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={data.priceChange24h}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                    data.priceChange24h >= 0 
                      ? 'bg-accent-green/20 text-accent-green' 
                      : 'bg-semantic-error/20 text-semantic-error'
                  }`}
                >
                  {data.priceChange24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-semibold">
                    {data.priceChange24h >= 0 ? '+' : ''}{data.priceChange24h.toFixed(2)}%
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="text-xs text-text-muted">24h Change</p>
          </div>

          {/* Mini Chart */}
          <div className="mb-4">
            {priceHistory.length < 2 && (
              <div className="text-center mb-2">
                <span className="text-xs text-accent-yellow">Collecting data... ({priceHistory.length}/2)</span>
              </div>
            )}
            <div className="h-16 -mx-2 relative bg-black/10 rounded-lg overflow-hidden">
              {priceHistory.length >= 2 && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={data.priceChange24h >= 0 ? '#10b981' : '#ef4444'}
                      strokeWidth={2}
                      dot={false}
                      animationDuration={300}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Volume & Liquidity */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="glass rounded-lg p-3">
              <div className="flex items-center space-x-1 mb-1">
                <Activity className="w-3 h-3 text-accent-blue" />
                <span className="text-xs text-text-muted">Volume 24h</span>
              </div>
              <p className="text-sm font-semibold text-text-primary">
                {formatVolume(data.volume24h)}
              </p>
            </div>
            <div className="glass rounded-lg p-3">
              <div className="flex items-center space-x-1 mb-1">
                <DollarSign className="w-3 h-3 text-accent-green" />
                <span className="text-xs text-text-muted">Liquidity</span>
              </div>
              <p className="text-sm font-semibold text-text-primary">
                {formatVolume(data.liquidity)}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
              <span className="text-xs text-text-muted">Live from Dexscreener</span>
            </div>
            {data.lastUpdate && (
              <span className="text-xs text-text-muted">
                {new Date(data.lastUpdate).toLocaleTimeString()}
              </span>
            )}
          </div>
        </>
      ) : null}
    </motion.div>
  );
};

export default X402DashboardCard;
