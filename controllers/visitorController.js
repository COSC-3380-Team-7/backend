const { dbConnection } = require("../db.js");

/**
 * Visitor Schema
 * visitor_id: int
 * first_name: varchar
 * last_name: varchar
 * middle_initial: varchar
 * password: varchar
 * email: varchar
 * membership: boolean
 **/

const getSingleVisitor = (req, res, visitor_id) => {
  dbConnection.query(
    "SELECT * FROM visitors WHERE visitor_id = ?",
    [visitor_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Internal Server Error",
          })
        );
        return;
      }

      if (result.length === 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Visitor does not exist",
          })
        );
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: result[0],
        })
      );
    }
  );
};

const getAllVisitors = (req, res) => {
  dbConnection.query("SELECT * FROM visitors", (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Internal Server Error",
        })
      );
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: result,
      })
    );
  });
};

const updateVisitor = (req, res, visitor_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      first_name,
      last_name,
      middle_initial,
      password,
      email,
      membership,
    } = JSON.parse(body);

    dbConnection.query(
      "UPDATE visitors SET first_name = ?, last_name = ?, middle_initial = ?, password = ?, email = ?, membership = ? WHERE visitor_id = ?",
      [
        first_name,
        last_name,
        middle_initial,
        password,
        email,
        membership,
        visitor_id,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Internal Server Error",
            })
          );
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Visitor has been updated successfully",
          })
        );
      }
    );
  });
};

const createVisitor = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      first_name,
      last_name,
      middle_initial,
      password,
      email,
      membership,
    } = JSON.parse(body);

    // If membership is undefined or null, set it to false
    const membershipValue =
      typeof membership !== "undefined" ? membership : false;

    dbConnection.query(
      "INSERT INTO visitors (first_name, last_name, middle_initial, password, email, membership) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, last_name, middle_initial, password, email, membershipValue],
      (err, result) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Internal Server Error",
            })
          );
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Visitor has been added successfully",
            visitor_id: result.insertId, // Assuming the DB returns the new ID
          })
        );
      }
    );
  });
};

module.exports = {
  getSingleVisitor,
  getAllVisitors,
  updateVisitor,
  createVisitor,
};
