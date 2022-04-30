const Joi = require("@hapi/joi");
let payload;

module.exports.signUpValidation = async (data) => {
  payload = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.number().required(),
  });

  let schema = await payload.validate(data);
  return schema;
};

module.exports.signInValidation = async (data) => {
  payload = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  let schema = await payload.validate(data);
  return schema;
};

module.exports.updateProfileValidation = async (data) => {
  payload = Joi.object().keys({
    user: Joi.object().allow(),
    first_name: Joi.string().allow(""),
    last_name: Joi.string().allow(""),
    email: Joi.string().allow(""),
    password: Joi.string().allow(""),
  });

  let schema = await payload.validate(data);
  return schema;
};
