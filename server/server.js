const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD
const cookieParser = require('cookie-parser');  // Corrected the case here
const cors = require('cors');

// Create a database connection
mongoose.connect(
    "mongodb+srv://junami:mongodb1234%23@hac.wc3op.mongodb.net/"
).then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));
=======
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Create a db connection
mongoose.connect('mongodb+srv://junami:mongodb1234%23@hac.wc3op.mongodb.net/')
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log("DB connections error:",error));
>>>>>>> db0bd1a (server)

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
<<<<<<< HEAD
    cors({
        origin: 'http://localhost:5173/',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
=======
  cors({
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      "Content-Type",
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma'
    ],
    credentials: true
  })
>>>>>>> db0bd1a (server)
);

app.use(cookieParser());
app.use(express.json());

<<<<<<< HEAD
app.listen(PORT, () => console.log(`Server is now running on Port ${PORT}`));
=======
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
>>>>>>> db0bd1a (server)
