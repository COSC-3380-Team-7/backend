// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * Occupation Schema
 * occupation_id: int
 * name: string
 **/

const getAllOccupations = (req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			data: [
				{
					occupation_id: 1,
					name: "Zookeeper",
				},
				{
					occupation_id: 2,
					name: "Veterinarian",
				},
			],
		})
	);
};

const updateOccupation = (req, res, occupation_id) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name } = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { occupation_id, name },
			})
		);
	});
};

const createOccupation = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name } = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { occupation_id: 1234567, name },
			})
		);
	});
};

module.exports = {
	getAllOccupations,
	updateOccupation,
	createOccupation,
};
