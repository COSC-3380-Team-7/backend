const { dbConnection } = require("../db.js");

/**
 * DepartmentManagers Schema
 * manager_id: int
 * department_id: int
 **/

const getAllManagers = (req, res, department_id) => {
	dbConnection.query(
		"SELECT e.employee_id, e.first_name, e.last_name FROM departmentmanagers AS dm JOIN employees AS e ON dm.manager_id = e.employee_id JOIN departments AS d on dm.department_id = d.department_id WHERE dm.department_id = ?",
		[department_id],
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
					data: result,
				})
			);
		}
	);
};

const updateDepartmentManager = (req, res, manager_id) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { department_id } = JSON.parse(body);

		dbConnection.query(
			"UPDATE departmentmanagers SET department_id = ? WHERE manager_id = ?",
			[department_id, manager_id],
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
						message: `Manager with ID ${manager_id} has been updated successfully.`,
					})
				);
			}
		);
	});
};

const removeDepartmentManager = (req, res, manager_id) => {
	dbConnection.query(
		"DELETE FROM departmentmanagers WHERE manager_id = ?",
		[manager_id],
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
					message: `Manager with ID ${manager_id} removed successfully.`,
				})
			);
		}
	);
};

module.exports = {
	getAllManagers,
	updateDepartmentManager,
	removeDepartmentManager,
};
