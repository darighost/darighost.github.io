const express = require('express');
const multer = require('multer');
const path = require('path'); // Require the path module to handle file paths
const sqlite3 = require('sqlite3').verbose();
const WebSocket = require('ws');
const cors = require('cors'); // Import CORS module

const app = express();
const port = 3001;
const http = require('http');
const server = http.createServer(app);
// Use CORS middleware to allow all origins
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Set destination folder for file uploads
  },
  filename: function (req, file, cb) {
    // Create a unique filename with the original extension
    cb(null, Date.now() + path.extname(file.originalname)) // Append the timestamp with the file extension to the filename
  }
});
const upload = multer({ storage: storage });
// Set up SQLite database
const db = new sqlite3.Database('./imageboard.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the imageboard database.');
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject TEXT,
    content TEXT,
    file TEXT,
    address TEXT UNIQUE
  )`);
});

app.post('/posts', upload.single('file'), (req, res) => {
  const { remoteAddress } = req.socket; 
  const { subject, content } = req.body;
  const file = req.file ? req.file.path : null; // Path where the file is saved
  console.log(file)
  db.run(`INSERT INTO posts (subject, content, file, address) VALUES (?, ?, ?, ?)`, [subject, content, file, remoteAddress], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ message: "Post created successfully", id: this.lastID });
    // Broadcast new post to all WebSocket clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ action: 'new_post', data: { subject, content, file } }));
      }
    });
  });
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('A new client connected!');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  // Function to send all posts to a client
  const sendPosts = async () => {
    db.all(`SELECT * FROM posts`, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
      ws.send(JSON.stringify(rows));
    });
  };

  sendPosts(); // Send posts when a client connects

  // Optional: send updates whenever there's a new post or update
  ws.on('new_post', sendPosts);
});

app.use('/uploads', express.static('uploads'));

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

