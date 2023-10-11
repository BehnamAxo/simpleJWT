require('dotenv').config();
const {
  authenticateToken,
  generateAccessToken,
  port,
  users
} = require('./utility');

const express = require('express');
const app = express();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Middleware to parse JSON requests
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/me', authenticateToken, (req, res) => {
  const filteredUser = users.filter(user => user.username === req.user.username);

  if (filteredUser.length === 0) {
    return res.status(404).json({
      message: 'No user with this information exists'
    });
  }

  res.json(filteredUser);
});

app.post('/login', (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(401).json({
      message: 'Please provide a username'
    });
  }

  const user = { username };
  const accessToken = generateAccessToken(user);
  const foundUser = users.find(u => u.username === user.username);

  if (!foundUser) {
    return res.status(404).json({
      message: 'No user with this information exists'
    });
  }

  foundUser.token = accessToken;
  res.json({
    accessToken
  });
});

app.delete('/logout', (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(401).json({
      message: 'Please provide a username'
    });
  }

  const foundUser = users.find(u => u.username === username);

  if (!foundUser) {
    return res.status(404).json({
      message: 'No user with this information exists'
    });
  }

  foundUser.token = '';
  res.status(204).send();
});
