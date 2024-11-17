const { dbConnection } = require("../db.js");

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
  dbConnection.query(
    "SELECT first_name, middle_initial, last_name, password, email FROM visitors WHERE visitor_id = ?",
    [visitor_id],
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
            error: "Visitor does not exist",
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

const getAllVisitors = (req, res) => {
  dbConnection.query("SELECT * FROM visitors", (err, result) => {
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

// const updateVisitor = (req, res, visitor_id) => {
//   let body = "";
//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });

//   req.on("end", () => {
//     const {
//       first_name,
//       last_name,
//       middle_initial,
//       password,
//       email,
//       membership,
//     } = JSON.parse(body);

//     dbConnection.query(
//       "UPDATE visitors SET first_name = ?, last_name = ?, middle_initial = ?, password = ?, email = ?, membership = ? WHERE visitor_id = ?",
//       [
//         first_name,
//         last_name,
//         middle_initial,
//         password,
//         email,
//         membership,
//         visitor_id,
//       ],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               error: "Internal Server Error",
//             })
//           );
//           return;
//         }

//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             message: "Visitor has been updated successfully",
//           })
//         );
//       }
//     );
//   });
// };


// const updateVisitor = (req, res, visitor_id) => {
//   let body = "";
//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });

//   req.on("end", () => {
//     // Parse and validate request body
//     const { first_name, last_name, middle_initial } = JSON.parse(body);

//     if (!first_name || !last_name) {
//       res.writeHead(400, { "Content-Type": "application/json" });
//       res.end(
//         JSON.stringify({
//           error_message: "First name and last name are required.",
//         })
//       );
//       return;
//     }

//     // Update only the allowed fields
//     dbConnection.query(
//       "UPDATE visitors SET first_name = ?, last_name = ?, middle_initial = ? WHERE visitor_id = ?",
//       [first_name, last_name, middle_initial || null, visitor_id],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               error: "Internal Server Error",
//             })
//           );
//           return;
//         }

//         if (result.affectedRows === 0) {
//           res.writeHead(404, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               error_message: "Visitor not found.",
//             })
//           );
//           return;
//         }

//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             message: "Visitor updated successfully",
//           })
//         );
//       }
//     );
//   });
// };



// const updateVisitor = (req, res, visitor_id) => {
//   let body = "";
//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });

//   req.on("end", () => {
//     // Parse and validate request body
//     const { membership } = JSON.parse(body);

//     // Ensure membership is provided and valid
//     if (typeof membership !== "boolean" && membership !== "Basic Membership") {
//       res.writeHead(400, { "Content-Type": "application/json" });
//       res.end(
//         JSON.stringify({
//           error_message: "Invalid membership value.",
//         })
//       );
//       return;
//     }

//     // Update membership
//     dbConnection.query(
//       "UPDATE visitors SET membership = ? WHERE visitor_id = ?",
//       [membership, visitor_id],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               error: "Internal Server Error",
//             })
//           );
//           return;
//         }

//         if (result.affectedRows === 0) {
//           res.writeHead(404, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               error_message: "Visitor not found.",
//             })
//           );
//           return;
//         }

//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             message: "Membership updated successfully",
//           })
//         );
//       }
//     );
//   });
// };

// const updateVisitor = (req, res, visitor_id) => {
//   let body = "";
//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });

//   req.on("end", () => {
//     // Parse the request body
//     const { membership } = JSON.parse(body);

//     // Validate membership value
//     if (membership !== 0 && membership !== 1) {
//       res.writeHead(400, { "Content-Type": "application/json" });
//       res.end(
//         JSON.stringify({
//           error_message: "Invalid membership value. Must be 0 or 1.",
//         })
//       );
//       return;
//     }

//     // Update membership in the database
//     dbConnection.query(
//       "UPDATE visitors SET membership = ? WHERE visitor_id = ?",
//       [membership, visitor_id],
//       (err, result) => {
//         if (err) {
//           console.error(err);
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               error: "Internal Server Error",
//             })
//           );
//           return;
//         }

//         if (result.affectedRows === 0) {
//           res.writeHead(404, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               error_message: "Visitor not found.",
//             })
//           );
//           return;
//         }

//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(
//           JSON.stringify({
//             message: "Membership updated successfully",
//           })
//         );
//       }
//     );
//   });
// };

const updateVisitor = (req, res, visitor_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    // Parse and validate request body
    const { first_name, last_name, middle_initial, membership } = JSON.parse(body);

    // Ensure membership is a boolean or 0/1 (depending on your frontend data type)
    const membershipValue = typeof membership === "boolean" ? (membership ? 1 : 0) : membership;

    // Prepare fields to update
    const fieldsToUpdate = [];
    const valuesToUpdate = [];

    if (first_name) {
      fieldsToUpdate.push("first_name = ?");
      valuesToUpdate.push(first_name);
    }
    if (last_name) {
      fieldsToUpdate.push("last_name = ?");
      valuesToUpdate.push(last_name);
    }
    if (middle_initial) {
      fieldsToUpdate.push("middle_initial = ?");
      valuesToUpdate.push(middle_initial);
    }
    if (typeof membershipValue !== "undefined") {
      fieldsToUpdate.push("membership = ?");
      valuesToUpdate.push(membershipValue);
    }

    // Ensure there is something to update
    if (fieldsToUpdate.length === 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error_message: "No valid fields provided for update.",
        })
      );
      return;
    }

    // Add visitor_id to the end of the values array for WHERE clause
    valuesToUpdate.push(visitor_id);

    const updateQuery = `UPDATE visitors SET ${fieldsToUpdate.join(", ")} WHERE visitor_id = ?`;

    dbConnection.query(updateQuery, valuesToUpdate, (err, result) => {
      if (err) {
        console.error(err);
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
            error_message: "Visitor not found.",
          })
        );
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Visitor updated successfully",
        })
      );
    });
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

    // If membership is undefined or null, set it to false
    const membershipValue =
      typeof membership !== "undefined" ? membership : false;

    dbConnection.query(
      "INSERT INTO visitors (first_name, last_name, middle_initial, password, email, membership) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, last_name, middle_initial, password, email, membershipValue],
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
            message: "Visitor has been added successfully",
            visitor_id: result.insertId, // Assuming the DB returns the new ID
          })
        );
      }
    );
  });
};




module.exports = {
  getSingleVisitor,
  getAllVisitors,
  updateVisitor,
  createVisitor,
};
