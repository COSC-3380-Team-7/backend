const { dbConnection } = require("../db.js"); // Ensure you replace with your actual db connection

/**
 * Merchandise Schema
 * merchandise_id: int
 * name: varchar
 * price: numeric
 * description: varchar
 * stock: int
 * gift_shop_id: int
 **/

const getSingleMerchandise = (req, res, merchandise_id) => {
  dbConnection.query(
    "SELECT * FROM merchandise WHERE merchandise_id = ?",
    [merchandise_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }

      if (result.length === 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Merchandise does not exist" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ data: result[0] }));
    }
  );
};

const getAllMerchandise = (req, res) => {
  dbConnection.query("SELECT * FROM merchandise", (err, result) => {
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

const updateMerchandise = (req, res, merchandise_id) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));

  req.on("end", () => {
    const { name, price, description, stock, gift_shop_id } = JSON.parse(body);

    dbConnection.query(
      "UPDATE merchandise SET name = ?, price = ?, description = ?, stock = ?, gift_shop_id = ? WHERE merchandise_id = ?",
      [name, price, description, stock, gift_shop_id, merchandise_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal Server Error" }));
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Merchandise updated successfully" })
        );
      }
    );
  });
};

const createMerchandise = (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));

  req.on("end", () => {
    const { name, price, description, stock, gift_shop_id } = JSON.parse(body);

    dbConnection.query(
      "INSERT INTO merchandise (name, price, description, stock, gift_shop_id) VALUES (?, ?, ?, ?, ?)",
      [name, price, description, stock, gift_shop_id],
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
            message: "Merchandise created successfully",
            data: {
              merchandise_id: result.insertId,
              name,
              price,
              description,
              stock,
              gift_shop_id,
            },
          })
        );
      }
    );
  });
};

module.exports = {
  getSingleMerchandise,
  getAllMerchandise,
  updateMerchandise,
  createMerchandise,
};
