const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const { analyzeSearchResults,processFiles } = require('./services/aiService.js');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Set up CORS
app.use(cors());

// Set up basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer for handling multipart/form-data
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });

// API endpoint to handle search and analysis
app.post('/api/search', upload.array('files'), async (req, res) => {
  try {
    // Extract form data
    const { name, email, consent } = req.body;
    const aliases =req.body.aliases || '[]';
    const files = req.files || [];

    // Call OpenAI for analysis
    const data = await analyzeSearchResults(
      aliases,
      files,
    );
    return res.status(200).json({
      data,
      success: true,
    });


  } catch (error) {
    console.error('Error processing search request:', error);
    res.status(500).json({
      error: 'Failed to process search request',
      message: error.message
    });
  }
});

// Make sure uploads directory exists
const ensureUploadDir = async () => {
  try {
    await fs.mkdir('uploads', { recursive: true });
    console.log('Uploads directory created or verified');
  } catch (err) {
    console.error('Error creating uploads directory:', err);
  }
};

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
      success_url: 'http://localhost:8080/scan-result',
      cancel_url: 'http://localhost:8080/scan',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  await ensureUploadDir();
  console.log(`Server running on port ${PORT}`);
});
