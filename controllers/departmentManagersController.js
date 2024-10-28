// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * DepartmentManagers Schema
 * manager_id: int
 * department_id: int
 **/

const getAllManagers = (req, res, department_id) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			data: [
				{
					manager_id: 1,
					department_id,
				},
			],
		})
	);
};

const updateDepartmentManager = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { manager_id, department_id } = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { manager_id, department_id },
			})
		);
	});
};

const removeDepartmentManager = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { manager_id, department_id } = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { manager_id, department_id },
			})
		);
	});
};

module.exports = {
	getAllManagers,
	updateDepartmentManager,
	removeDepartmentManager,
};
