const AppError = require("../utils/AppError");

// Takes a zod schema, returns middleware that checks req.body against it
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((i) => i.message).join(", ");
    return next(new AppError(400, "VALIDATION_ERROR", message));
  }
  req.body = result.data; // cleaned, validated data
  next();
};

module.exports = validate;