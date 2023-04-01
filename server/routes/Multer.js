import path from 'path';
import multer from 'multer';
import express from 'express';
import Recording from '../models/Recording.js';

const router = express.Router();


// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


// Define route for uploading recordings
router.post('/api/upload', upload.single('audio'), async (req, res) => {
    try {
      const recording = new Recording({
        transcription: req.body.transcription,
        audioUrl: `/uploads/${req.file.filename}`,
        userId: req.user._id,
      });
      await recording.save();
      res.status(201).send('Recording saved successfully');
    } catch (err) {
      res.status(400).send('Error saving recording');
    }
  });


// Define route for fetching recordings
router.get('/api/recordings', async (req, res) => {
  try {
    const recordings = await Recording.find({ userId: req.user._id });
    res.json(recordings);
  } catch (err) {
    res.status(500).send('Error fetching recordings');
  }
});



  export default router;