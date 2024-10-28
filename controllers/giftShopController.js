// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * Gift Shop Schema
 * gift_shop_id: int
 * name: varchar
 * location: varchar
 * department_id: int
 **/

const getAllGiftShops = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: [
        {
          gift_shop_id: 1,
          name: "Wildlife Wonders",
          location: "North Wing",
          department_id: 101,
        },
        {
          gift_shop_id: 2,
          name: "Safari Souvenirs",
          location: "East Wing",
          department_id: 102,
        },
        {
          gift_shop_id: 3,
          name: "Jungle Treasures",
          location: "West Wing",
          department_id: 103,
        },
        // Add more gift shop entries as needed
      ],
    })
  );
};

const getSingleGiftShop = (req, res, gift_shop_id) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: `GET /admin/gift_shop/${gift_shop_id}`,
      data: {
        gift_shop_id: gift_shop_id,
        name: "Wildlife Wonders", // Example name
        location: "North Wing", // Example location
        department_id: 101, // Example department ID
      },
    })
  );
};

const createGiftShop = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, location, department_id } = JSON.parse(body);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "POST /admin/gift_shop/create",
        data: {
          gift_shop_id: Math.floor(Math.random() * 1000), // Example ID generation
          name,
          location,
          department_id,
        },
      })
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

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `PUT /admin/gift_shop/${gift_shop_id}/edit`,
        data: {
          gift_shop_id,
          name,
          location,
          department_id,
        },
      })
    );
  });
};

module.exports = {
  getAllGiftShops,
  getSingleGiftShop,
  createGiftShop,
  updateGiftShop,
};
