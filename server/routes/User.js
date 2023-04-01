import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Define routes for user authentication
router.post('/api/register', async (req, res) => {
  try {
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a user object with the hashed password
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })

    // Save the user object to your database
    await newUser.save();

    res.status(201).send('User created successfully');
  } catch (err) {
    res.status(400).send('Error creating user');
  }
});


router.post('/api/login', async (req, res) => {
  try {
    // Find the user in your database
    const user = await User.findOne({ username: req.body.username });

    // Compare the provided password with the hashed password in the database using bcrypt
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
      // Generate a JWT token and send it to the client
      const token = jwt.sign({ username: user.username }, 'secret');
      res.send({ token });
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/api/logout', (req, res) => {
  // Clear the session and JWT token
  res.send('Logged out successfully');
});


export default router;
