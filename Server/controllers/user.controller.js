const User = require('../models/user.model');
const Membership = require('../models/membership.model')
const bcrypt = require('bcryptjs');
const appResponse = require('../middlewares/response');
const SecureToken = require('../middlewares/token');
const jwt = require('jsonwebtoken')
require('dotenv').config()



const AddUser = async (req, res) => {
    const { full_name, email, phoneNumber } = req.body;
    const userId = 'DB'+Math.floor(Math.random()*9999)
    const userPwd = full_name.substr(0,4)+'@'+phoneNumber.toString().substring(6,9)
    const hashedPassword = await bcrypt.hash(userPwd, 10);
    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 3); // add 3 months
    try {
        const existingUser = await User.findOne({ 
            $or: [
            { email: email },
            { phone: phoneNumber }
            ]
        });
        console.log('@@@',req.body)
        if (existingUser) {
            return res.json(appResponse('User already exists',false,null));
        }
        const selectedMembership = await Membership.findOne({ plan: req.body.plan });

        const newUser = await User.create({ 
            role: 'client',
            name: full_name,
            joiningDate: new Date().toDateString().replace(/^\w+\s/, ''),
            password: hashedPassword,
            clientId: userId,
            membership: selectedMembership._id,
            ...req.body 
        });

        const completeUserDetail = await User.findById(newUser._id).populate('membership');
        // console.log('$$$', completeUserDetail);

        transporter.sendMail(mailOptions(email,userId,userPwd), (err, info) => {
            if(err){
                console.log('Error in sending mail')
            }
            console.log('Mail sent successfully',info.response)
        })
        return res.json(appResponse('Registration successful. We will reach you.',true, completeUserDetail ));
    } catch (err) {
        console.error('Error in registration',err);
        return res.json(appResponse('Error in registration', false,null));
    }
};
const Login = async(req,res,next)=>{
    try {
        const {clientId,password} = req.body;
        if(!clientId || !password){
            return res.json(appResponse('Invalid credentials',false,null))
        }
        const user = await User.findOne({clientId})
        if(!user){
            return res.json(appResponse('Please register yourself',false,null))
        }
        const auth = await bcrypt.compare(password,user.password)
        if(!auth){
            return res.json(appResponse('Wrong Password',false,null))
        }
        try {
            const token = await SecureToken(user._id)
            res.header('header_token',token)
            res.cookie('authToken',token,{
                withCredentials:true,
                httpOnly:false
            })
        } catch (error) {
            return res.status(401).json(appResponse('User denied',false))
        }
        next()
        return res.status(200).json(appResponse('Login Success',true,user))
    } catch (error) {
        return res.status(401).json(appResponse('Error in login',false))
    }
}
const Userverification = async(req,res)=>{
    const token = req.cookies?.token || req.headers.cookie?.split('authToken=')[1]?.split(';')[0] || null;
    if (!token) {
        return res.json({ status: false,msg:'no token' })
    }
    console.log(token)
    jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
        if (err) {
            console.log('Error',err)
            return res.json({ status: false,msg:'err' })
        } else {
            console.log('data',data)
            const user = await User.findById(data.uid)
            if (user) return res.json({ status: true, user: user.name })
            else return res.json({ status: false,msg:'no user' })
        }
    })
}
const GetUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const user = await User.findOne({ clientId: id }).populate('membership');
            if (!user) {
                return res.json(appResponse('User not found', false, null));
            }
            return res.json(appResponse('User retrieved successfully', true, user));
        } else {
            const users = await User.find({});
            // Populate membership for each user
            const allUser = await Promise.all(users.map(async (u) => {
                return await u.populate('membership');
            }));
            // console.log('All users',allUser)
            if (!users || users.length === 0) {
                return res.json(appResponse('No users found', false, null));
            }
            return res.json(appResponse('Users retrieved successfully', true, allUser));
        }
    } catch (err) {
        console.error('Error fetching user(s)', err);
        return res.json(appResponse('Error fetching user(s)', false, null));
    }
};
module.exports = { AddUser,Login,Userverification,GetUser};