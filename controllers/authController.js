// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Organization } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userId: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    });
    const newOrg = await Organization.create({
      orgId: uuidv4(),
      name: `${firstName}'s Organisation`,
      description: ''
    });
    await newOrg.addUser(newUser);
    const token = jwt.sign({ userId: newUser.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ status: 'success', message: 'Registration successful', data: { accessToken: token, user: newUser } });
  } catch (error) {
    res.status(400).json({ status: 'Bad request', message: 'Registration unsuccessful', statusCode: 400 });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ status: 'success', message: 'Login successful', data: { accessToken: token, user } });
    } else {
      res.status(401).json({ status: 'Bad request', message: 'Authentication failed', statusCode: 401 });
    }
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', message: 'An error occurred', statusCode: 500 });
  }
};
