var admin = require('firebase-admin');

// Middleware for validating user tokens. Must be validated before
// we can serve any account-sensitive data

const getAuthToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // console.log("Inside if in getAuthToken, req.authToken: " + req.authToken);
    // console.log("req.body: " + req.body);
    // console.log("headers.authorization: " + req.headers.authorization)
    req.authToken = req.headers.authorization.split(' ')[1];
  }
  else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
 getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      console.log("authToken: " + authToken);
      const userInfo = await admin.auth().verifyIdToken(authToken);
      console.log("userInfo: " + userInfo);
      req.authId = userInfo.uid;
      return next();
    }
    catch (error) {
      console.log("authentication error: " + error);
      return res.status(401).send({ error: 'You are not authorized to make this request.' });
    }
  });
};

module.exports = checkIfAuthenticated;