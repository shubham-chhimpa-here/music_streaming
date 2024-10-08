const express = require('express')
const app = express();
const multer = require('multer')
const fs = require('fs');
const { connection } = require('./db');
const Audio = require('./models/Audio');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const cors = require('cors');
const { trackRouter } = require('./routes/track.router.js');

const dirname = path.resolve();
const PORT = 8080;
require('dotenv').config()

app.use(express.json())
app.use(express.static(path.join(dirname, "/client/dist")))
app.use(cors())

let cache = {
  audios: null, // Cache initially empty or null
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/', (req, res) => {
  res.send('hello world')
})


app.use('/image', trackRouter)


app.get('/audios', async (req, res) => {
  try {

    // Check if data is in cache
    if (cache.audios) {
      return res.send({ x: cache.audios });
    }

    // Fetch data from database
    const audios = await Audio.find()

    // Store data in cache
    cache.audios = audios;

    res.send({ x: audios })

  } catch (error) {
    res.send({ msg: 'something went wrong' })
  }

})


const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('audio'), async (req, res) => {



  try {
    console.log('body', req.body)
    console.log("file", req.file)
    const path = req.file.path;
    console.log(req.file.path)
    const result = await cloudinary.uploader.upload(path, {
      resource_type: 'video',  // Use 'video' for audio files in Cloudinary
      folder: 'audio_files',
    });

    // console.log(result)

    // Delete the file after uploading to Cloudinary
    fs.unlinkSync(path);

    const newAudio = new Audio({ url: result.secure_url });
    await newAudio.save();

    // Invalidate cache
    cache.audios = null;

    res.status(200).json({ msg: 'audio saved', audio: newAudio });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload audio', msg: error.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "client", "dist", "index.html"))
})

app.listen(PORT, () => {

  connection(process.env.MONGO_URI)
  console.log(`server is running on port ${PORT}`)
})

