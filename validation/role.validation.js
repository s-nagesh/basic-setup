const Joi = require("@hapi/joi");
let payload;

module.exports.addRoleValidation = async (data) => {
  payload = Joi.object().keys({
    rolename: Joi.string().required(),
  });

  let schema = await payload.validate(data);
  return schema;
};

module.exports.getRoleValidation = async (data) => {
  payload = Joi.object().keys({
    roleid: Joi.number().allow(""),
    keyword: Joi.string().allow(""),
  });

  let schema = await payload.validate(data);
  return schema;
};

module.exports.updateRoleValidation = async (data) => {
  payload = Joi.object().keys({
    roleid: Joi.number().required(),
    rolename: Joi.string().required(),
  });

  let schema = await payload.validate(data);
  return schema;
};

module.exports.deleteRoleValidation = async (data) => {
  payload = Joi.object().keys({
    roleid: Joi.number().allow(""),
  });

  let schema = await payload.validate(data);
  return schema;
};
