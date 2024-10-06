// server.js
import express from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';

config(); 

const app = express();

// Middleware 
app.use(express.json());

// Connect to MongoDB
connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// routes Place holders
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
