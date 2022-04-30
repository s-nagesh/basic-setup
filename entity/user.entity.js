const sqlCmds = require("../utility/sqlcmds");
const validation = require("../validation/user.validation");
const apiController = require("../utility/apiController");
const tokenHelper = require("../utility/tokenHelper");

module.exports.getAllUser = async (data) => {
  try {
    const { error } = await validation.getAllUserValidation(data);
    if (error) {
      return error.details[0].message;
    }
    let { skip = 0, limit = 10, userid, search } = data;
    let { id } = data.user;

    let sqlQuery = "";
    let condition = "";

    if (userid) {
      sqlQuery = ` id IN ('${userid.split(",").join("','")}')`;
      condition += condition != "" ? ` AND ${sqlQuery}` : sqlQuery;
    }
    if (search) {
      sqlQuery = ` full_name LIKE '%${search}%'`;
      condition += condition != "" ? ` AND ${sqlQuery}` : sqlQuery;
    }

    let query = `SELECT * FROM user WHERE id !=${id}`;
    query += condition != "" ? ` and ${condition}` : "";
    let countquery = `select count(re.id) as totalCount from (${query}) re`;
    query += ` ORDER BY id DESC `;
    query += `LIMIT ${skip}, ${limit}`;
    let query_result = await sqlCmds.getMany(query);
    let totalCount = await sqlCmds.getMany(countquery);
    let fresult = {
      totalCount: totalCount[0].totalCount,
      data: query_result,
    };
    return apiController.respondGet(fresult);
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};

module.exports.getUserDetails = async (data) => {
  try {
    let { id } = data.user;
    let sql = `select * from user where id = ${id}`;
    let response = await sqlCmds.getOne(sql);
    return apiController.respondGet(response);
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};

module.exports.updateUserByAdmin = async (data) => {
  try {
    const { error } = await validation.updateUserByAdminValidation(data);
    if (error) {
      return error.details[0].message;
    }

    let { userid, first_name, last_name, email, password, isactive } = data;
    let { id, role } = data.user;
    let query;
    let update_query;
    if (role == 2) {
      query = `SELECT * FROM user WHERE  id = ${id}`;
      update_query = `update user set first_name = ?,last_name = ?,full_name = ?,email = ?,password = ?,isactive = ? ,created_at = ? where id = ${id} `;
    } else {
      query = `SELECT * FROM user WHERE  id = ${id}`;
      update_query = `update user set first_name = ?,last_name = ?,full_name = ?,email = ?,password = ?,isactive = ? ,created_at = ? where id = ${userid} `;
    }
    let query_result = await sqlCmds.getOne(query);

    if (!query_result) return apiController.respondBad("User does't exist");

    password = await tokenHelper.generateToken(password);
    let full_name = `${first_name} ${last_name}`;
    let createdat = new Date().toISOString();
    let params = [
      `${first_name}` ? `${first_name}` : query_result.first_name,
      `${last_name}` ? `${last_name}` : query_result.last_name,
      `${full_name}` ? `${full_name}` : query_result.full_name,
      `${email}` ? `${email}` : query_result.email,
      `${password}` ? `${password}` : query_result.password,
      isactive ? isactive : query_result.isactive,
      createdat,
    ];

    await sqlCmds.updateRecords(update_query, params);
    return apiController.respondPut(`updated successfully`);
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};

module.exports.deleteUser = async (data) => {
  try {
    let { userid } = data;
    let sql = `update user set isdeleted = 1 , isactive = 0 where id IN ('${userid
      .split(",")
      .join("','")}')`;
    await sqlCmds.updateRecords(sql);
    return apiController.respondGet("User deleted successfully");
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};
