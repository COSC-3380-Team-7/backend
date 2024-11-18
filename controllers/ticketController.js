const { dbConnection } = require("../db.js");

/**
 * Ticket Schema
 * ticket_id: int
 * scheduled_date: date
 * ticket_category: string = "Adult", "Child", "Senior", "Veteran", "Student"
 * price: float
 **/

// const getSingleTicket = (req, res, ticket_id) => {
// 	dbConnection.query(
// 		"SELECT * FROM tickets WHERE ticket_id = ?",
// 		[ticket_id],
// 		(err, result) => {
// 			if (err) {
// 				console.log(err);
// 				res.writeHead(500, { "Content-Type": "application/json" });
// 				res.end(
// 					JSON.stringify({
// 						error: "Internal Server Error",
// 					})
// 				);
// 				return;
// 			}

// 			if (result.length === 0) {
// 				res.writeHead(404, { "Content-Type": "application/json" });
// 				res.end(
// 					JSON.stringify({
// 						error: "Ticket does not exist",
// 					})
// 				);
// 				return;
// 			}

// 			res.writeHead(200, { "Content-Type": "application/json" });
// 			res.end(
// 				JSON.stringify({
// 					data: result[0],
// 				})
// 			);
// 		}
// 	);
// };

const getSingleTicket = (req, res, ticket_type_id) => {
	dbConnection.query(
	  "SELECT * FROM tickettype WHERE ticket_type_id = ?",
	  [ticket_type_id],
	  (err, result) => {
		if (err) {
		  console.error("Database Query Error:", err);
		  res.writeHead(500, { "Content-Type": "application/json" });
		  res.end(JSON.stringify({ error: "Internal Server Error" }));
		  return;
		}
  
		if (result.length === 0) {
		  res.writeHead(404, { "Content-Type": "application/json" });
		  res.end(JSON.stringify({ error: "Ticket type not found" }));
		  return;
		}
  
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ data: result[0] }));
	  }
	);
  };
  

// const getAllTickets = (req, res) => {
// 	dbConnection.query("SELECT * FROM tickets", (err, result) => {
// 		if (err) {
// 			console.log(err);
// 			res.writeHead(500, { "Content-Type": "application/json" });
// 			res.end(
// 				JSON.stringify({
// 					error: "Internal Server Error",
// 				})
// 			);
// 			return;
// 		}

// 		res.writeHead(200, { "Content-Type": "application/json" });
// 		res.end(
// 			JSON.stringify({
// 				data: result,
// 			})
// 		);
// 	});
// };

const getAllTickets = (req, res) => {
	dbConnection.query("SELECT * FROM tickettype ORDER BY price", (err, result) => {
	  if (err) {
		console.error("Database Query Error:", err);
		res.writeHead(500, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "Internal Server Error" }));
		return;
	  }
  
	  res.writeHead(200, { "Content-Type": "application/json" });
	  res.end(JSON.stringify({ data: result }));
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

// const createTicket = (req, res) => {
// 	let body = "";
// 	req.on("data", (chunk) => {
// 		body += chunk.toString();
// 	});

// 	req.on("end", () => {
// 		const { scheduled_date, ticket_category, price } = JSON.parse(body);

// 		dbConnection.query(
// 			"INSERT INTO tickets (scheduled_date, ticket_category, price) VALUES (?, ?, ?)",
// 			[scheduled_date, ticket_category, price],
// 			(err, result) => {
// 				if (err) {
// 					console.log(err);
// 					res.writeHead(500, { "Content-Type": "application/json" });
// 					res.end(
// 						JSON.stringify({
// 							error: "Internal Server Error",
// 						})
// 					);
// 					return;
// 				}

// 				res.writeHead(201, { "Content-Type": "application/json" });
// 				res.end(
// 					JSON.stringify({
// 						message: "Ticket has been added successfully",
// 						ticket_id: result.insertId,
// 					})
// 				);
// 			}
// 		);
// 	});
// };

const createTicket = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
	  body += chunk.toString();
	});
  
	req.on("end", () => {
	  const { visitor_id, purchase_date, purchase_price, ticket_type_id, scheduled_date, quantity_purchased, exhibit_id } = JSON.parse(body);
  
	  dbConnection.query(
		"INSERT INTO ticketpurchases (visitor_id, purchase_date, purchase_price, ticket_type_id, scheduled_date, quantity_purchased, exhibit_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
		[visitor_id, purchase_date, purchase_price, ticket_type_id, scheduled_date, quantity_purchased, exhibit_id],
		(err, result) => {
		  if (err) {
			console.error("Database Query Error:", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Internal Server Error" }));
			return;
		  }
  
		  res.writeHead(201, { "Content-Type": "application/json" });
		  res.end(
			JSON.stringify({
			  message: "Ticket purchase has been added successfully",
			  purchase_id: result.insertId,
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

const updateTicketPricing = (req, res, ticket_type_id) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { category, price } = JSON.parse(body);

		dbConnection.query(
			"UPDATE tickettype SET category = ?, price = ? WHERE ticket_type_id = ?",
			[category, price, ticket_type_id],
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
						message: "Ticket pricing has been added successfully",
						ticket_type_id: result.insertId,
					})
				);
			}
		);
	});
};

const createTicketPurchase = (req, res) => {
	let body = "";
  
	req.on("data", (chunk) => {
	  body += chunk.toString();
	});
  
	req.on("end", () => {
	  const { visitor_id, purchase_date, scheduled_date, purchases } =
		JSON.parse(body);
  
	  // Build the query for bulk insert
	  const values = purchases.map((purchase) => [
		visitor_id,
		purchase_date,
		purchase.purchase_price,
		purchase.ticket_type_id,
		scheduled_date,
		purchase.quantity_purchased,
		null, // Assume exhibit_id is null for now or replace with valid data
	  ]);
	  console.log(values)
	  values.forEach(row => {
		if (row[row.length - 1] === null) {
		  row[row.length - 1] = 1000000;
		}
	  });
	  
	  console.log(values);
  
	  dbConnection.query(
		
		"INSERT INTO ticketpurchases (visitor_id, purchase_date, purchase_price, ticket_type_id, scheduled_date, quantity_purchased, exhibit_id) VALUES ?",
		[values],
		(err, result) => {
		  if (err) {
			console.error("Database Error:", err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(
			  JSON.stringify({ error: "Failed to insert ticket purchases" })
			);
			return;
		  }
  
		  res.writeHead(201, { "Content-Type": "application/json" });
		  res.end(
			JSON.stringify({
			  message: "Ticket purchases successfully added",
			  affectedRows: result.affectedRows,
			})
		  );
		}
	  );
	});
  };
  


module.exports = {
	getSingleTicket,
	createTicketPurchase,
	getAllTickets,
	updateTicket,
	createTicket,
	getAllTicketPricing,
	updateTicketPricing,
	getSingleTicketPrice,
	createTicketPricing,
};
