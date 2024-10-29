const { dbConnection } = require("../db.js");

/**
 * Department Schema
 * department_id: int
 * name: string
 * location: string
 **/

const getSingleDepartment = (req, res, department_id) => {
	dbConnection.query(
		"SELECT * FROM departments WHERE department_id = ?",
		[department_id],
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}
			if (result.length === 0) {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Department does not exist" }));
				return;
			}
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ data: result[0] }));
		}
	);
};

const getAllDepartments = (req, res) => {
	dbConnection.query("SELECT * FROM departments", (err, result) => {
		if (err) {
			console.log(err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Internal Server Error" }));
			return;
		}

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ data: result }));
	});
};

const updateDepartment = (req, res, department_id) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, location } = JSON.parse(body);

		dbConnection.query(
			"UPDATE departments SET name = ?, location = ? WHERE department_id = ?",
			[name, location, department_id],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "Department updated successfully" }));
			}
		);
	});
};

const createDepartment = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, location } = JSON.parse(body);

		dbConnection.query(
			"INSERT INTO departments (name, location) VALUES (?, ?)",
			[name, location],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				res.writeHead(201, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						message: "Department created successfully",
					})
				);
			}
		);
	});
};

module.exports = {
	getSingleDepartment,
	getAllDepartments,
	updateDepartment,
	createDepartment,
};
