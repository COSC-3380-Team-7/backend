const { dbConnection } = require("../db.js");

/**
 * Ticket Schema
 * ticket_id: int
 * scheduled_date: date
 * ticket_category: string = "Adult", "Child", "Senior", "Veteran", "Student"
 * price: float
 **/

const getSingleTicket = (req, res, ticket_id) => {
  dbConnection.query(
    "SELECT * FROM tickets WHERE ticket_id = ?",
    [ticket_id],
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
            error: "Ticket does not exist",
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

const getAllTickets = (req, res) => {
  dbConnection.query("SELECT * FROM tickets", (err, result) => {
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

const updateTicket = (req, res, ticket_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { scheduled_date, ticket_category, price } = JSON.parse(body);

    dbConnection.query(
      "UPDATE tickets SET scheduled_date = ?, ticket_category = ?, price = ? WHERE ticket_id = ?",
      [scheduled_date, ticket_category, price, ticket_id],
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
            message: "Ticket has been updated successfully",
          })
        );
      }
    );
  });
};

const createTicket = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { scheduled_date, ticket_category, price } = JSON.parse(body);

    dbConnection.query(
      "INSERT INTO tickets (scheduled_date, ticket_category, price) VALUES (?, ?, ?)",
      [scheduled_date, ticket_category, price],
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
            message: "Ticket has been added successfully",
            ticket_id: result.insertId,
          })
        );
      }
    );
  });
};

module.exports = {
  getSingleTicket,
  getAllTickets,
  updateTicket,
  createTicket,
};
