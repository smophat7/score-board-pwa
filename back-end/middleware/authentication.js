var admin = require('firebase-admin');

// Middleware for validating user tokens. Must be validated before
// we can serve any account-sensitive data or make changes 

const getAuthToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
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
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.fb_uid = userInfo.uid;
      return next();
    }
    catch (error) {
      return res.status(401).send({ error: 'You are not authorized to make this request.' });
    }
  });
};

module.exports = checkIfAuthenticated;