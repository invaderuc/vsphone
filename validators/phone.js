const { check, param } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreatePhone = [
  // Example: name
  check("name")
    .exists()
    .isString()
    .withMessage("Name should be text")
    .not()
    .isEmpty()
    .withMessage("Name is Required")
    .isLength({ max: 32 })
    .withMessage("name must be contain maxium 32 characters"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreatePhone };
