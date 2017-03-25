'use strict';

const mongoose = require('mongoose');
const shortid = require('shortid');
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
  groupId: {
    type: 'String',
    default: shortid.generate
  },
  sid: {
    type: 'String',
    default: shortid.generate
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('post', postSchema);
