const Joi = require("@hapi/joi");
let payload;

module.exports.addProductValidation = async (data) => {
  payload = Joi.object().keys({
    product_name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().allow(""),
    user: Joi.object().allow(),
  });

  let schema = await payload.validate(data);
  return schema;
};

module.exports.getProductListValidation = async (data) => {
  payload = Joi.object().keys({
    user: Joi.object().allow(),
    userid: Joi.number().allow(),
    search: Joi.string().allow(),
    skip: Joi.number().allow(),
    limit: Joi.number().allow(),
    productid: Joi.number().allow(),
    view: Joi.number().allow(),
  });

  let schema = await payload.validate(data);
  return schema;
};

module.exports.updateProductValidation = async (data) => {
  payload = Joi.object().keys({
    productid: Joi.number().required(),
    user: Joi.object().allow(),
  });

  let schema = await payload.validate(data);
  return schema;
};
