const { StatusCodes } = require('http-status-codes'); 
const bcrypt = require('bcryptjs'); 
const User = require('../models/User'); 
const { UnauthenticatedError } = require('../errors/index');

//  handle user registration

const register = async (req, res) => {
// {name, email, password}
  const user = await User.create({ ...req.body });
  
  const token = user.createJWT();
  
  res.status(StatusCodes.CREATED).json({ token });
};

//  handle user login
const login = async (req, res) => {
  const { email, password } = req.body; 
  
  const user = await User.findOne({ email });
  

  if (!user) {
    throw new UnauthenticatedError('Invalid email account');
  }
  

  // verify user password and throw an error if not matched
  const isPasswordCorrect = await user.verifyPassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid email account');
  }
  
  
  const token = user.createJWT();
  
  res.status(StatusCodes.OK).json({ token });
};


module.exports = { login, register };