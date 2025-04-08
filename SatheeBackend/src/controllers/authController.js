import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

// Helper functions
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

const durationToMilliseconds = (duration) => {
  const match = duration?.match(/^(\d+)([dhms])$/);
  if (!match) throw new Error(`Invalid duration format: ${duration}`);

  const [_, value, unit] = match;
  const num = parseInt(value, 10);

  return {
    d: num * 86400000,
    h: num * 3600000,
    m: num * 60000,
    s: num * 1000,
  }[unit];
};

// Signup
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    console.log("req.body:", req.body);
    if (!fullName || !email || !password)
      return res.status(400).json({
        status: 'fail',
        message: 'Missing required fields',
        details: {
          fullName: fullName ? 'provided' : 'missing',
          email: email ? 'provided' : 'missing',
          password: password ? 'provided' : 'missing',
        },
      });

    if (password !== confirmPassword)
      return res.status(400).json({ status: 'fail', message: 'Passwords do not match' });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ status: 'fail', message: 'Email is already in use' });

    const newUser = await User.create({ fullName, email, password, role: 'pending' });

    const token = signToken(newUser._id);
    const refreshToken = signRefreshToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      refreshToken,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ status: 'fail', message: 'Error creating user', error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password)))
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });

    const token = signToken(user._id);
    const refreshToken = signRefreshToken(user._id);
    const refreshTokenExpiry = durationToMilliseconds(process.env.JWT_REFRESH_EXPIRES_IN || '7d');

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: refreshTokenExpiry,
    });

    res.status(200).json({
      status: 'success',
      token,
      refreshToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: 'fail', message: 'Login failed', error: err.message });
  }
};

// Refresh Token
export const refreshToken = async (req, res) => {
  try {
    const token = req.body?.refreshToken || req.cookies?.refreshToken;

    if (!token)
      return res.status(401).json({ status: 'fail', message: 'No refresh token provided' });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = signToken(decoded.id);

    res.status(200).json({ status: 'success', token: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(401).json({ status: 'fail', message: 'Invalid refresh token' });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ status: 'fail', message: 'Please provide your email' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ status: 'fail', message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Password Reset Request',
      text: `Click to reset password: ${resetUrl}`,
    });

    res.status(200).json({ status: 'success', message: 'Reset link sent' });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ status: 'fail', message: 'Failed to send email', error: err.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword)
      return res.status(400).json({ status: 'fail', message: 'Missing fields' });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ status: 'fail', message: 'Passwords do not match' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ status: 'fail', message: 'Token expired or invalid' });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ status: 'success', message: 'Password reset successful' });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ status: 'fail', message: 'Could not reset password', error: err.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ status: 'fail', message: 'Email and password required' });

    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return res.status(404).json({ status: 'fail', message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ status: 'fail', message: 'Incorrect password' });

    await User.deleteOne({ _id: user._id });
    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ status: 'fail', message: 'Could not delete user', error: err.message });
  }
};
