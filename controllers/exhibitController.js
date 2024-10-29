const { dbConnection } = require("../db.js");

/**
 * Exhibit Schema
 * exhibit_id: int
 * name: string
 * description: string
 * department_id: int
 **/

const getSingleExhibit = (req, res, exhibit_id) => {
	console.log(exhibit_id);
	dbConnection.query(
		"SELECT * FROM exhibits WHERE exhibit_id = ?",
		[exhibit_id],
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}
			if (result.length === 0) {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Exhibit does not exist" }));
				return;
			}
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ data: result[0] }));
		}
	);
};

const getAllExhibits = (req, res) => {
	dbConnection.query("SELECT * FROM exhibits", (err, result) => {
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

const updateExhibit = (req, res, exhibit_id) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, description, department_id } = JSON.parse(body);

		dbConnection.query(
			"UPDATE exhibits SET name = ?, description = ?, department_id = ? WHERE exhibit_id = ?",
			[name, description, department_id, exhibit_id],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						data: {
							message: "Exhibit updated successfully",
						},
					})
				);
			}
		);
	});
};

const createExhibit = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { name, description, department_id } = JSON.parse(body);

		dbConnection.query(
			"INSERT INTO exhibits (name, description, department_id) VALUES (?, ?, ?)",
			[name, description, department_id],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				} else {
					res.writeHead(200, { "Content-Type": "application/json" });
					res.end(
						JSON.stringify({
							message: "Exhibit created successfully",
						})
					);
				}
			}
		);
	});
};

module.exports = {
	getSingleExhibit,
	getAllExhibits,
	updateExhibit,
	createExhibit,
};
