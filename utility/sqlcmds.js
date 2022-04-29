const con = require("../startup/connection");

module.exports.addRecords = async (sql, values) => {
  return new Promise((resolve, reject) => {
    con.query(sql, values, (err, rows) => {
      if (err) {
        console.log("error", err);
        reject(err);
      }
      resolve({
        message: "",
        affectedRows: rows.affectedRows,
        lastInsertedId: rows.insertId,
      });
    });
  });
};

module.exports.getOne = async (sql, values) => {
  return new Promise((resolve, reject) => {
    con.query(sql, values, (err, rows) => {
      if (err) reject(err);
      resolve(rows[0]);
    });
  });
};

module.exports.getMany = async (sql, values) => {
  return new Promise((resolve, reject) => {
    con.query(sql, values, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

module.exports.updateRecords = async (sql, values) => {
  return new Promise((resolve, reject) => {
    con.query(sql, values, (err, rows) => {
      if (err) reject(err);
      console.log("err", err);
      console.log("rows", rows);
      resolve({
        message: "",
        changedRows: rows.changedRows,
      });
    });
  });
};

module.exports.deletedRecords = async (sql, values) => {
  return new Promise((resolve, reject) => {
    con.query(sql, values, (err, rows) => {
      if (err) reject(err);
      resolve({
        affectedRows: rows.affectedRows,
        changedRows: rows.changedRows,
      });
    });
  });
};
