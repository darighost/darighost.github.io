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
