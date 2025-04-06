# Audio Transcription App

A React-based web application for recording and transcribing audio locally using the Whisper model (`Xenova/whisper-tiny.en`) from the `@xenova/transformers` library. The app uses Web Workers for efficient transcription processing and provides real-time progress updates.

## Features
- Record audio directly in the browser.
- Transcribe audio to text with timestamps using Whisper.
- Display transcription results in a simple UI.
- Progress indicators for model downloading and transcription.

## Prerequisites
- **Node.js**: Version 16.x or higher (download from [nodejs.org](https://nodejs.org/)).
- **npm**: Version 8.x or higher (comes with Node.js).
- A modern browser (Chrome, Firefox, Edge) with Web Audio API support.
- An internet connection (for initial model download).

## Setup Instructions

1. **Navigate to the Project Directory**
   - Open a terminal and change to the folder containing the project files:
     ```
     cd path/to/your/project
     ```

2. **Install Dependencies**
   - Run the following command to install required packages:
     ```
     npm install
     ```
   - This installs React, `@xenova/transformers`, and other dependencies.

3. **Start the Application**
   - Launch the development server:
     ```
     npm start
     ```
   - The app will open in your default browser at `http://localhost:3000` (or another port if 3000 is in use).

## Using the App Locally

### Record Audio
1. On the homepage, click **Start Recording** to capture audio via your microphone.
2. Click **Stop Recording** to finish. The recorded audio will appear in the interface.

### Transcribe Audio
1. Click **Transcribe** to process the audio.
2. The app will download the Whisper model (if not already cached) and transcribe the audio, showing progress like "DOWNLOADING" and "LOADING".

### View Results
- After transcription completes, the text output with timestamps will be displayed.

## Technical Details
- **Frontend**: Built with React using hooks (`useState`, `useEffect`, `useRef`).
- **Transcription**: Uses `@xenova/transformers` with the Xenova/whisper-tiny.en model in a Web Worker.
- **Audio Processing**: Converts `audio/webm` recordings to `Float32Array` (16kHz PCM) for Whisper compatibility.
- **Model Size**: Approximately 39MB, downloaded on first use.

## Troubleshooting

### "Stuck on DOWNLOADING"
- **Cause**: The app is downloading the Whisper model from Hugging Face, which can take time on a slow connection.
- **Fix**:
  - Wait a few minutes (model is ~39MB).
  - Check your internet connection.
  - Open the browser’s DevTools (Network tab) to monitor download progress.

### "Whisper did not predict an ending timestamp"
- **Cause**: Audio is too short or cut off mid-word.
- **Fix**:
  - Record at least 5–10 seconds of audio.
  - Check the console for audio length (seconds) from `App.jsx`. If <1 second, record longer.

### "Invalid audio input: Expected Float32Array"
- **Cause**: Audio conversion failed.
- **Fix**:
  - Ensure your browser supports `audio/webm` recording.
  - Check console logs in `App.jsx` for converted audio output.

## Optional: Local Model Setup

To avoid downloading the model from the internet:

1. Download the Xenova/whisper-tiny.en files from Hugging Face (`model.safetensors`, `config.json`, etc.).
2. Place them in a folder like `public/static/models/whisper-tiny.en/`.
3. Edit `whisper.worker.js`:
    ```
    this.instance = await pipeline(this.task, null, {
        progress_callback,
        local_files: true,
        model_path: '/static/models/whisper-tiny.en/'
    });
    ```
4. Restart the app (`npm start`).

## Notes
- The first transcription may take longer due to model downloading.
- Ensure your microphone is enabled in the browser when recording.
- For development, use React DevTools for better debugging (install from reactjs.org).

## Acknowledgments
- Built with React.
- Powered by Transformers.js.
- Uses OpenAI’s Whisper model via Xenova’s implementation.
