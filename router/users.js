const express = require('express')
const router = express.Router()
const usersModel = require('../model/users.js')
const jwt = require('jsonwebtoken')

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

// Verifly Token
router.get('/login/verify', ensureToken, async (req, res)=>{
  res.set('Access-Control-Allow-Origin', 'https://contact3124-3cd66.web.app');
  try {
    await jwt.verify(req.token, 'egci4276272');
    res.json({
      passVerify: 1
    });
  } catch (err) {
    res.status(403).json({
      passVerify: 0
    });;
  }
})

// Generate Token
router.post('/login', async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://contact3124-3cd66.web.app');
    const user = req.body;
    try{
      const result = await usersModel.ensureUser(user)
      if(result){
        const token = jwt.sign({ user: user.username }, 'egci4276272');
        res.json({
          message: "Authenticated! Use this token in the \"Authorization\" header",
          token: token
        });
      }else{
        res.json({
          "message": "Invalid Username or Password",
            "user": user
        });
      }
    } catch (err) { console.error }
})

module.exports = router
