// server.js - Backend proxy server
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files (your HTML app)
app.use(express.static('public'));

// Search products endpoint
app.get('/api/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const searchUrl = `https://www.k-ruoka.fi/haku?q=${encodeURIComponent(query)}`;
        
        console.log(`Searching for: ${query}`);
        
        const response = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'fi-FI,fi;q=0.8,en-US;q=0.5,en;q=0.3',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
        });

        const $ = cheerio.load(response.data);
        const products = [];

        // Parse product cards
        $('li[data-testid="product-card"]').each((index, element) => {
            const $el = $(element);
            
            const productId = $el.attr('data-product-id');
            const name = $el.find('[data-testid="product-name"] a').text().trim();
            const price = $el.find('[data-testid="product-price"]').text().trim();
            const link = $el.find('[data-testid="product-link"]').attr('href');
            
            // Get image URL
            const imgElement = $el.find('[data-testid="product-image"]');
            let image = imgElement.attr('src');
            if (!image) {
                const srcset = imgElement.attr('srcset');
                if (srcset) {
                    image = srcset.split(' ')[0];
                }
            }

            if (productId && name) {
                products.push({
                    id: productId,
                    name,
                    price: price || 'Price not available',
                    image: image || '',
                    link: link || '',
                    fullUrl: link ? `https://www.k-ruoka.fi${link}` : ''
                });
            }
        });

        console.log(`Found ${products.length} products`);
        res.json({ success: true, products, count: products.length });

    } catch (error) {
        console.error('Search error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch products',
            details: error.message 
        });
    }
});

// Get nutrition data for a specific product
app.get('/api/nutrition/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { productUrl } = req.query;
        
        if (!productUrl) {
            return res.status(400).json({ 
                success: false, 
                error: 'Product URL is required' 
            });
        }

        console.log(`Fetching nutrition for product: ${productId}`);
        
        const response = await axios.get(productUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'fi-FI,fi;q=0.8,en-US;q=0.5,en;q=0.3',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
        });

        const $ = cheerio.load(response.data);
        const nutrition = {};

        // Find nutrition table
        $('.NewNutritionalDetails__Table-sc-1sztb3r-4 tbody tr').each((index, row) => {
            const $row = $(row);
            const label = $row.find('th').first().text().trim();
            const value = $row.find('td').first().text().trim();
            
            if (label && value) {
                nutrition[label] = value;
            }
        });

        console.log(`Found nutrition data:`, nutrition);
        res.json({ success: true, nutrition, productId });

    } catch (error) {
        console.error('Nutrition fetch error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch nutrition data',
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'K-Ruoka scraper API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
