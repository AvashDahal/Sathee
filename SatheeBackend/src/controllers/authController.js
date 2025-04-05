import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import Role1 from '../models/userModel.js';
import Role2 from '../models/userModel.js';
// Helper functions to sign tokens
export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

// Signup function
export const signup = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ status: 'fail', message: 'Passwords do not match' });
  }

  try {
    const newUser = await User.create({ fullName, email, password, role: 'undefined' });
    const token = signToken(newUser._id);
    const refreshToken = signRefreshToken(newUser._id);
    res.status(201).json({ status: 'success', token, refreshToken });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'fail', message: 'Please provide email and password!' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
  }

  const token = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  const refreshTokenExpiry = durationToMilliseconds(process.env.JWT_REFRESH_EXPIRES_IN);
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: refreshTokenExpiry,
  });
  
  res.status(200).json({ status: 'success', token, refreshToken, role: user.role });
};

// Token duration helper
export const durationToMilliseconds = (duration) => {
  const match = duration.match(/^(\d+)([dhms])$/);
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'm':
      return value * 60 * 1000;
    case 's':
      return value * 1000;
    default:
      throw new Error(`Unknown time unit: ${unit}`);
  }
};

// Refresh Token function
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ status: 'fail', message: 'No refresh token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newToken = signToken(decoded.id);
    res.status(200).json({ status: 'success', token: newToken });
  } catch (err) {
    res.status(401).json({ status: 'fail', message: 'Invalid refresh token' });
  }
};




export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ status: 'fail', message: 'Please provide your email address.' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'No user found with this email address.' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token expiration time (1 hour)
    const resetPasswordExpires = Date.now() + 3600000;

    // Save token and expiration to the user's document
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // Send reset link via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the link below to reset your password: \n\n ${resetUrl} \n\n If you did not request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ status: 'success', message: 'Password reset link sent to your email address.' });

  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};


export const resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  // Validate that passwords match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ status: 'fail', message: 'Passwords do not match' });
  }

  try {
    // Hash the token to compare with the stored reset token
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find the user with the matching token and check if it is expired
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token has not expired
    });

    if (!user) {
      return res.status(400).json({ status: 'fail', message: 'Invalid or expired reset token' });
    }

    // Update the user's password and clear the reset token fields
    user.password = newPassword;
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear the expiration date
    await user.save();

    res.status(200).json({ status: 'success', message: 'Password successfully updated' });

  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

// Delete User Account by Email and Password
export const deleteUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ status: 'fail', message: 'Please provide both email and password' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email }).select('+password'); // Ensure password is included in the result

    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'No user found with this email address' });
    }

    // Verify if the provided password matches the stored password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect password' });
    }

    // 1. Delete related data in Role1 model if the user is a Role1
    if (user.role === 'Role1') {
      const Role1 = await Role1.findOneAndDelete({ _id: user._id });
      if (Role1) {
        console.log(`Role1 account with userId ${user._id} has been deleted.`);
      }
    }

    // 2. Delete related data in Role2 model if the user is a Role2
    if (user.role === 'Role2') {
      const Role2 = await Role2.findOneAndDelete({ userId: user._id });
      if (Role2) {
        console.log(`Role2 account with userId ${user._id} has been deleted.`);
      }
    }

   // 3. Delete the user from the database using deleteOne()
   await User.deleteOne({ _id: user._id });
    // Send success response
    res.status(200).json({ status: 'success', message: 'User account deleted successfully' });

  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};