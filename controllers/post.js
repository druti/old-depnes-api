const Post = require('../models/post');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
exports.getPosts = function (req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ posts });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
exports.getPost = function (req, res) {
  Post.findOne({ _id: req.params._id }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ post });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
exports.addPost = function (req, res) {
  if (!req.body.post.content || !req.body.post.htmlContent) {
    console.log('missing params'); // eslint-disable-line
    res.status(403).end();
  } else {
    const newPost = new Post(req.body.post);

    parseIn(newPost);

    newPost.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ post: saved });
    });
  }
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
exports.deletePost = function (req, res) {
  Post.findOne({ _id: req.params._id }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}

function parseIn(post) {
  const { ops, authors } = post.content;
  const lastOp = ops[ops.length-1];

  if (!ops[0].insert || !lastOp.insert) {
    console.log('PostId: ', post.id); // eslint-disable-line
    console.log('Operations: \n', ops); // eslint-disable-line
    return new Error('!!!!!!!!!!! Unexpected post content operation');
  }

  ops[0].insert = ops[0].insert.slice(ops[0].insert.indexOf(ops[0].insert.trim())); // trimStart()

  if (!ops[0].insert.trim()) {
    ops.shift();
    authors.shift();
  }

  if (lastOp.insert.endsWith('\n') && lastOp.insert.trim().length) {
    lastOp.insert = lastOp.insert.substring(0, lastOp.insert.lastIndexOf('\n'));
    ops.push({insert: '\n'});
    authors.push(null);
  }
}
