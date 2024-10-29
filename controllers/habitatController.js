const { dbConnection } = require("../db.js");

/**
 * Habitat Schema
 * habitat_id: int
 * name: string
 * description: string
 * exhibit_id: int
 **/

const getSingleHabitat = (req, res, habitat_id) => {
	dbConnection.query(
		"SELECT * FROM habitats WHERE habitat_id = ?",
		[habitat_id],
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

			if (result.length === 0) {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						error: "Habitat does not exist",
					})
				);
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: result[0],
				})
			);
		}
	);
};

const getExhibitsHabitats = (req, res, exhibit_id) => {
	dbConnection.query(
		"SELECT * FROM habitats WHERE exhibit_id = ?",
		[exhibit_id],
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

const getAllHabitats = (req, res) => {
	dbConnection.query("SELECT * FROM habitats", (err, result) => {
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
	});
};

const updateHabitat = (req, res, habitat_id) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, description, exhibit_id } = JSON.parse(body);

		dbConnection.query(
			"UPDATE habitats SET name = ?, description = ?, exhibit_id = ? WHERE habitat_id = ?",
			[name, description, exhibit_id, habitat_id],
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
						data: { habitat_id, name, description, exhibit_id },
					})
				);
			}
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

		dbConnection.query(
			"INSERT INTO habitats (name, description, exhibit_id) VALUES (?, ?, ?)",
			[name, description, exhibit_id],
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

				res.writeHead(201, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						data: { name, description, exhibit_id },
					})
				);
			}
		);
	});
};

module.exports = {
	getSingleHabitat,
	getExhibitsHabitats,
	getAllHabitats,
	updateHabitat,
	createHabitat,
};
