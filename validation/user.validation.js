const Joi = require("@hapi/joi");
let payload;

module.exports.getAllUserValidation = async (data) => {
  payload = Joi.object().keys({
    user: Joi.object().allow(),
    skip: Joi.number().allow(),
    limit: Joi.number().allow(),
    search: Joi.string().allow(),
    userid: Joi.string().allow(),
  });

  let schema = await payload.validate(data);
  return schema;
};

module.exports.updateUserByAdminValidation = async (data) => {
  payload = Joi.object().keys({
    user: Joi.object().allow(),
    userid: Joi.number().allow(),
    first_name: Joi.string().allow(""),
    last_name: Joi.string().allow(""),
    email: Joi.string().allow(""),
    password: Joi.string().allow(""),
    isactive: Joi.number().allow(),
  });

  let schema = await payload.validate(data);
  return schema;
};
