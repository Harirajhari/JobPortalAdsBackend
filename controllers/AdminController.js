import Admin from '../models/AdminModel.js';
import bcrypt from 'bcrypt'; // ✅ match same library as used in model

// GET all admins (optional, safe version)
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Create Admin — do NOT hash manually, model handles it
export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const admin = new Admin({ name, email, password }); // plain password — will be hashed
    await admin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin', error: err.message });
  }
};

// ✅ Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};
