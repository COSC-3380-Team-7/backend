const { dbConnection } = require("../db.js");

const getAllAnimalFood = (req, res) => {
	dbConnection.query("SELECT * FROM animalfood", (err, result) => {
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

const createAnimalFood = (req, res) => {
	/*
        animal_food_id bigint PK 
        food_name varchar(50) 
        stock int 
        food_img blob
    */
	let body = "";

	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { food_name, stock, food_type } = JSON.parse(body);

		dbConnection.query(
			"INSERT INTO animalfood (food_name, stock, food_type) VALUES (?, ?, ?)",
			[food_name, stock, food_type],
			(err) => {
				if (err) {
					console.log(err);
					if (err.code === "ER_DUP_ENTRY") {
						res.writeHead(400, { "Content-Type": "application/json" });
						res.end(
							JSON.stringify({ error_message: "Food with name already exists" })
						);
					} else {
						res.writeHead(500, { "Content-Type": "application/json" });
						res.end(JSON.stringify({ error: "Internal Server Error" }));
					}
					return;
				}

				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ data: "Animal Food created" }));
			}
		);
	});
};

const updateAnimalFood = (req, res) => {
	let body = "";

	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { food_name, stock, food_type, animal_food_id } = JSON.parse(body);

		dbConnection.query(
			"UPDATE animalfood SET food_name = ?, stock = ?, food_type = ? WHERE animal_food_id = ?",
			[food_name, stock, food_type, animal_food_id],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ data: "Animal Food updated" }));
			}
		);
	});
};

const getSingleAnimalFood = (req, res, food_id) => {
	dbConnection.query(
		"SELECT * FROM animalfood WHERE animal_food_id = ?",
		[food_id],
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}

			if (result.length === 0) {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Animal Food does not exist" }));
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ data: result[0] }));
		}
	);
};

const updateAnimalFoodStock = (req, res) => {
	let body = "";

	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { stock, animal_food_id } = JSON.parse(body);

		dbConnection.query(
			"UPDATE animalfood SET stock = ? WHERE animal_food_id = ?",
			[stock, animal_food_id],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ data: "Animal Food stock updated" }));
			}
		);
	});
};

const deleteAnimalFood = (req, res, food_id) => {
	dbConnection.query(
		"DELETE FROM animalfood WHERE animal_food_id = ?",
		[food_id],
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ data: "Animal Food deleted" }));
		}
	);
};

const purchaseAnimalFood = (req, res) => {
	let body = "";

	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { vendor_name, purchased_price, quantity, animal_food_id } =
			JSON.parse(body);

		dbConnection.query(
			"INSERT INTO animalfoodpurchases (vendor_name, purchased_price, quantity, animal_food_id) VALUES (?, ?, ?, ?)",
			[vendor_name, purchased_price, quantity, animal_food_id],
			(err) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				dbConnection.query(
					"SELECT stock FROM animalfood WHERE animal_food_id = ?",
					[animal_food_id],
					(err, result) => {
						if (err) {
							res.writeHead(500, { "Content-Type": "application/json" });
							res.end(JSON.stringify({ error: "Internal Server Error" }));
							return;
						}

						const currentStock = result[0].stock;
						const newStock = currentStock + quantity;

						dbConnection.query(
							"UPDATE animalfood SET stock = ? WHERE animal_food_id = ?",
							[newStock, animal_food_id],
							(err) => {
								if (err) {
									res.writeHead(500, { "Content-Type": "application/json" });
									res.end(JSON.stringify({ error: "Internal Server Error" }));
									return;
								}

								res.writeHead(200, { "Content-Type": "application/json" });
								res.end(JSON.stringify({ data: "Animal Food purchased" }));
							}
						);
					}
				);
			}
		);
	});
};

const feedAnimal = (req, res) => {
	let body = "";

	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { animal_id, animal_food_id, quantity } = JSON.parse(body);

		dbConnection.query(
			"SELECT stock, food_name FROM animalfood WHERE animal_food_id = ?",
			[animal_food_id],
			(err, result) => {
				if (err) {
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				const currentStock = result[0].stock;

				if (currentStock < quantity) {
					res.writeHead(400, { "Content-Type": "application/json" });
					res.end(
						JSON.stringify({
							error_message: `Not enough animal food in stock have 
							${currentStock} ${result[0].food_name} remaining
							`,
						})
					);
					return;
				}

				const newStock = currentStock - quantity;

				dbConnection.query(
					"UPDATE animalfood SET stock = ? WHERE animal_food_id = ?",
					[newStock, animal_food_id],
					(err) => {
						if (err) {
							res.writeHead(500, { "Content-Type": "application/json" });
							res.end(JSON.stringify({ error: "Internal Server Error" }));
							return;
						}

						dbConnection.query(
							"INSERT INTO animalfoodeaten (animal_id, animal_food_id, quantity) VALUES (?, ?, ?)",
							[animal_id, animal_food_id, quantity],
							(err) => {
								if (err) {
									res.writeHead(500, { "Content-Type": "application/json" });
									res.end(JSON.stringify({ error: "Internal Server Error" }));
									return;
								}

								res.writeHead(200, { "Content-Type": "application/json" });
								res.end(JSON.stringify({ data: "Animal fed" }));
							}
						);
					}
				);
			}
		);
	});
};

module.exports = {
	getAllAnimalFood,
	getSingleAnimalFood,
	createAnimalFood,
	updateAnimalFood,
	updateAnimalFoodStock,
	deleteAnimalFood,
	purchaseAnimalFood,
	feedAnimal,
};
