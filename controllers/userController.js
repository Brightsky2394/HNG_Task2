// controllers/userController.js
const { User } = require('../models');

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ status: 'success', message: 'User found', data: user });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', message: 'An error occurred', statusCode: 500 });
  }
};
