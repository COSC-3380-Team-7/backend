// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

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
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: `GET /admin/merchandise/${merchandise_id}`,
      merchandise_id_params: merchandise_id,
      data: {
        merchandise_id: merchandise_id,
        name: "T-Shirt",
        price: 19.99,
        description: "A comfortable cotton T-Shirt",
        stock: 50,
        gift_shop_id: 1,
      },
    })
  );
};

const getAllMerchandise = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: [
        {
          merchandise_id: 1,
          name: "T-Shirt",
          price: 19.99,
          description: "A comfortable cotton T-Shirt",
          stock: 50,
          gift_shop_id: 1,
        },
        {
          merchandise_id: 2,
          name: "Mug",
          price: 9.99,
          description: "Ceramic mug with zoo logo",
          stock: 100,
          gift_shop_id: 1,
        },
      ],
    })
  );
};

const updateMerchandise = (req, res, merchandise_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, price, description, stock, gift_shop_id } = JSON.parse(body);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `PUT /admin/merchandise/${merchandise_id}`,
        data: {
          merchandise_id,
          name,
          price,
          description,
          stock,
          gift_shop_id,
        },
      })
    );
  });
};

const createMerchandise = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, price, description, stock, gift_shop_id } = JSON.parse(body);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "POST /admin/merchandise",
        data: {
          merchandise_id: 1234567, // Example ID, consider generating dynamically
          name,
          price,
          description,
          stock,
          gift_shop_id,
        },
      })
    );
  });
};

module.exports = {
  getSingleMerchandise,
  getAllMerchandise,
  updateMerchandise,
  createMerchandise,
};
