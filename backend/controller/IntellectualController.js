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
      educationLevels,  // This includes FieldOfStudy and Degree as array of objects
      OtherField,
      Organization,
      GraduationYear,
      Position,
      Location,
      MoreInformation,
    } = req.body;

    let user = await Intel.findOne({ Email: { $regex: new RegExp(`^${Email}$`, 'i') } });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    
    const FieldOfStudy = educationLevels.map(level => level.FieldOfStudy);
    const Degree = educationLevels.map(level => level.Degree);

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
      FieldOfStudy,  // Save array of FieldOfStudy
      Degree,        // Save array of Degree
      OtherField,
      Organization,
      GraduationYear,
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

const filterIntellectuals = async (req, res) => {
  try {
  
    const { Gender, Degree, FieldOfStudy, Residence } = req.query;

    let query = {};


    if (Residence) {
      query.Residence= Residence;
    }
    if (Degree) {
      query.Degree = Degree;
    }

    if (FieldOfStudy) {
      query.FieldOfStudy = FieldOfStudy;
    }

    
    if (Gender) {
      query.Gender=Gender

  
    }
    
    const intellectuals = await Intel.find(query);
    return res.status(200).json(intellectuals);
  } catch (error) {
    console.error('Error filtering intellectuals:', error.message);
    return res.status(500).json({
      error: 'Failed to filter intellectuals',
      message: error.message,
    });
  }
};

module.exports = {
  register,
  loginAdmin,
  registerAdmin,
  filterIntellectuals
};
