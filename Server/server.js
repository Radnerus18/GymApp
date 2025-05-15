const express = require('express');
const session = require('express-session');
const path = require('path')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const appRoute = require('./routes/auth-route')
const bodyParser = require('body-parser')
const db = require('./db/conn')
require('dotenv').config();
const {PORT,SECRET_KEY} = process.env;
const app = express();
db()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({
  secret: SECRET_KEY, // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));
app.use(
  cors({
    origin: 'http://192.168.1.5:5173',   // exact front-end origin
    credentials: true,                   // allow cookies / auth headers
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
  })
);
app.use(appRoute)

app.listen(PORT,()=>{
    console.log('Server runs at port',PORT)
})
process.on('uncaughtException',()=>{
    process.exit(1)
})
