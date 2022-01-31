/* -----------------------------------------------------------------------
            File: server.js
         Purpose: Create A Paginated API With Node.js - Complete Tutorial 
          Mentor: Kyle https://www.youtube.com/watch?v=ZX3qt0UWifc 
      2021-07-05: Created
      2021-07-07: Added support for People & Restuarants collections
      2021-07-15: Reviewed Code 
      2021-09-14: Reviewed Code 
      2022-01-03: Re-Visited  
      2022-01-31: Prepared fort deployment to Heroku  
   ---------------------------------------------------------------------*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

// const PORT = 3000;
// const DB_URL =
//   'mongodb+srv://netninja:test1234@cluster0.rmixe.mongodb.net/node-tuts?retryWrites=true&w=majority';

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

// ------
// Models
// ------
const User = require('./models/users');
const Blog = require('./models/blogs');
const Surname = require('./models/surnames');
const Person = require('./models/people');
const Restaurant = require('./models/restaurants');

// -------------------
// Connect to database
// -------------------

// mongoose.connect(
//   'mongodb+srv://netninja:test1234@cluster0.rmixe.mongodb.net/node-tuts?retryWrites=true&w=majority',
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
console.log('MongoDB Connection Active');

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
// -----------------------------------------------------

// ======
// Routes
// ======

// Root
app.get('/', (req, res) => {
  try {
    res.json('Success: Backend Running...');
  } catch (error) {
    res.status(500).json({ message: error.message }); // Status 500 Server Error
  }
});

// Page of Users
app.get('/users', paginatedResults(User), (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Status 500 Server Error
  }
});

// Page of Blogs
app.get('/blogs', paginatedResults(Blog), (req, res) => {
  res.json(res.paginatedResults);
});

// Page of Surnames
app.get('/surnames', paginatedResults(Surname), (req, res) => {
  res.json(res.paginatedResults);
});

// Page of People
app.get('/people', paginatedResults(Person), (req, res) => {
  res.json(res.paginatedResults);
});

// Page of Restaurants
app.get('/restaurants', paginatedResults(Restaurant), (req, res) => {
  res.json(res.paginatedResults);
});

// ===================================================
// Middleware function (always takes:  req, res, next)
// ===================================================
function paginatedResults(model) {
  return async (req, res, next) => {
    //
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    //  Avoid Page Overflow
    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1, // Next page
        limit: limit
      };
    }

    // Avoid Page Underflow
    if (startIndex > 0) {
      results.previous = {
        page: page - 1, // Previous page
        limit: limit
      };
    }

    // Results Section
    try {
      results.results = await model
        .find()
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

// =========================
// Listen on Specified Port#
// =========================
app.listen(PORT);
console.log(`Server Listening on Port# ${PORT}`);
