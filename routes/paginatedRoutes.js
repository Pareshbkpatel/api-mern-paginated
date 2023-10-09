import express from 'express';

import User from '../models/User.js.js';
import Blog from '../models/Blog.js';
import Surname from '../models/Surname.js';
import Person from '../models/People.js';
import Contact from '../models/Contact.js';
import Restaurant from '../models/Restaurant.js';

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
    const results = {};

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit; // page 1 @ 0
    const endIndex = parseInt(page * limit);

    const documentCount = await model.countDocuments().exec();
    const pageCount = Math.ceil(documentCount / limit);

    const oMetaData = {
      documentCount: documentCount,
      pageCount: pageCount,
      pageSize: limit
    };

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Append Page info to oMetaData
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Append prevPage - (Avoid Page Underflow)
    if (startIndex > 0) {
      Object.assign(oMetaData, { prevPage: page - 1 });
    }

    // nextPage - (Avoid Page Overflow)
    if (endIndex < documentCount) {
      Object.assign(oMetaData, { nextPage: page + 1 });
    }

    // Meta-Data Section
    // ~~~~~~~~~~~~~~~~~
    results.metaData = oMetaData;

    // Results Section
    // ~~~~~~~~~~~~~~~
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
