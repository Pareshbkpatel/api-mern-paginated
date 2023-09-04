/*-----------------------------------------------------------------------
            File: server.js
         Purpose: Create A Paginated API With Node.js - Complete Tutorial 
          Author: Paresh B. Patel
          Mentor: Kyle https://www.youtube.com/watch?v=ZX3qt0UWifc 
      2021-07-05: Created
      2021-07-07: Added support for People & Restuarants collections
      2021-07-15: Reviewed Code 
      2021-09-14: Reviewed Code 
      2022-01-03: Re-Visited  
      2022-01-31: Prepared for deployment to Heroku  
      2022-02-16: Added cors support  
      2022-10-12: Re-visited  
      2022-10-17: Added contacts model  
      2022-11-02: added "type": "Module" to package.json  
      2022-11-04: paginatedRouter   
-----------------------------------------------------------------------*/
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import User from './models/userModel.js'; // For Data Generation

import paginatedRouter from './routes/paginatedRouter.js';

const app = express();
dotenv.config({ path: '.env' });
app.use(cors());

// ------
// Routes
// ------

// Root Route
app.get('/', (req, res) => {
  try {
    res.json('Success: api-paginated running...');
  } catch (error) {
    res.status(500).json({ message: error.message }); // Status 500 Server Error
  }
});

app.use('/', paginatedRouter);

// -------------------
// Connect to Database
// -------------------
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
console.log('Database Connection Active');

// -----------------------------------------------------
// Execute this once to create data if it does not exist
// -----------------------------------------------------
db.once('open', async () => {
  if ((await User.countDocuments().exec()) > 0) return;

  Promise.all([
    User.create({ name: 'User 1' }),
    User.create({ name: 'User 2' }),
    User.create({ name: 'User 3' }),
    User.create({ name: 'User 4' }),
    User.create({ name: 'User 5' }),
    User.create({ name: 'User 6' }),
    User.create({ name: 'User 7' }),
    User.create({ name: 'User 8' }),
    User.create({ name: 'User 9' }),
    User.create({ name: 'User 10' }),
    User.create({ name: 'User 11' }),
    User.create({ name: 'User 12' })
  ]).then(() => console.log('Added 12 Users...'));
});

// ------------
// Start Server
// ------------
const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}...`)
);
