import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { storage, db } from './firebase';
import firebase from 'firebase';
import './css/imageUpload.css';

function ImageUpload({username}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleFile = (e) => {
        if(e.target.files[0]){  
            console.log(e.target.files[0]);          
            setImage(e.target.files[0]);
        }
    };
    const clearStates = () => {
        setProgress(0);
        setCaption('');
        setImage(null);
        document.getElementById('file-picker').value = null;
    };

    const handleUpload = () => {
        try {
            
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round (
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //error function
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside database
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption, 
                            url: url,
                            username: username,
                            likes: 0,
                        });
                        
                        clearStates();
                        
                    })
            }
        )
        } catch (error) {
            alert('select an image to upload');
        }        
        
        
    }
    return (
        <div className='image-upload-main'>
                    <progress value={progress} max="100" className='image-progress'/>
                    <input 
                        type="text"
                        placeholder='Enter a caption'
                        onChange={(e)=> setCaption(e.target.value)}
                        value={caption}
                    />
                    <input type="file"
                        onChange={handleFile}
                        id='file-picker'
                    />
                    <Button onClick={handleUpload}>upload</Button>   
        </div>
    )
}

export default ImageUpload
