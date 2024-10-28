// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * Exhibit Schema
 * exhibit_id: int
 * name: string
 * description: string
 * location: string
 * department_id: int
 **/

const getSingleExhibit = (req, res, exhibit_id) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			exhibit_id_params: exhibit_id,
			data: {
				exhibit_id: 1,
				name: "Exhibit 1",
				description: "Description of Exhibit 1",
				location: "Location of Exhibit 1",
				department_id: 1,
			},
		})
	);
};

const getAllExhibits = (req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			data: [
				{
					exhibit_id: 1,
					name: "Exhibit 1",
					description: "Description of Exhibit 1",
					location: "Location of Exhibit 1",
					department_id: 1,
				},
			],
		})
	);
};

const updateExhibit = (req, res, exhibit_id) => {
	console.log(exhibit_id);
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, description, location, department_id } = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { exhibit_id, name, description, location, department_id },
			})
		);
	});
};

const createExhibit = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, description, location, department_id } = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: {
					exhibit_id: 1234567,
					name,
					description,
					location,
					department_id,
				},
			})
		);
	});
};

module.exports = {
	getSingleExhibit,
	getAllExhibits,
	updateExhibit,
	createExhibit,
};