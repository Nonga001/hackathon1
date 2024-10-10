const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');  // Corrected the case here
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
 
// Create a database connection
mongoose.connect(
    'mongodb+srv://junami:mongodb1234%23@hac.wc3op.mongodb.net/'
)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('DB connection error:', error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma'
    ],
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
