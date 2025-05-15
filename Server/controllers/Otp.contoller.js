const nodemailer = require('nodemailer');
const User =  require('../models/user.model')
const redis = require('redis');
const appResponse = require('../middlewares/response')
const client = redis.createClient({
    url: 'redis://127.0.0.1:6379' // Replace with your Redis server URL if different
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

client.connect().then(() => {
    console.log('Connected to Redis successfully');
}).catch((err) => {
    console.error('Failed to connect to Redis', err);
});

require('dotenv').config()

const auth_mail = process.env.OTP_USER_NAME;
const auth_pass = process.env.OTP_API_KEY;
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:auth_mail,
        pass:auth_pass
    }
})
const mailOptions = (fullname,tomail,otp)=>({
    'from': auth_mail,
    'to': tomail,
    'subject': 'Super Being Registration',
    'text': `Hi ${fullname},\n Otp for registration is ${otp}. \n Note!!!.. This opt is valid for 5 minutes only. `
})
const SendOtp = async (req, res) => {
    const { full_name, email,phoneNumber } = req.body;
    try {
      const existingUser = await User.findOne({ 
                  $or: [
                  { email: email },
                  { phone: phoneNumber }
                  ]
              });
        if (existingUser) {
            return res.json(appResponse('User already exists',false,null));
        }
      const otp = (100000 + Math.floor(899999 * Math.random())).toString();
      const expiresAt = Date.now() + 5 * 60 * 1000;
      const otpData = { otp, expiresAt };
      client.setEx(email, 300, JSON.stringify(otpData)); // Store OTP
  
      // Send Email
      transporter.sendMail(mailOptions(full_name, email, otp), (err, info) => {
        if (err) {
          console.error('Error sending email:', err);
          return res.status(500).json({ success: false, message: 'Error in sending mail' });
        }
        return res.status(200).json({ message: `OTP sent to ${email}`, success: true });
      });
    } catch (error) {
      console.error('Error in send-otp API:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
const VERIFY_OTP_LUA = `
    local data = redis.call("GET", KEYS[1])
    if not data then return {false, "OTP not found or expired"} end
    local obj = cjson.decode(data)
    if tonumber(ARGV[1]) > tonumber(obj.expiresAt) then
        redis.call("DEL", KEYS[1])
        return {false, "OTP expired"}
    elseif obj.otp ~= ARGV[2] then
        return {false, "OTP is not valid"}
    else
        redis.call("DEL", KEYS[1])
        return {"true", "OTP Verified!"}
    end
`;
const VerifyOtp = async (req, res) => {
    const { email, otp: enteredOtp } = req.body;
    try {
        const [verified, message] = await client.eval(
            VERIFY_OTP_LUA,
            {
                keys: [email],
                arguments: [Date.now().toString(), enteredOtp],
            }
        );

        return res.json({ verified, message });
    } catch (error) {
        console.error('OTP verification error:', error);
        return res.status(500).json({ verified: false, message: 'Internal server error' });
    }
};
module.exports =  { SendOtp, VerifyOtp };