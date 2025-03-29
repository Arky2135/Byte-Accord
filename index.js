const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});


// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to SetuConnect API!');
});

// New route for user authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Authentication logic here
    res.send('Login route');
});

// New route for data retrieval
app.get('/data', (req, res) => {
    // Data retrieval logic here
    res.json({ message: 'Data retrieved successfully' });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
