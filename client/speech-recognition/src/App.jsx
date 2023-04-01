// client/src/App.js (continued)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [transcription, setTranscription] = useState('');
  const [recording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      const response = await axios.get('/api/recordings');
      setRecordings(response.data);
      console.log(recordings);
    };
    fetchRecordings();
  }, []);

  const startRecording = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      setTranscription(event.results[0][0].transcript);
      setRecording(false);
    };
    recognition.start();
    setRecording(true);
  };

  const stopRecording = () => {
    window.webkitSpeechRecognition.stop();
    setRecording(false);
  };

  const uploadAudio = async (audio) => {
    const formData = new FormData();
    formData.append('audio', audio);
    formData.append('transcription', transcription);
    await axios.post('/api/upload', formData);
    const response = await axios.get('/api/recordings');
    setRecordings(response.data);
  };

  return (
    <div className="App">
      <h1>Speech Recognition App</h1>
      <div>
        <button onClick={startRecording} disabled={recording}>
          Start recording
        </button>
        <button onClick={stopRecording} disabled={!recording}>
          Stop recording
        </button>
      </div>
      <div>
        <textarea value={transcription} onChange={() => {}}/>
      </div>
      <div>
        <input type="file" onChange={(event) => uploadAudio(event.target.files[0])} />
      </div>
      <div>
        {recordings.map((recording) => (
          <div key={recording._id}>
            <audio src={recording.audioUrl} controls />
            <p>{recording.transcription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
