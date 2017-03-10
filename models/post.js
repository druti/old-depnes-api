'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: 'Object',
    required: true
  },
  htmlContent: {
    type: 'String',
    required: true
  },
}, {
  timestamps: true
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
