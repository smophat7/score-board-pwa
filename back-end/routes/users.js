var express = require('express');
var router = express.Router();
// var admin = require('firebase-admin');

/* GET users listing. */                    // This was a default path I haven't deleted yet
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post("/", (req, res, next) => {
//   // idToken comes from the client app
//   // console.log(admin);
//   // console.log(req);
//   const idToken = req.body;
//   console.log(req);
//   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
//   console.log(idToken);
//   admin
//     .auth()
//     .verifyIdToken(idToken)
//     .then((decodedToken) => {
//       const uid = decodedToken.uid;
//       // ...
//       console.log(uid);
//     })
//     .catch((error) => {
//       // Handle error
//       console.log(error);
//     });
// });

module.exports = router;
