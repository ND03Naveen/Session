const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connect = require('./dbConnection');
const cors = require('cors');

const app = express();

// enable cross-origin requests for all routes
app.use(cors({
    origin: ['http://localhost:3001'],
    credentials: true
}));

// For All Orgin
// app.use(cors({
//     origin: '*',
//     credentials: true
//   }));

//For Multiple Orgin
// app.use(cors({
//     origin: ['http://example1.com', 'http://example2.com'],
//     credentials: true
//   }));

// Configure the session middleware
app.use(session({
    secret: '1234567890', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to false if not using HTTPS
    }
}));

// Configure the body parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define a login route that sets session data
app.post('/login', (req, res) => {
    // Replace with your own authentication logic
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        req.session.isAuthenticated = true;
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Define a protected route that requires session data

app.get('/api/users', async (req, res) => {
    if (req.session.isAuthenticated) {
        const client = await connect();
        const db = client.db('test');
        const users = await db.collection('users').find().toArray();
        res.json(users);
        client.close();
    }
    else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});


// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
