const express = require('express');
const path = require('path')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const appRoute = require('./routes/auth-route')
const bodyParser = require('body-parser')
const db = require('./db/conn')
require('dotenv').config();
const {PORT} = process.env;
const app = express();
db()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(appRoute)
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT,()=>{
    console.log('Server runs at port',PORT)
})
process.on('uncaughtException',()=>{
    process.exit(1)
})
