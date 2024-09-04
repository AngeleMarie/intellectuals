const Intel = require('../model/IntellectualModel.js');
const Admin=require("../model/AdminModel.js")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt=require("bcrypt")

dotenv.config();

const register = async (req, res) => {
  try {
    
    const {
      FirstName,
      LastName,
      Gender,
      Email,
      PersonalWebsite,
      PhoneNumber,
      Country,
      Residence,
      DOB,
      SchoolName,
      Combination,
      FieldOfStudy,
      Degree,
      GraduationYear,
      OtherField,
      Position,
      Location,
      Organization,
      MoreInformation
      
    } = req.body;

    
    let user = await Intel.findOne({ Email: { $regex: new RegExp(`^${Email}$`, 'i') } });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const intel = new Intel({
      FirstName,
      LastName,
      Gender,
      Email,
      PersonalWebsite,
      PhoneNumber,
      Country,
      Residence,
      DOB,
      SchoolName,
      Combination,
      FieldOfStudy,
      Degree,
      GraduationYear,
      OtherField,
      Organization,
      MoreInformation,
      Position,
      Location,
    });

    
    await intel.save();
    return res.status(201).json({ message: 'Intellectual registered successfully' });
  } catch (error) {
    console.error('Error registering intellectual:', error.message);

    
    return res.status(500).json({
      error: 'Failed to register user',
      message: error.message, 
    });
  }
};


const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token, username: admin.username });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    admin = new Admin({
      username,
      password,
      email,
    });

    await admin.save();
    return res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error.message);
    return res.status(500).json({
      error: 'Failed to register admin',
      message: error.message,
    });
  }
};

const getAllIntellectuals = async (req, res) => {
  try {
    
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

  
    const intellectuals = await Intel.find({});
    return res.status(200).json(intellectuals);
  } catch (error) {
    console.error('Error retrieving intellectuals:', error.message);
    return res.status(500).json({
      error: 'Failed to retrieve intellectuals',
      message: error.message,
    });
  }
};
const logout = (req, res) => {
  try {
   
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error.message);
    res.status(500).json({ error: 'Failed to log out', message: error.message });
  }
};

module.exports = {
  register,
  getAllIntellectuals,
  loginAdmin,
  registerAdmin,
  logout
};
