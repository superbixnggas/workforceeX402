const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3007;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Cache untuk menyimpan data dan history
let cachedData = null;
let priceHistory = [];
let lastUpdate = null;

// Fungsi untuk fetch data dari Dexscreener API
async function fetchX402Price() {
  try {
    const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=X402');
    const data = await response.json();
    
    if (data.pairs && data.pairs.length > 0) {
      // Ambil pair pertama (biasanya yang paling liquid)
      const pair = data.pairs[0];
      
      const priceData = {
        priceUsd: parseFloat(pair.priceUsd || 0),
        priceChange24h: parseFloat(pair.priceChange?.h24 || 0),
        volume24h: parseFloat(pair.volume?.h24 || 0),
        liquidity: parseFloat(pair.liquidity?.usd || 0),
        timestamp: Date.now()
      };
      
      // Update cache
      cachedData = priceData;
      lastUpdate = new Date().toISOString();
      
      // Tambahkan ke history (simpan max 20 data points untuk chart)
      priceHistory.push({
        price: priceData.priceUsd,
        timestamp: priceData.timestamp
      });
      
      if (priceHistory.length > 20) {
        priceHistory.shift(); // Remove oldest
      }
      
      return priceData;
    }
    
    throw new Error('No pairs found');
  } catch (error) {
    console.error('Error fetching X402 price:', error.message);
    // Return cached data jika ada error
    return cachedData || {
      priceUsd: 0,
      priceChange24h: 0,
      volume24h: 0,
      liquidity: 0,
      timestamp: Date.now(),
      error: 'Failed to fetch data'
    };
  }
}

// Endpoint untuk get X402 price
app.get('/api/x402-price', async (req, res) => {
  try {
    const data = await fetchX402Price();
    res.json({
      success: true,
      data: {
        ...data,
        history: priceHistory,
        lastUpdate: lastUpdate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      data: cachedData || null
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    lastUpdate: lastUpdate
  });
});

// Auto-refresh setiap 5 detik
setInterval(async () => {
  console.log('Auto-refreshing X402 price data...');
  await fetchX402Price();
}, 5000);

// Initial fetch
fetchX402Price().then(() => {
  console.log('Initial X402 price data fetched');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`X402 Price Server running on http://0.0.0.0:${PORT}`);
  console.log(`API endpoint: http://0.0.0.0:${PORT}/api/x402-price`);
});
