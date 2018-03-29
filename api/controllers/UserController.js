/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return ResponseService.json(401, res, "Password doesn't match");
    }

    var allowedParameters = ["email", "password"];

    var data = _.pick(req.body, allowedParameters);

    User.create(data)
      .then(function(user) {
        var responseData = {
          user: user,
          token: JwtService.issue({ id: user.id })
        };
        return ResponseService.json(
          200,
          res,
          "User created successfully",
          responseData
        );
      })
      .catch(function(error) {
        if (error.invalidAttributes) {
          return ResponseService.json(
            400,
            res,
            "User could not be created, man. I'm so sorry",
            error.Errors
          );
        }
      });
  }
};
