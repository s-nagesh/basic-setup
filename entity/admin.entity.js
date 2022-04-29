const sqlCmds = require("../utility/sqlcmds");
const validation = require("../validation/admin.validation");
const apiController = require("../utility/apiController");
const tokenHelper = require("../utility/tokenHelper");

module.exports.signUp = async (data) => {
  try {
    const { error } = await validation.signUpValidation(data);
    if (error) {
      return error.details[0].message;
    }
    let { first_name, last_name, email, role, password } = data;
    let type = role == 1 ? "Admin" : "User";
    if (role == 1) {
      let exist_admin_role = `SELECT email FROM user WHERE role = 1`;
      let exist_admin_role_response = await sqlCmds.getOne(exist_admin_role);

      if (exist_admin_role_response)
        return apiController.respondBad("Admin is already exist");
    }

    let query = `SELECT * FROM user WHERE email ='${email}'`;
    let query_result = await sqlCmds.getOne(query);

    if (query_result)
      return apiController.respondBad("email is already register");

    password = await tokenHelper.generateToken(password);
    let full_name = `${first_name} ${last_name}`;

    let createdat = new Date().toISOString();
    let params = [
      `${first_name}`,
      `${last_name}`,
      `${full_name}`,
      `${email}`,
      `${password}`,
      role,
      1,
      0,
      createdat,
    ];
    let sql = `INSERT INTO user (first_name,last_name,full_name,email,password,role,isactive,isdeleted,created_at) VALUES (?) `;

    let result = await sqlCmds.addRecords(sql, [params]);

    return apiController.respondPost({
      lastInsertedId: result.lastInsertedId,
      message: `${type} added successfully`,
    });
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};

module.exports.signIn = async (data) => {
  try {
    const { error } = await validation.signInValidation(data);
    if (error) {
      return error.details[0].message;
    }
    let { email, password } = data;

    let check_login = `SELECT * FROM user WHERE email = '${email}' and isactive = 1`;
    let check_loginresult = await sqlCmds.getOne(check_login);
    if (!check_loginresult) {
      return apiController.respondBad("email is invalid");
    }

    let save_password = tokenHelper.validateToken(check_loginresult.password);
    if (password != save_password) {
      return apiController.respondBad("password is doesn't match");
    }
    let user = {
      id: check_loginresult.id,
      full_name: check_loginresult.full_name,
      email: check_loginresult.email,
      role: check_loginresult.role,
      isactive: check_loginresult.isactive,
    };

    let token = await tokenHelper.generateToken(user);

    return apiController.respondPost({
      data: user,
      token: token,
    });
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};
