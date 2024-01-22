// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // For parsing JSON in the request body
const User = require('./models/User');
const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sohaibafzal:M90nSfPxSrDMbOJ3@cluster0.2ufk0nv.mongodb.net/your-database-name'
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await User.findOne({ username, password });
  
      if (user) {
        // User exists, send success response
        res.json({ success: true, message: 'Login successful' });
      } else {
        // User not found, send failure response
        res.json({ success: false, message: 'Invalid username or password' });
      }
    } catch (error) {
      // Handle errors
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
