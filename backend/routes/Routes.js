
const express = require('express');
const router = express.Router();
const { register,loginAdmin,registerAdmin,logout,filterIntellectuals } = require('../controller/IntellectualController');
const adminMiddleware = require('../middlewares/auth');

router.post('/register', register);
router.post('/admin/login', loginAdmin);
router.post('/admin/register', registerAdmin);
router.post('/logout',logout);
router.get('/intellectuals/filter',adminMiddleware, filterIntellectuals);

module.exports = router;
