const { dbConnection } = require("../db.js");

const getAnimals = (req, res) => {
	dbConnection.query(
		"SELECT * FROM animals WHERE availability_status = 'Present'",
		(err, results) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: results,
				})
			);
		}
	);
};

const getAnimalFoodEaten = (req, res) => {
	dbConnection.query("SELECT * FROM animalfoodeaten", (err, results) => {
		if (err) {
			console.log(err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Internal Server Error" }));
			return;
		}

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: results,
			})
		);
	});
};

const getAnimalFood = (req, res) => {
	dbConnection.query("SELECT * FROM animalfood", (err, results) => {
		if (err) {
			console.log(err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Internal Server Error" }));
			return;
		}

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: results,
			})
		);
	});
};

const getRawCostData = (req, res) => {
	dbConnection.query(
		`SELECT 
            a.name,
            afe.quantity AS food_eaten,
            afe.feeding_date,
            af.food_name,
            af.food_type,
            afp.purchased_price,
            afp.quantity,
            afp.date_purchased
        FROM
            animals AS a
            JOIN animalfoodeaten AS afe ON a.animal_id = afe.animal_id
            JOIN animalfood AS af ON afe.animal_food_id = af.animal_food_id
            JOIN animalfoodpurchases AS afp ON af.animal_food_id = afp.animal_food_id
            ORDER BY a.name, afp.date_purchased DESC
            `,
		(err, results) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: results,
				})
			);
		}
	);
};

const getCostAnalysis = (req, res) => {
	dbConnection.query(
		`SELECT
            a.name,
            SUM(afe.quantity) AS food_eaten,
            af.food_name,
            af.food_type,
            ROUND((SUM(afe.quantity) / SUM(afp.quantity)) * SUM(afp.quantity * afp.purchased_price), 2) AS food_eaten_cost,
            SUM(afp.quantity * afp.purchased_price) AS cumulative_purchase_cost
        FROM
            animals AS a
            JOIN animalfoodeaten AS afe ON a.animal_id = afe.animal_id
            JOIN animalfood AS af ON afe.animal_food_id = af.animal_food_id
            JOIN animalfoodpurchases AS afp ON af.animal_food_id = afp.animal_food_id
        WHERE afe.quantity IS NOT NULL AND afe.quantity > 0
        GROUP BY a.name, af.food_name, af.food_type
        ORDER BY a.name, af.food_name
        `,
		(err, results) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: results,
				})
			);
		}
	);
};

const getRawCostDataByDate = (req, res, animal_name, start_date, end_date) => {
	dbConnection.query(
		`SELECT 
			a.name,
			afe.quantity AS food_eaten,
            afe.feeding_date,
			af.food_name,
			af.food_type,
			afp.purchased_price,
			afp.quantity,
			afp.date_purchased
		FROM
			animals AS a
			JOIN animalfoodeaten AS afe ON a.animal_id = afe.animal_id
			JOIN animalfood AS af ON afe.animal_food_id = af.animal_food_id
			JOIN animalfoodpurchases AS afp ON af.animal_food_id = afp.animal_food_id
			WHERE afp.date_purchased BETWEEN ? AND ?
			AND afe.feeding_date BETWEEN ? AND ?
			AND a.name = ?
			ORDER BY a.name, afp.date_purchased DESC
		`,
		[start_date, end_date, start_date, end_date, animal_name],
		(err, results) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: results,
				})
			);
		}
	);
};

const getCostAnalysisByDate = (req, res, animal_name, start_date, end_date) => {
	dbConnection.query(
		`SELECT
            a.name,
            SUM(afe.quantity) AS food_eaten,
            af.food_name,
            af.food_type,
            ROUND((SUM(afe.quantity) / SUM(afp.quantity)) * SUM(afp.quantity * afp.purchased_price), 2) AS food_eaten_cost,
            SUM(afp.quantity * afp.purchased_price) AS cumulative_purchase_cost
        FROM
            animals AS a
            JOIN animalfoodeaten AS afe ON a.animal_id = afe.animal_id
            JOIN animalfood AS af ON afe.animal_food_id = af.animal_food_id
            JOIN animalfoodpurchases AS afp ON af.animal_food_id = afp.animal_food_id
        WHERE
            afp.date_purchased BETWEEN ? AND ?
            AND afe.feeding_date BETWEEN ? AND ?
			AND a.name = ?
        GROUP BY a.name, af.food_name, af.food_type
        ORDER BY a.name, af.food_name
        `,
		[start_date, end_date, start_date, end_date, animal_name],
		(err, results) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: results,
				})
			);
		}
	);
};

module.exports = {
	getAnimals,
	getAnimalFoodEaten,
	getAnimalFood,
	getRawCostData,
	getCostAnalysis,
	getRawCostDataByDate,
	getCostAnalysisByDate,
};
