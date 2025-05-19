const express = require('express');
const cors = require('cors');
const { searchGoogle } = require('./services/serpService');
const { analyzeSearchResults } = require('./services/openaiService');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;

    const processedResults = await searchGoogle(query);

    // Prepare data for ChatGPT analysis
    const searchData = processedResults.map(result => ({
      title: result.title,
      snippet: result.snippet,
      url: result.url,
      risk: result.risk,
      type: result.type
    }));
    console.log("searchData",searchData);

    // Get ChatGPT analysis
    const analysis = await analyzeSearchResults(query, searchData);

    res.json({
      searchResults: processedResults,
      analysis: analysis
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.post('/api/create-payment-session', async (req, res) => {

  try {
    const { amount } = req.body;


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Scan Request',
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://www.violamed.com/',
      cancel_url: 'https://www.violamed.com/',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});