const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const appResponse = require('../middlewares/response');
require('dotenv').config()
const {createTransporter,getWelcomeMailOptions} = require('../middlewares/mailer')
const jwt = require('jsonwebtoken');
const auth_mail = process.env.OTP_USER_NAME;
const auth_pass = process.env.OTP_API_KEY;

const transporter = createTransporter({
  service: 'gmail',
  user: auth_mail,
  pass: auth_pass
});
const mailOptions = (email, adminId, adminPwd)=>{
    return getWelcomeMailOptions({
        from: auth_mail,
        to: email,
        userId: adminId,
        userPwd: adminPwd
    });
}
const AddAdmin = async (req, res) => {
    const { name, email, phoneNumber } = req.body;
    console.log('@@@',req.body)
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({
            $or: [
                { email: email },
                { phone: phoneNumber }
            ],
            role: 'admin'
        });
        if (existingAdmin) {
            return res.json(appResponse('Admin already exists', false, null));
        }

        // Generate admin credentials
        const adminId = 'AD' + Math.floor(Math.random() * 9999);
        const adminPwd = name.substr(0, 4) + '@' + phoneNumber.toString().substring(6, 9);
        const hashedPassword = await bcrypt.hash(adminPwd, 10);

        // Create admin user
        const newAdmin = await Admin.create({
            role: 'admin',
            name,
            email,
            phoneNumber: phoneNumber,
            adminId: adminId,
            password: hashedPassword
        });

        // Send email with credentials
        const options = mailOptions(email, adminId, adminPwd)
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log('Error in sending mail');
            } else {
                console.log('Mail sent successfully', info.response);
            }
        });

        return res.json(appResponse('Admin registered successfully', true, newAdmin));
    } catch (error) {
        console.error('Error in admin registration', error);
        return res.json(appResponse('Error in admin registration', false, null));
    }
}
const AdminLogin = async (req, res) => {
    const { adminId, password } = req.body;
    try {
        const admin = await Admin.findOne({ adminId, role: 'admin' });
        if (!admin) {
            return res.json(appResponse('Invalid credentials', false, null));
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json(appResponse('Invalid credentials', false, null));
        }
        req.session.adminId = admin.adminId;
        const token = jwt.sign(
            { id: admin._id, adminId: admin.adminId, role: admin.role },
            process.env.SECRET_KEY || 'default_secret',
            { expiresIn: '1d' }
        );
        // Send token as cookie
        res.cookie('token', token, {
            httpOnly : true,
            secure   : process.env.NODE_ENV === 'production',
            sameSite : 'None',              // required if front-end is on another origin
            maxAge   : 24 * 60 * 60 * 1000, // 1 day
        });
        return res.json(appResponse('Login successful', true, { admin,token }));
    } catch (error) {
        console.error('Error in admin login', error);
        return res.json(appResponse('Error in admin login', false, null));
    }
};
const GetAdminId = async(req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    res.json({ adminId: decoded.adminId });
  });
}

module.exports = {AddAdmin,AdminLogin,GetAdminId}