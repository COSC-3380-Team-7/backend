const { dbConnection } = require("../db.js");

/**
 * Complaints Schema
 * id: int (Auto Increment)
 * title: string
 * complaint: string
 * exhibit_id: int
 * visitor_id: int
 */

const createComplaint = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { title, complaint, exhibit_id, visitor_id } = JSON.parse(body);

    if (!title || !complaint || !exhibit_id || !visitor_id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "All fields are required" }));
      return;
    }

    const query = `
      INSERT INTO complaints (title, complaint, exhibit_id, visitor_id)
      VALUES (?, ?, ?, ?)
    `;

    dbConnection.query(query, [title, complaint, exhibit_id, visitor_id], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Complaint submitted successfully",
          complaintId: result.insertId,
        })
      );
    });
  });
};

module.exports = {
  createComplaint,
};
