const { dbConnection } = require("../db.js");

// Fetch profile details and past purchases for a visitor
const getProfileAndPurchases = (req, res, visitorId) => {
  dbConnection.query(
    `SELECT 
      v.first_name, 
      v.last_name, 
      v.email, 
      v.membership, 
      m.name AS merchandise_name, 
      mp.purchased_price, 
      mp.purchased_date 
     FROM visitor AS v
     LEFT JOIN merchandisepurchases AS mp ON v.visitor_id = mp.visitor_id
     LEFT JOIN merchandise AS m ON mp.merchandise_id = m.merchandise_id
     WHERE v.visitor_id = ?`,
    [visitorId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }

      if (result.length === 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Visitor not found" }));
        return;
      }

      // Grouping the results by visitor profile and their purchases
      const profile = {
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        email: result[0].email,
        membership: result[0].membership,
      };

      const pastPurchases = result.map((row) => ({
        merchandise_name: row.merchandise_name,
        purchased_price: row.purchased_price,
        purchased_date: row.purchased_date,
      }));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ profile, pastPurchases }));
    }
  );
};

module.exports = {
  getProfileAndPurchases,
};
