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
		const { food_name, stock, food_img } = JSON.parse(body);

		dbConnection.query(
			"INSERT INTO animalfood (food_name, stock, food_img) VALUES (?, ?, ?)",
			[food_name, stock, food_img],
			(err, result) => {
				if (err) {
					console.log(err);
					if (err.code === "ER_DUP_ENTRY") {
						res.writeHead(409, { "Content-Type": "application/json" });
						res.end(JSON.stringify({ error: "Food name already exists" }));
					} else {
						res.writeHead(500, { "Content-Type": "application/json" });
						res.end(JSON.stringify({ error: "Internal Server Error" }));
					}
					return;
				}

				res.writeHead(201, { "Content-Type": "application/json" });
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
		const { food_name, stock, food_img } = JSON.parse(body);

		dbConnection.query(
			"UPDATE animalfood SET food_name = ?, stock = ?, food_img = ? WHERE animal_food_id = ?",
			[food_name, stock, food_img, food_id],
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

module.exports = {
	getAllAnimalFood,
	getSingleAnimalFood,
	createAnimalFood,
	updateAnimalFood,
};
