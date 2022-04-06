require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");

const posts = [
  {
    username: "avi",
    post: '1'
  },
  {
    username: "singh",
    post: '2'
  },
];

app.get("/posts", authenticationToken, (req, res) => {
console.log('req.user', req.user)
  res.json(posts.filter(post => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  console.log('body', req.body)
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ acessToken: accessToken });
});

function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
      if(err) return res.sendStatus(403)
      req.user = user
      next()
  })
}

app.listen(3000);
