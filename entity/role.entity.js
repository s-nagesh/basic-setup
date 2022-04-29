const sqlCmds = require("../utility/sqlcmds");
const validation = require("../validation/role.validation");
const apiController = require("../utility/apiController");

module.exports.addRole = async (data) => {
  try {
    let { error } = await validation.addRoleValidation(data);
    if (error) {
      return error.details[0].message;
    }
    let { rolename } = data;
    let query = `SELECT rolename FROM role WHERE rolename = '${rolename}'`;
    let query_result = await sqlCmds.getOne(query);
    if (query_result) return "role are alredy exist";
    let insert_query = `INSERT INTO role (rolename) VALUES('${rolename}')`;
    let response = await sqlCmds.addRecords(insert_query);
    return apiController.respondPost({
      lastInsertId: response.lastInsertId,
      message: "Role added successfully",
    });
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};

module.exports.getRole = async (data) => {
  try {
    let { error } = await validation.getRoleValidation(data);

    if (error) {
      return error.details[0].message;
    }
    let { roleid, keyword } = data;
    let sqlQuery = "";
    let condition = "";
    if (roleid) {
      sqlQuery = ` id = ${roleid}`;
      condition += condition != "" ? ` AND ${sqlQuery}` : sqlQuery;
    }
    if (keyword) {
      sqlQuery = ` rolename like '%${keyword}%'`;
      condition += condition != "" ? ` AND ${sqlQuery}` : sqlQuery;
    }
    let query = `SELECT * FROM role `;
    query += condition != "" ? ` WHERE ${condition}` : "";
    let query_result = await sqlCmds.getMany(query);
    return apiController.respondGet(query_result);
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};

module.exports.updateRole = async (data) => {
  try {
    let { error } = await validation.updateRoleValidation(data);

    if (error) {
      return error.details[0].message;
    }
    let { roleid, rolename } = data;
    let query = `SELECT rolename FROM role WHERE rolename = '${rolename}'`;
    let query_result = await sqlCmds.getOne(query);
    if (query_result) return "role are alredy exist";
    let update_query = `UPDATE role SET rolename ='${rolename}' WHERE id =${roleid}`;
    await sqlCmds.updateRecords(update_query);
    return apiController.respondPut("role update successfully");
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};

module.exports.deleteRole = async (data) => {
  try {
    let { error } = await validation.deleteRoleValidation(data);

    if (error) {
      return error.details[0].message;
    }
    let { roleid } = data;
    let query = `SELECT id FROM role WHERE id = ${roleid}`;
    let query_result = await sqlCmds.getOne(query);
    if (!query_result) return "role are does't exist";
    let delete_query = `DELETE FROM role WHERE id = ${roleid} `;
    await sqlCmds.deleteRecords(delete_query);
    return apiController.respondDelete("role deleted successfully");
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};
