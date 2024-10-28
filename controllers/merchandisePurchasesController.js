// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * Merchandise Purchases Schema
 * visitor_id: int
 * merchandise_id: int
 * purchased_price: numeric
 **/

const getSinglePurchase = (req, res, visitor_id, merchandise_id) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: `GET /admin/merchandise/purchase?visitor_id=${visitor_id}&merchandise_id=${merchandise_id}`,
      data: {
        visitor_id: visitor_id,
        merchandise_id: merchandise_id,
        purchased_price: 19.99, // Example price, modify as necessary
      },
    })
  );
};

const getAllPurchases = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: [
        {
          visitor_id: 1,
          merchandise_id: 1,
          purchased_price: 19.99,
        },
        {
          visitor_id: 2,
          merchandise_id: 2,
          purchased_price: 9.99,
        },
      ],
    })
  );
};

const createPurchase = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { visitor_id, merchandise_id, purchased_price } = JSON.parse(body);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "POST /admin/merchandise/purchase",
        data: {
          visitor_id,
          merchandise_id,
          purchased_price,
        },
      })
    );
  });
};

module.exports = {
  getSinglePurchase,
  getAllPurchases,
  createPurchase,
};
