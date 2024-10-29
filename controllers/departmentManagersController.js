// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * DepartmentManagers Schema
 * manager_id: int
 * department_id: int
 **/

const getAllManagers = (req, res, department_id) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: [
        {
          manager_id: 1,
          department_id,
        },
      ],
    })
  );
};

const updateDepartmentManager = (req, res, manager_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { department_id } = JSON.parse(body);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: { manager_id, department_id },
      })
    );
  });
};

const removeDepartmentManager = (req, res, manager_id) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: `Manager with ID ${manager_id} removed successfully.`,
    })
  );
};

module.exports = {
  getAllManagers,
  updateDepartmentManager,
  removeDepartmentManager,
};
