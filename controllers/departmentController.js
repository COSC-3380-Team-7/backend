// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * Department Schema
 * department_id: int
 * name: string
 * location: string
 **/

const getSingleDepartment = (req, res, department_id) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			department_id_params: department_id,
			data: {
				department_id: 1,
				name: "Wildlife",
				location: "A23",
			},
		})
	);
};

const getAllDepartments = (req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			data: [
				{
					department_id: 1,
					name: "Wildlife",
					location: "A23",
				},
			],
		})
	);
};

const updateDepartment = (req, res, department_id) => {
	console.log(department_id);
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, location } = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { department_id, name, location },
			})
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

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { department_id: 1234567, name, location },
			})
		);
	});
};

module.exports = {
	getSingleDepartment,
	getAllDepartments,
	updateDepartment,
	createDepartment,
};
