// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * Visitor Schema
 * visitor_id: int
 * first_name: varchar
 * last_name: varchar
 * middle_initial: varchar
 * password: varchar
 * email: varchar
 * membership: boolean
 **/

const getSingleVisitor = (req, res, visitor_id) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: `GET /admin/visitor/${visitor_id}`,
      visitor_id_params: visitor_id,
      data: {
        visitor_id: visitor_id,
        first_name: "John",
        last_name: "Doe",
        middle_initial: "A",
        password: "hashed_password",
        email: "john.doe@example.com",
        membership: true,
      },
    })
  );
};

const getAllVisitors = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: [
        {
          visitor_id: 1,
          first_name: "Alice",
          last_name: "Smith",
          middle_initial: "B",
          password: "hashed_password_1",
          email: "alice.smith@example.com",
          membership: true,
        },
        {
          visitor_id: 2,
          first_name: "Bob",
          last_name: "Johnson",
          middle_initial: "C",
          password: "hashed_password_2",
          email: "bob.johnson@example.com",
          membership: false,
        },
      ],
    })
  );
};

const updateVisitor = (req, res, visitor_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      first_name,
      last_name,
      middle_initial,
      password,
      email,
      membership,
    } = JSON.parse(body);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `PUT /admin/visitor/${visitor_id}`,
        data: {
          visitor_id,
          first_name,
          last_name,
          middle_initial,
          password,
          email,
          membership,
        },
      })
    );
  });
};

const createVisitor = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      first_name,
      last_name,
      middle_initial,
      password,
      email,
      membership,
    } = JSON.parse(body);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "POST /admin/visitor",
        data: {
          visitor_id: 1234567, // Example ID, consider generating dynamically
          first_name,
          last_name,
          middle_initial,
          password,
          email,
          membership,
        },
      })
    );
  });
};

module.exports = {
  getSingleVisitor,
  getAllVisitors,
  updateVisitor,
  createVisitor,
};
