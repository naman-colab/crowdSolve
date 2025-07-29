// controllers/authController.js
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// Signup
export const signup = async (req, res) => {
  console.log(req.body); // logs full body, good!

  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ result: user, token });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


// Login
export const login = async (req, res) => {
  console.log("dataa", req.body);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("Found user:", user);

    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ result: user, token });

  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};




// export const