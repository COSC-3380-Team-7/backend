// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

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
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: [
        {
          event_id: "ExINV001",
          name: "Field trip",
          start_time: "09:00",
          end_time: "10:00",
          event_date: "2022-12-12",
          description: "School field trip",
          event_category_id: 1, // Example category ID
          member_exclusive: false,
        },
        // Add more events as needed
      ],
    })
  );
};

const getSingleEvent = (req, res, event_id) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: `GET /admin/event/${event_id}`,
      data: {
        event_id: event_id,
        name: "Field trip",
        start_time: "09:00",
        end_time: "10:00",
        event_date: "2022-12-12",
        description: "School field trip",
        event_category_id: 1, // Example category ID
        member_exclusive: false,
      },
    })
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

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "POST /admin/event/create",
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

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `PUT /admin/event/${event_id}/edit`,
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
  });
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
};
