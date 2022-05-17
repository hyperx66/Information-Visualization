var con = require("./../db.js");

var User = function (user) {
  this.userName = user.userName;
};

User.retrieveByUsername = (username, password, result) => {
  con.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, res) => {
      if (err) {
        console.log("Error Message: ", err);
        result(err, null);
        return;
      } else {
        result(null, { userId: "nani" });
      }
    }
  );
};

module.exports = User;
