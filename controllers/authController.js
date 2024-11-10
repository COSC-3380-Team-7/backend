const { dbConnection } = require("../db.js");
const bcrypt = require("bcrypt");

const adminLogin = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { email, password } = JSON.parse(body);

		dbConnection.query(
			"SELECT e.employee_id, e.email, e.password FROM employees AS e JOIN authlevel AS a ON e.auth_level_id = a.auth_level_id WHERE e.email = ? AND a.title = 'Admin'",
			[email],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				if (result.length === 0) {
					res.writeHead(404, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Invalid login credentials" }));
					return;
				}

				const employee = result[0];

				bcrypt.compare(password, employee.password, (err, same) => {
					if (err) {
						console.log(err);
						res.writeHead(500, { "Content-Type": "application/json" });
						res.end(JSON.stringify({ error: "Internal Server Error" }));
						return;
					}

					if (!same) {
						res.writeHead(401, { "Content-Type": "application/json" });
						res.end(JSON.stringify({ error: "Invalid login credentials" }));
						return;
					}

					res.writeHead(200, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ employee_id: employee.employee_id }));
				});
			}
		);
	});
};

const managerLogin = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { email, password } = JSON.parse(body);

		dbConnection.query(
			"SELECT e.employee_id, e.email, e.password, o.name AS occupation FROM employees AS e JOIN authlevel AS a ON e.auth_level_id = a.auth_level_id JOIN occupation o ON e.occupation_id = o.occupation_id WHERE e.email = ? AND a.title = 'Manager'",
			[email],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				if (result.length === 0) {
					res.writeHead(404, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Invalid login credentials" }));
					return;
				}

				const employee = result[0];

				bcrypt.compare(password, employee.password, (err, same) => {
					if (err) {
						console.log(err);
						res.writeHead(500, { "Content-Type": "application/json" });
						res.end(JSON.stringify({ error: "Internal Server Error" }));
						return;
					}

					if (!same) {
						res.writeHead(401, { "Content-Type": "application/json" });
						res.end(JSON.stringify({ error: "Invalid login credentials" }));
						return;
					}

					res.writeHead(200, { "Content-Type": "application/json" });
					res.end(
						JSON.stringify({
							data: {
								employee_id: employee.employee_id,
								occupation: employee.occupation,
							},
						})
					);
				});
			}
		);
	});
};

const employeeLogin = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { email, password } = JSON.parse(body);

		dbConnection.query(
			"SELECT e.employee_id, e.email, e.password FROM employees AS e JOIN authlevel AS a ON e.auth_level_id = a.auth_level_id WHERE e.email = ? AND a.title = 'Employee'",
			[email],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				if (result.length === 0) {
					res.writeHead(404, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Invalid login credentials" }));
					return;
				}

				const employee = result[0];

				bcrypt.compare(password, employee.password, (err, same) => {
					if (err) {
						console.log(err);
						res.writeHead(500, { "Content-Type": "application/json" });
						res.end(JSON.stringify({ error: "Internal Server Error" }));
						return;
					}

					if (!same) {
						res.writeHead(401, { "Content-Type": "application/json" });
						res.end(JSON.stringify({ error: "Invalid login credentials" }));
						return;
					}

					res.writeHead(200, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ employee_id: employee.employee_id }));
				});
			}
		);
	});
};

const memberLogin = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { email, password } = JSON.parse(body);

		dbConnection.query(
			"SELECT * FROM visitors WHERE email = ?",
			[email],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				if (result.length === 0) {
					res.writeHead(404, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Invalid login credentials" }));
					return;
				}

				const member = result[0];
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ data: member }));

				// bcrypt.compare(password, member.password, (err, same) => {
				// 	if (err) {
				// 		console.log(err);
				// 		res.writeHead(500, { "Content-Type": "application/json" });
				// 		res.end(JSON.stringify({ error: "Internal Server Error" }));
				// 		return;
				// 	}

				// 	if (!same) {
				// 		res.writeHead(401, { "Content-Type": "application/json" });
				// 		res.end(JSON.stringify({ error: "Invalid login credentials" }));
				// 		return;
				// 	}

				// 	res.writeHead(200, { "Content-Type": "application/json" });
				// 	res.end(JSON.stringify({ member_id: member.employee_id }));
				// });
			}
		);
	});
};

const getAuthLevels = (req, res) => {
	dbConnection.query(
		"SELECT * FROM authlevel WHERE title IN ('Manager', 'Employee')",
		(err, result) => {
			if (err) {
				console.log(err);
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
	adminLogin,
	managerLogin,
	employeeLogin,
	memberLogin,
	getAuthLevels,
};
