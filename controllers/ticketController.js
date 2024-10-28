// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * Ticket Schema
 * ticket_id: int
 * scheduled_date: date
 * ticket_category: string = "Adult", "Child", "Senior", "Veteran", Student"
 * price: float
 **/

const getSingleTicket = (req, res, ticket_id) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			ticket_id_params: ticket_id,
			data: {
				ticket_id: 1,
				scheduled_date: "2021-01-01",
				ticket_category: "Adult",
				price: 10.0,
			},
		})
	);
};

const getAllTickets = (req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			data: [
				{
					ticket_id: 1,
					scheduled_date: "2021-01-01",
					ticket_category: "Adult",
					price: 10.0,
				},
			],
		})
	);
};

const updateTicket = (req, res, ticket_id) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { scheduled_date, ticket_category, price } = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { ticket_id, scheduled_date, ticket_category, price },
			})
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

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: { ticket_id: 1234567, scheduled_date, ticket_category, price },
			})
		);
	});
};

module.exports = {
	getSingleTicket,
	getAllTickets,
	updateTicket,
	createTicket,
};
