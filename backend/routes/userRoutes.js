const express = require('express')
const router = express.Router()
const UserCtrl = require('../controllers/userController')
const RefreshCtrl = require('../controllers/refreshController')


router
    .route('/')
    .post(UserCtrl.registerUser)
router.post('/login', UserCtrl.authUser)
router.post('/token',RefreshCtrl.refreshToken)  
router.get('/tokens',RefreshCtrl.getAllTokens)  

router.get("/users", UserCtrl.getAllUsers);




module.exports = router