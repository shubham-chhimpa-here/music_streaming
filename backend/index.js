const express = require('express')
const app = express();
const multer = require('multer')
const fs = require('fs');
const { connection } = require('./db');
const Audio = require('./models/Audio');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const cors = require('cors')

const __dirname=path.resolve();
const PORT = 8080;
require('dotenv').config() 


app.use(express.static(path.join(__dirname,"/client/dist")))
app.use(cors())
console.log(process.env.hello)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.get('/',(req,res) => {
    res.send('hello world')
})

app.get('/audios', async (req, res) => {
    try {
        const x = await Audio.find()
        res.send({x})
        
    } catch (error) {
        res.send({msg: 'something went wrong'})
    }

})

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('audio'), async (req, res) => {
  const path = req.file.path; 

  try {
    const result = await cloudinary.uploader.upload(path, {
      resource_type: 'video',  // Use 'video' for audio files in Cloudinary
      folder: 'audio_files',
    });

    // Delete the file after uploading to Cloudinary
    fs.unlinkSync(path);

    const newAudio = new Audio({ url: result.secure_url });
    await newAudio.save();

    res.status(200).json({ msg: 'audio saved', audio: newAudio });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload audio', msg: error.message });
  }
});

app.get("*",(req,res)=>
    {
        res.sendFile(path.join(__dirname,"client","dist","index.html"))
    })

app.listen(PORT, () => {
    
    connection(process.env.MONGO_URI)
    console.log(`server is running on port ${PORT}`)
})

