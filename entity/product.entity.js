const sqlCmds = require("../utility/sqlcmds");
const validation = require("../validation/product.validation");
const apiController = require("../utility/apiController");

module.exports.addProduct = async (data) => {
  try {
    let { error } = await validation.addProductValidation(data);
    if (error) {
      return error.details[0].message;
    }
    let { product_name, price, description } = data;
    let { id } = data.user;
    let createdat = new Date().toISOString();
    let params = [product_name, price, description || "", 1, id, createdat];
    let insert_query = `INSERT INTO product (product_name,price,description,view,userid,created_at) VALUES (?)`;
    await sqlCmds.addRecords(insert_query, [params]);
    return apiController.respondPost({
      message: "Product added successfully",
    });
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};

module.exports.getProductList = async (data) => {
  try {
    const { error } = await validation.getProductListValidation(data);
    if (error) {
      return error.details[0].message;
    }
    let { skip = 0, limit = 10, userid, search, productid, view } = data;
    let { id, role } = data.user;

    let sqlQuery = "";
    let condition = "";
    let query;
    if (userid && role == 1) {
      sqlQuery = ` userid = ${userid}`;
      condition += condition != "" ? ` AND ${sqlQuery}` : sqlQuery;
    }
    if (search) {
      sqlQuery = ` product_name LIKE '%${search}%' or description LIKE '%${search}%'`;
      condition += condition != "" ? ` AND ${sqlQuery}` : sqlQuery;
    }
    if (productid) {
      sqlQuery = ` id = ${productid}`;
      condition += condition != "" ? ` AND ${sqlQuery}` : sqlQuery;
    }

    if (view) {
      sqlQuery = ` view = ${view}`;
      condition += condition != "" ? ` AND ${sqlQuery}` : sqlQuery;
    }
    if (role == 1) {
      query = ` SELECT * FROM product where 1 `;
    } else {
      query = `SELECT * FROM product where 1 and userid = ${id}`;
    }

    query += condition != "" ? ` and ${condition}` : "";
    let countquery = `select count(re.id) as totalCount from (${query}) re`;
    query += ` ORDER BY id DESC `;
    query += `LIMIT ${skip}, ${limit}`;
    console.log(query);
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

module.exports.updateProduct = async (data) => {
  try {
    let { userid, product_name, price, description, productid, view } = data;
    let { id, role } = data.user;
    let sql;
    if (role == 1 && userid) {
      sql = `update product set product_name = ?,price = ?,description = ?,view = ?,created_at = ? where userid = ${userid} and id = ${productid}`;
    } else {
      sql = `update product set product_name = ?,price = ?,description = ?,view = ?,created_at = ? where id = ${productid} and userid = ${id}`;
    }
    let query = `select * from product where id = ${productid}`;
    let response = await sqlCmds.getOne(query);
    let createdat = new Date().toISOString();
    let params = [
      product_name ? product_name : response.product_name,
      price ? price : response.price,
      description ? description : response.description,
      view ? view : response.view,
      createdat,
    ];
    await sqlCmds.updateRecords(sql, params);
    return apiController.respondPost({
      message: "Product updated successfully",
    });
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};

module.exports.deleteProduct = async (data) => {
  try {
    let { productid } = data;
    let delete_query = `DELETE FROM product WHERE id = ${productid} `;
    await sqlCmds.deletedRecords(delete_query);
    return apiController.respondDelete("product deleted successfully");
  } catch (err) {
    console.log("err", err);
    return apiController.respondError(err);
  }
};
