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
      2023-10-10: revisited code    
-----------------------------------------------------------------------*/
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import paginatedRoutes from './routes/paginatedRoutes.js';

const app = express();
dotenv.config({ path: '.env' });
app.use(cors());

const port = process.env.PORT || 8080;
const dbURL = process.env.DB_URL;

// ------
// Routes
// ------

// Root Route
app.get('/', (req, res) => {
  try {
    res.json('Success: api-mern-paginated running... v:[2023-10-10]');
  } catch (error) {
    res.status(500).json({ message: error.message }); // Status 500 Server Error
  }
});

// Other Routes
app.use('/', paginatedRoutes);

// -------------------
// Connect to Database
// -------------------
let dateTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
///let dateTime = new Date().toLocaleString({ timeZone: 'UTC' });

///mongoose.set('strictQuery', true); // prepare for Mongoose 7 - We are using v7.6.0
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => console.error(error));
db.once('open', () => console.log(`[${dateTime}] - Database Connected...`));
console.log('Database Connection Active');

// ------------
// Start Server
// ------------
app.listen(port, () => {
  console.log(`[${dateTime}] - Server is listening on Port: ${port}...`);
});
