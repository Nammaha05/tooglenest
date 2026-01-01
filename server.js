// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: ' ToggleNest API is running!',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'Server is healthy',
    database: 'Connected'
  });
});

// 👇 ADD THIS SECTION - API Routes 
// API Routes - Will be added as we build them
// app.use('/api/auth', require('./routes/auth'));           // Member 2
// app.use('/api/users', require('./routes/users'));         // Member 2
// app.use('/api/projects', require('./routes/projects'));   // Member 3
// app.use('/api/tasks', require('./routes/tasks'));         // Member 1 (You!)
// app.use('/api/activity-logs', require('./routes/activityLogs')); // Member 4
// app.use('/api/dashboard', require('./routes/dashboard')); // Member 4


app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: `Route ${req.originalUrl} not found` 
  });
});


app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  res.status(err.statusCode || 500).json({ 
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(` Server running on port ${PORT}`);
  console.log(` http://localhost:${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`); 
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});
