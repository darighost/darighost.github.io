import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './guestbook.css';

function fileToBase64(file, callback) {
  const targetSize = 10240; // Target size in bytes (10 KB)
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = () => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let width = img.width;
      let height = img.height;
      let quality = 0.7; // Start with 70% quality
      canvas.width = width;
      canvas.height = height;

      // Draw image on canvas
      ctx.drawImage(img, 0, 0, width, height);
      let dataUrl = canvas.toDataURL('image/jpeg', quality);

      // While the image size is too large and quality is above 0.1, reduce quality
      while (dataUrl.length * 3/4 > targetSize && quality > 0.1) {
        quality -= 0.05; // Reduce quality by 5%
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      callback(dataUrl); // Callback with the resized image
    };
    img.src = e.target.result;
  };
  reader.onerror = function(error) {
    console.error('Error: ', error);
  };
  reader.readAsDataURL(file);
}


function Guestbook() {
  const [posts, setPosts] = useState([])
  const [filename, setFilename] = useState('');
  const [file, setFile] = useState(null)
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    window.scrollTo = function () {};
  }, [])


  useEffect(() => {
    fetch('https://motluc-nammex.tlon.network/moo')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setPosts(data.content.split('ILOVEJOANBEAZ').filter((e: string) => e.includes('___')));
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }, []);
  
  return (
    <div id="chan" method="GET" style={{overflow: "scroll" }}>
      <header style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 id="title">33chan</h1>
        <p style={{width: '400px', textAlign: 'center'}}><i>an anonymous imageboard</i></p>
        <form onSubmit={async e=>{
            e.preventDefault();
            // upload to backend...
            // Try to upload. If it fails or something's wrong, show an error and call e.preventDefault();
            if (subject === '') {
              alert('Subject field cannot be empty!')
              return;
            }
            if (content === '') {
              alert('Your post is empty!')
              return;
            }
            if (file === null) {
              alert('You must attach a file!')
              return;
            }
            console.log(subject)
            console.log(content)
            console.log(file)
            fetch("https://motluc-nammex.tlon.network/moo", {
              "credentials": "omit",
              "headers": {
                  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0",
                  "Accept": "*/*",
                  "Accept-Language": "en-US,en;q=0.5",
                  "Content-Type": "application/json",
                  "Sec-Fetch-Dest": "empty",
                  "Sec-Fetch-Mode": "cors",
                  "Sec-Fetch-Site": "cross-site",
                  "Priority": "u=4",
                  "Pragma": "no-cache",
                  "Cache-Control": "no-cache"
              },
              "referrer": "http://localhost:3000/",
              "body": JSON.stringify({"ok": `${content}___${subject}___${file}`}),
              "method": "POST",
              "mode": "cors"
          }).then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok: ' + response.statusText);
              }
              return response.json();
          }).then(data => window.location.reload(true))
          .catch(error => {alert('Unable to upload your post (see browser console for more details)');console.error('Fetch error msg lolol:', error.message)});
        }} style={{maxWidth: "fit-content"}}>
        <input name='subject' onChange={e=>setSubject(e.target.value)} value={subject} placeholder='Subject...' type="text"></input><br />
        <textarea name='content' onChange={e=>setContent(e.target.value)} value={content} placeholder='Say hi!' rows={3} cols={25}></textarea><br />
        <input name='file' style={{width: '230px'}} onChange={e=>{if (e.target.files[0].size > 10 * 1024 * 1024) {alert('Image must be smaller than 10 MB!'); return;} setFilename(e.target.value);fileToBase64(e.target.files[0], setFile)}} value={filename} type='file'></input><br />
        <input type='submit' value="Upload"></input>
      </form>
    </header>
    <hr />
    <div className="post-container">
          <div className="post-image-container">
            <img style={{float: 'left', width: '150px', marginRight: '10px'}} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDADUlKC8oITUvKy88OTU/UIVXUElJUKN1e2GFwarLyL6qurfV8P//1eL/5re6////////////zv//////////////2wBDATk8PFBGUJ1XV53/3Lrc////////////////////////////////////////////////////////////////////wAARCAGiAUwDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAPBAAAgECAwUHAgMGBgMBAAAAAAECAxESITEEMkFRkRMUIlJTYXGBoSMzYgU0QnKSwUOCorHR8ERj4fH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACQRAQEAAgICAwEAAwEBAAAAAAABAhESMSEyE0FRAyJDYUIz/9oADAMBAAIRAxEAPwD0zGAAJSwo55SnU0eFFKueQpzzy14iyJOhfWpU6m7uvUqdSmJc0HFHmjG8mtRLuy9Sp1N3ZerU6lcS5rqHEua6jeRpHu3/ALanUPdn61TqWxLm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" />
          </div>
          <div className="post-text">
            <font color='maroon'><b>Subject: </b></font>
            <span className='post-subject'>Sup, WWW!</span><br />
            <span>Hey, welcome to my guestbook! Please take a moment to say hello. I built this using Urbit based on classic imageboards like Futaba Channel!</span>
          </div>
        </div>
    {posts.map(p => {
      const [content, subject, image] = p.split('___')

      return (
        <div className="post-container">
          <div className="post-image-container">
            <img style={{float: 'left', width: '150px', marginRight: '10px'}} src={image.split("'")[0]} />
          </div>
          <div className="post-text">
            <font color='maroon'><b>Subject: </b></font>
            <span className='post-subject'>{subject}</span><br />
            <span>{content.split("'").slice(3).join("'")}</span>
          </div>
        </div>
      )
    })}

    </div>
  );
}

export default Guestbook;
