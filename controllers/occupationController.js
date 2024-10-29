const { dbConnection } = require("../db.js");

/**
 * Occupation Schema
 * occupation_id: int
 * name: string
 **/

const getAllOccupations = (req, res) => {
  dbConnection.query("SELECT * FROM occupation", (err, result) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: result }));
  });
};

const updateOccupation = (req, res, occupation_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name } = JSON.parse(body);

    dbConnection.query(
      "UPDATE occupation SET name = ? WHERE occupation_id = ?",
      [name, occupation_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal Server Error" }));
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Occupation has been updated successfully",
            data: { occupation_id, name },
          })
        );
      }
    );
  });
};

const createOccupation = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name } = JSON.parse(body);

    dbConnection.query(
      "INSERT INTO occupation (name) VALUES (?)",
      [name],
      (err, result) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal Server Error" }));
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Occupation has been created successfully",
            data: { occupation_id: result.insertId, name },
          })
        );
      }
    );
  });
};

module.exports = {
  getAllOccupations,
  updateOccupation,
  createOccupation,
};
