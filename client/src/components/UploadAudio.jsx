import React, { useState } from 'react';
import path from 'path';

const UploadAudio = () => {
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };

      const handleSubmitNew = async (e) => {
        e.preventDefault()
    
    
        
        // console.log(path.join( file.name))
        let headersList = {
            "Accept": "*/*",
          
           }
           
           let bodyContent = new FormData();
           bodyContent.append("audio",file);
           
           let response = await fetch("/upload", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.text();
           console.log(data);
           
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.append('file', file);
        const url = 'http://localhost:8080/upload'
        console.log(file)
        fetch(url, {
            method: 'POST',
            body: file,
            // 👇 Set headers manually for single file upload
            headers: {
              'content-type': file.type,
              'content-length': `${file.size}`, // 👈 Headers need to be a string
            },
            
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }
    return (
        <div>
            <form onSubmit={handleSubmitNew} enctype="multipart/form-data">
                <input type="file" name="audio" id="" onChange={handleFileChange}/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default UploadAudio;