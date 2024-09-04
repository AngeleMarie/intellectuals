
const express = require('express');
const router = express.Router();
const { register, getAllIntellectuals,loginAdmin,registerAdmin,logout } = require('../controller/IntellectualController');
const adminMiddleware = require('../middlewares/auth');

router.post('/register', register);
router.post('/admin/login', loginAdmin);
router.post('/admin/register', logout);
router.post('/logout', registerAdmin);
router.get('/intellectuals', adminMiddleware, getAllIntellectuals);

module.exports = router;
