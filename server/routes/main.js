const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Routes
router.get('/', async (req, res) => {
  try {
    const locals = {
      title: 'NodeJs Blog',
      description: 'Simple Bolg created with NodeJs, Express and NodeJs',
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    res.render('post', { data });
  } catch (error) {
    console.log(error);
  }
});

// Implementing the search logic
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: 'Search',
      description: 'Searching...',
    };

    let searchTerm = req.body.searchTerm;
    const noSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, '');
    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(noSpecialChar, 'i') } },
        { body: { $regex: new RegExp(noSpecialChar, 'i') } },
      ],
    });

    res.render('search', { data, locals });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
