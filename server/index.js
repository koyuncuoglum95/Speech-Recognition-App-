import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/User.js';
import multerRoutes from './routes/Multer.js';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/speech-recognition-app', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
res.send('Welcome to the speech recognition app!');
});

app.use(userRoutes);
app.use(multerRoutes);

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));