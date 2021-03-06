const res = require("./response");

module.exports = {
  respondGet: function (data = null) {
    return this.respond({
      success: true,
      code: res.HTTP_OK,
      message: "Ok",
      data: data,
    });
  },
  respondPost: function (data = null) {
    return this.respond({
      success: true,
      code: res.HTTP_CREATED,
      message: "Created",
      data: data,
    });
  },
  respondPut: function (data = null) {
    return this.respond({
      success: true,
      code: res.HTTP_ACCEPTED,
      message: "Updated",
      data: data,
    });
  },
  respondDelete: function (message = "Deleted") {
    return this.respond({
      success: true,
      code: res.HTTP_OK,
      message: message,
    });
  },
  respondBad: function (message = "Bad Request") {
    return this.respond({
      success: false,
      code: res.HTTP_BAD_REQUEST,
      message: message,
      data: [],
    });
  },
  respondNotFound: function (message = "Not Found") {
    return this.respond({
      success: false,
      code: res.HTTP_NOT_FOUND,
      message: message,
      data: [],
    });
  },
  respondUnauthorized: function (message = "Invalid Token") {
    return this.respond({
      success: false,
      code: res.HTTP_UNAUTHORIZED,
      message: message,
      data: [],
    });
  },
  respondForbidden: function (message = "Forbidden") {
    return this.respond({
      success: false,
      code: res.HTTP_FORBIDDEN,
      message: message,
      data: [],
    });
  },

  respondError: function (err) {
    return this.respond({
      success: false,
      code: res.HTTP_INTERNAL_SERVER_ERROR,
      message: err,
      data: [],
    });
  },

  respond: function (data) {
    return data;
  },
};
