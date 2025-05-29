const router = require('express').Router();
const {AddUser,Login,Userverification,GetUser} = require('../controllers/user.controller');
const {AddAdmin,AdminLogin,GetAdminId} = require('../controllers/admin.controller');
const {CreateClass,getClassesByAdminId,deleteClass,updateClass} = require('../controllers/Class.controller')
const userValidationSchema = require('../middlewares/userValidation');
const {VerifyToken} = require('../middlewares/token')
const {SendOtp,VerifyOtp} = require('../controllers/Otp.contoller')
const {
    addTrainer,
    trainerLogin,
    getAllTrainer,
    getTrainerById,
    updateTrainer,
    deleteTrainer
} = require('../controllers/Trainer.controller');

router.get('/server',(req,res)=>res.send('Routing works'))
router.post('/api/admin/register',AddAdmin)
router.post('/api/admin/login',AdminLogin)
router.post('/api/client/register',AddUser)
router.post('/api/client/login',Login)
router.get('/api/client/getUser/:adminId?', GetUser)
router.post('/send-otp',SendOtp)
router.post('/verify-otp',VerifyOtp)
router.post('/',Userverification)
router.post('/api/classes/create', CreateClass);
router.delete('/api/classes/delete/:classId?', deleteClass);
router.put('/api/classes/update/:classId?', updateClass);
router.get('/api/classes/getClasses/:adminId?', getClassesByAdminId);
router.get('/api/admin/me', GetAdminId);
// Trainer routes
router.post('/api/trainer/register', addTrainer);
router.post('/api/trainer/login', trainerLogin);
router.get('/api/trainer/getAll', getAllTrainer);
router.get('/api/trainer/:id', getTrainerById);
router.put('/api/trainer/:id', updateTrainer);
router.delete('/api/trainer/:id', deleteTrainer);
module.exports = router