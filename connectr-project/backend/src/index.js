const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const routes = require('./routes/index');
app.use('/api', routes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Connectr API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});