const User = require("./../models/userModel.js");

exports.findUserByUsername = (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  User.retrieveByUsername(username, password, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.status(200).json(data);
  });
};
