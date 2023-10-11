const jwt = require('jsonwebtoken');

const port = 3014;
const users = [
  {
    id: 'd2c2a5be-6853-11ee-8c99-0242ac120002',
    title: 'User 1',
    token: '',
    username: 'Behnam'
  },
  {
    id: 'd2c2a8e8-6853-11ee-8c99-0242ac120002',
    title: 'User 2',
    token: '',
    username: 'Alex'
  },
  {
    id: 'd2c2aa32-6853-11ee-8c99-0242ac120002',
    title: 'User 3',
    token: '',
    username: 'Kelly',
  },
  {
    id: 'd2c2ab5e-6853-11ee-8c99-0242ac120002',
    title: 'User 4',
    token: '',
    username: 'Lauren'
  },
  {
    id: '342b54a4-6854-11ee-8c99-0242ac120002',
    title: 'User 5',
    token: '',
    username: 'Jennie'
  }
];

const generateAccessToken = (user) => {
  return jwt.sign(
    user,
    process.env.SECRET_TOKEN,
    // expiresIn is expressed in seconds or a string describing
    // a time span [zeit/ms](https://github.com/zeit/ms.js).
    // Eg: 60, "2 days", "10h", "7d"
    {
      expiresIn: 20
    }
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    // If the token is valid, attach the user information
    // to the request and proceed to the next middleware
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
  generateAccessToken,
  port,
  users
};
