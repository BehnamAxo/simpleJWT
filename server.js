require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3014;
const users = [
  {
    username: 'Behnam',
    title: 'User 1'
  },
  {
    username: 'Alex',
    title: 'User 2'
  },
  {
    username: 'Kelly',
    title: 'User 3'
  },
  {
    username: 'Lauren',
    title: 'User 4'
  }
];

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/login', (req, res) => {
  // Authenticate user

  const username = req.body.username;
  const user = {
    name: username
  };

  const accessToken = jwt.sign(user, process.env.SECRET_TOKEN);
  res.json({
    accessToken
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
