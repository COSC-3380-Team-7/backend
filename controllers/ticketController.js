const { dbConnection } = require("../db.js");

/**
 * Ticket Schema
 * ticket_id: int
 * scheduled_date: date
 * ticket_category: string = "Adult", "Child", "Senior", "Veteran", "Student"
 * price: float
 **/

const getSingleTicket = (req, res, ticket_id) => {
	dbConnection.query(
		"SELECT * FROM tickets WHERE ticket_id = ?",
		[ticket_id],
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
						error: "Ticket does not exist",
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

const getAllTickets = (req, res) => {
	dbConnection.query("SELECT * FROM tickets", (err, result) => {
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

const updateTicket = (req, res, ticket_id) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { scheduled_date, ticket_category, price } = JSON.parse(body);

		dbConnection.query(
			"UPDATE tickets SET scheduled_date = ?, ticket_category = ?, price = ? WHERE ticket_id = ?",
			[scheduled_date, ticket_category, price, ticket_id],
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
						message: "Ticket has been updated successfully",
					})
				);
			}
		);
	});
};

const createTicket = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { scheduled_date, ticket_category, price } = JSON.parse(body);

		dbConnection.query(
			"INSERT INTO tickets (scheduled_date, ticket_category, price) VALUES (?, ?, ?)",
			[scheduled_date, ticket_category, price],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(
						JSON.stringify({
							error_message: "Internal Server Error",
						})
					);
					return;
				}

				res.writeHead(201, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						message: "Ticket has been added successfully",
						ticket_id: result.insertId,
					})
				);
			}
		);
	});
};

const getAllTicketPricing = (req, res) => {
	dbConnection.query(
		"SELECT * FROM tickettype ORDER BY price",
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

			if (!result || result.length === 0) {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						error: "No ticket pricing data found",
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

const updateTicketPricing = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { category, price, ticket_type_id } = JSON.parse(body);

		dbConnection.query(
			"UPDATE tickettype SET category = ?, price = ? WHERE ticket_type_id = ?",
			[category, price, ticket_type_id],
			(err) => {
				if (err) {
					console.log(err);
					if (err.code === "ER_DUP_ENTRY") {
						res.writeHead(400, { "Content-Type": "application/json" });
						res.end(
							JSON.stringify({
								error_message: "Category already exists",
							})
						);
					} else {
						res.writeHead(500, { "Content-Type": "application/json" });
						res.end(
							JSON.stringify({
								error: "Internal Server Error",
							})
						);
					}
					return;
				}

				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						message: "Ticket pricing has been updated successfully",
					})
				);
			}
		);
	});
};

const getSingleTicketPrice = (req, res, ticket_type_id) => {
	dbConnection.query(
		"SELECT * FROM tickettype WHERE ticket_type_id = ?",
		[ticket_type_id],
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
						error: "Ticket pricing does not exist",
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

const createTicketPricing = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { category, price } = JSON.parse(body);

		dbConnection.query(
			"INSERT INTO tickettype (category, price) VALUES (?, ?)",
			[category, price],
			(err, result) => {
				if (err) {
					console.log(err);
					if (err.code === "ER_DUP_ENTRY") {
						res.writeHead(400, { "Content-Type": "application/json" });
						res.end(
							JSON.stringify({
								error_message: "Category already exists",
							})
						);
					} else {
						res.writeHead(500, { "Content-Type": "application/json" });
						res.end(
							JSON.stringify({
								error: "Internal Server Error",
							})
						);
					}
					return;
				}

				res.writeHead(201, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						message: "Ticket pricing has been added successfully",
						ticket_type_id: result.insertId,
					})
				);
			}
		);
	});
};

module.exports = {
	getSingleTicket,
	getAllTickets,
	updateTicket,
	createTicket,
	getAllTicketPricing,
	updateTicketPricing,
	getSingleTicketPrice,
	createTicketPricing,
};
