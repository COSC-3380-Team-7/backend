// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * Habitat Schema
 * habitat_id: int
 * name: string
 * description: string
 * exhibit_id: int
 **/

const getSingleHabitat = (req, res, habitat_id) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			habitat_id_params: habitat_id,
			data: {
				habitat_id: 1,
				name: "Habitat 1",
				description: "Description of Habitat 1",
				exhibit_id: 1,
			},
		})
	);
};

const getAllHabitats = (req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			data: [
				{
					habitat_id: 1,
					name: "Habitat 1",
					description: "Description of Habitat 1",
					exhibit_id: 1,
				},
			],
		})
	);
};

const updateHabitat = (req, res, habitat_id) => {
	console.log(habitat_id);
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, description, exhibit_id } = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { name, description, exhibit_id },
			})
		);
	});
};

const createHabitat = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, description, exhibit_id } = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { habitat_id: 1234567, name, description, exhibit_id },
			})
		);
	});
};

module.exports = {
	getSingleHabitat,
	getAllHabitats,
	updateHabitat,
	createHabitat,
};
