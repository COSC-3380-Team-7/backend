const { dbConnection } = require("../db.js");

/**
 * Gift Shop Schema
 * gift_shop_id: int
 * name: varchar
 * location: varchar
 * department_id: int
 **/

const getAllGiftShops = (req, res) => {
  dbConnection.query("SELECT * FROM giftshops", (err, result) => {
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

const getSingleGiftShop = (req, res, gift_shop_id) => {
  dbConnection.query(
    "SELECT * FROM giftshops WHERE gift_shop_id = ?",
    [gift_shop_id],
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
            error: "Gift shop does not exist",
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

const createGiftShop = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, location, department_id } = JSON.parse(body);

    dbConnection.query(
      "INSERT INTO giftshops (name, location, department_id) VALUES (?, ?, ?)",
      [name, location, department_id],
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
            message: "Gift shop has been created successfully",
            data: {
              gift_shop_id: result.insertId, // Assuming result contains the inserted ID
              name,
              location,
              department_id,
            },
          })
        );
      }
    );
  });
};

const updateGiftShop = (req, res, gift_shop_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, location, department_id } = JSON.parse(body);

    dbConnection.query(
      "UPDATE giftshops SET name = ?, location = ?, department_id = ? WHERE gift_shop_id = ?",
      [name, location, department_id, gift_shop_id],
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

        if (result.affectedRows === 0) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Gift shop does not exist",
            })
          );
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Gift shop has been updated successfully",
          })
        );
      }
    );
  });
};

module.exports = {
  getAllGiftShops,
  getSingleGiftShop,
  createGiftShop,
  updateGiftShop,
};
