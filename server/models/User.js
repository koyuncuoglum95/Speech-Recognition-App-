// server/models/User.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
username: { type: String, required: true, unique: true },
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
});

export default mongoose.model('User', UserSchema);