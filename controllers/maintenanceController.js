const { dbConnection } = require("../db.js");

/**
 * Maintenance Report Schema
 * maintenance_report_id: int
 * title: string
 * details: string
 * maintenance_cause: string
 * employee_id: int
 * habitat_id: int
 * working_status: string
 * created_at: date
 * updated_at: date
 * completed_at: date
 **/

// Get a single maintenance report by ID
const getSingleMaintenanceReport = (req, res, maintenance_report_id) => {
  dbConnection.query(
    "SELECT * FROM maintenancereports WHERE maintenance_report_id = ?",
    [maintenance_report_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }

      if (result.length === 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Maintenance report not found" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ data: result[0] }));
    }
  );
};

// Get all maintenance reports
const getAllMaintenanceReports = (req, res) => {
  dbConnection.query("SELECT * FROM maintenancereports", (err, result) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: result }));
  });
};

// Update a maintenance report by ID
const updateMaintenanceReport = (req, res, maintenance_report_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      title,
      maintenance_cause,
      details,
      working_status,
      habitat_id,
      employee_id,
      updated_at,
      completed_at,
    } = JSON.parse(body);

    dbConnection.query(
      "UPDATE maintenancereports SET title = ?, maintenance_cause = ?, details = ?, working_status = ?, habitat_id = ?, employee_id = ?, updated_at = ?, completed_at = ? WHERE maintenance_report_id = ?",
      [
        title,
        maintenance_cause,
        details,
        working_status,
        habitat_id,
        employee_id,
        updated_at,
        completed_at,
        maintenance_report_id,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal Server Error" }));
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Maintenance report updated successfully" })
        );
      }
    );
  });
};

// Create a new maintenance report
const createMaintenanceReport = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      title,
      maintenance_cause,
      details,
      working_status,
      habitat_id,
      employee_id,
      created_at,
      updated_at,
      completed_at,
    } = JSON.parse(body);

    dbConnection.query(
      "INSERT INTO maintenancereports (title, maintenance_cause, details, working_status, habitat_id, employee_id, created_at, updated_at, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        maintenance_cause,
        details,
        working_status,
        habitat_id,
        employee_id,
        created_at,
        updated_at,
        completed_at,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal Server Error" }));
          return;
        }

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Maintenance report created successfully" })
        );
      }
    );
  });
};

module.exports = {
  getSingleMaintenanceReport,
  getAllMaintenanceReports,
  updateMaintenanceReport,
  createMaintenanceReport,
};
