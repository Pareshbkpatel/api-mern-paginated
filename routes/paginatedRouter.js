import express from 'express';

import User from '../models/userModel.js';
import Blog from '../models/blogModel.js';
import Surname from '../models/surnameModel.js';
import Person from '../models/peopleModel.js';
import Contact from '../models/contactModel.js';
import Restaurant from '../models/restaurantModel.js';

const router = express.Router();

// Page of Users
router.get('/users', paginatedResults(User), (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Status 500 Server Error
  }
});

// Page of Blogs
router.get('/blogs', paginatedResults(Blog), (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Status 500 Server Error
  }
});

// Page of Surnames
router.get('/surnames', paginatedResults(Surname), (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Status 500 Server Error
  }
});

// Page of People
router.get('/people', paginatedResults(Person), (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Status 500 Server Error
  }
});

// Page of Contacts
router.get('/contacts', paginatedResults(Contact), (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Status 500 Server Error
  }
});

// Page of Restaurants
router.get('/restaurants', paginatedResults(Restaurant), (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Status 500 Server Error
  }
});

/* ---------------------------------------------------
   Middleware function (always takes:  req, res, next)
   ---------------------------------------------------*/
function paginatedResults(model) {
  return async (req, res, next) => {
    //
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit; // page 1 @ 0
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

export default router;
