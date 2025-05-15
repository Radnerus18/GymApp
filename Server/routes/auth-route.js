const router = require('express').Router();
const {AddUser,Login,Userverification,GetUser} = require('../controllers/user.controller');
const {AddAdmin,AdminLogin,GetAdminId} = require('../controllers/admin.controller');
const {CreateClass} = require('../controllers/Class.controller')
const userValidationSchema = require('../middlewares/userValidation');
const {VerifyToken} = require('../middlewares/token')
const {SendOtp,VerifyOtp} = require('../controllers/Otp.contoller')


router.get('/server',(req,res)=>res.send('Routing works'))
router.post('/api/admin/register',AddAdmin)
router.post('/api/admin/login',AdminLogin)
router.post('/api/client/register',AddUser)
router.post('/api/client/login',Login)
router.get('/api/client/getUser/:id/:adminId?', GetUser)
router.post('/send-otp',SendOtp)
router.post('/verify-otp',VerifyOtp)
router.post('/',Userverification)
router.post('/api/classes/create', CreateClass);
router.get('/api/admin/me', GetAdminId);
module.exports = router