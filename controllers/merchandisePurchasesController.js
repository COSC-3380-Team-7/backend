const { dbConnection } = require("../db.js");

/**
 * Merchandise Purchases Schema
 * visitor_id: int
 * merchandise_id: int
 * purchased_price: numeric
 **/

const getSinglePurchase = (req, res, visitor_id, merchandise_id) => {
  dbConnection.query(
    "SELECT * FROM merchandisepurchases WHERE visitor_id = ? AND merchandise_id = ?",
    [visitor_id, merchandise_id],
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
            error: "Purchase does not exist",
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

const getAllPurchases = (req, res) => {
  dbConnection.query("SELECT * FROM merchandisepurchases", (err, result) => {
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

const createPurchase = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { visitor_id, merchandise_id, purchased_price } = JSON.parse(body);

    dbConnection.query(
      "INSERT INTO merchandisepurchases (visitor_id, merchandise_id, purchased_price) VALUES (?, ?, ?)",
      [visitor_id, merchandise_id, purchased_price],
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

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Purchase has been created successfully",
            data: {
              visitor_id,
              merchandise_id,
              purchased_price,
            },
          })
        );
      }
    );
  });
};

module.exports = {
  getSinglePurchase,
  getAllPurchases,
  createPurchase,
};
