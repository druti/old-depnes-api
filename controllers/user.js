const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;

//= =======================================
// User Routes
//= =======================================
exports.viewProfile = function (req, res, next) {
  const userId = req.params.userId;

  User.findOne({ sid: userId }, (err, user) => {
    if (err) {
      res.status(500).json(err);
      return next(err);
    }
    if (!user) {
      return res.status(404).json({ reason: 'User not found' });
    }

    const userToReturn = setUserInfo(user);

    return res.status(200).json({ user: userToReturn });
  });
};
