const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('', async (req, res) => {
  try {
    const locals = {
      title: 'Admin',
    };
    res.render('admin/index', locals);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
