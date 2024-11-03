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
		`SELECT 
      mr.maintenance_report_id, 
      mr.title, 
      mr.maintenance_cause, 
      mr.details, 
      mr.employee_id, 
      mr.habitat_id, 
      mr.working_status, 
      mr.created_at, 
      mr.updated_at, 
      mr.completed_at, 
      e.first_name, 
      e.last_name, 
      h.name as habitat_name 
    FROM maintenancereports as mr 
    JOIN employees as e ON mr.employee_id = e.employee_id 
    JOIN habitats as h ON mr.habitat_id = h.habitat_id  WHERE maintenance_report_id = ?`,
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

const getMaintenceReportsByHabitat = (
	req,
	res,
	habitat_name,
	working_status,
	start_date,
	end_date
) => {
	dbConnection.query(
		`SELECT 
      mr.maintenance_report_id, 
      mr.title, 
      mr.maintenance_cause, 
      mr.details, 
      mr.employee_id, 
      mr.habitat_id, 
      mr.working_status, 
      mr.created_at, 
      mr.updated_at, 
      mr.completed_at, 
      e.first_name, 
      e.last_name, 
      h.name as habitat_name 
    FROM maintenancereports as mr 
    JOIN employees as e ON mr.employee_id = e.employee_id 
    JOIN habitats as h ON mr.habitat_id = h.habitat_id 
    WHERE h.name = ? AND mr.created_at BETWEEN ? AND ? AND mr.working_status = ?`,
		[habitat_name, start_date, end_date, working_status],
		(err, result) => {
			if (err) {
				console.error(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ data: result }));
		}
	);
};

module.exports = {
	getSingleMaintenanceReport,
	getAllMaintenanceReports,
	updateMaintenanceReport,
	createMaintenanceReport,
	getMaintenceReportsByHabitat,
};
