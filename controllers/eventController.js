const { dbConnection } = require("../db.js");

/**
 * Event Schema
 * event_id: int
 * name: varchar
 * start_time: time
 * end_time: time
 * event_date: date
 * description: varchar
 * event_category_id: int
 * member_exclusive: boolean
 **/

const getAllEvents = (req, res) => {
  dbConnection.query("SELECT * FROM events", (err, result) => {
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

const getSingleEvent = (req, res, event_id) => {
  dbConnection.query(
    "SELECT * FROM events WHERE event_id = ?",
    [event_id],
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
            error: "Event not found",
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

const createEvent = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      name,
      event_date,
      start_time,
      end_time,
      event_category_id,
      description,
      member_exclusive,
    } = JSON.parse(body);

    dbConnection.query(
      "INSERT INTO events (name, event_date, start_time, end_time, event_category_id, description, member_exclusive) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        event_date,
        start_time,
        end_time,
        event_category_id,
        description,
        member_exclusive,
      ],
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
            message: "Event created successfully",
            event_id: result.insertId,
            data: {
              name,
              event_date,
              start_time,
              end_time,
              event_category_id,
              description,
              member_exclusive,
            },
          })
        );
      }
    );
  });
};

const updateEvent = (req, res, event_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      name,
      event_date,
      start_time,
      end_time,
      event_category_id,
      description,
      member_exclusive,
    } = JSON.parse(body);

    dbConnection.query(
      "UPDATE events SET name = ?, event_date = ?, start_time = ?, end_time = ?, event_category_id = ?, description = ?, member_exclusive = ? WHERE event_id = ?",
      [
        name,
        event_date,
        start_time,
        end_time,
        event_category_id,
        description,
        member_exclusive,
        event_id,
      ],
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
              error: "Event not found",
            })
          );
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Event updated successfully",
            data: {
              event_id,
              name,
              event_date,
              start_time,
              end_time,
              event_category_id,
              description,
              member_exclusive,
            },
          })
        );
      }
    );
  });
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
};
