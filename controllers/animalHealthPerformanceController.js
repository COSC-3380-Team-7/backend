const { dbConnection } = require("../db.js");

const getRawAnimalFoodEatenMetrics = (req, res) => {
	dbConnection.query(
		`SELECT 
            a.animal_id,
            a.name AS animal_name,
            a.nickname,
            f.food_name,
            f.food_type,
            af.quantity AS amount_eaten,
            af.feeding_date
        FROM 
            animalfoodeaten af
        JOIN 
            animals a ON af.animal_id = a.animal_id
        JOIN 
            animalfood f ON af.animal_food_id = f.animal_food_id
        ORDER BY 
            a.name, af.feeding_date DESC
        `,
		[],
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

const getAnimalFoodEatenMetricsByNameDate = (
	req,
	res,
	animal_name,
	nickname,
	start_date,
	end_date
) => {
	dbConnection.query(
		`SELECT 
            a.animal_id,
            a.name AS animal_name,
            a.nickname,
            f.food_name,
            f.food_type,
            af.quantity AS amount_eaten,
            af.feeding_date
        FROM 
            animalfoodeaten af
        JOIN 
            animals a ON af.animal_id = a.animal_id
        JOIN 
            animalfood f ON af.animal_food_id = f.animal_food_id
        WHERE 
            af.feeding_date BETWEEN ? AND ?
            AND a.name = ?
            AND a.nickname = ?
        ORDER BY 
            a.name, af.feeding_date DESC
        `,
		[start_date, end_date, animal_name, nickname],
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

const getRawVetReportMetrics = (req, res) => {
	dbConnection.query(
		`SELECT 
            a.animal_id,
            a.name AS animal_name,
            a.nickname,
            vr.measured_weight,
            vr.measured_height,
            vr.health_status,
            vr.checkup_date
        FROM 
            animals a
        JOIN 
            veterinaryreports vr ON a.animal_id = vr.animal_id
        ORDER BY 
            a.name, vr.checkup_date DESC
        `,
		[],
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

const getVetReportMetricsByNameDate = (
	req,
	res,
	animal_name,
	nickname,
	start_date,
	end_date
) => {
	dbConnection.query(
		`SELECT 
            a.animal_id,
            a.name AS animal_name,
            a.nickname,
            vr.measured_weight,
            vr.measured_height,
            vr.health_status,
            vr.checkup_date
        FROM 
            animals a
        JOIN 
            veterinaryreports vr ON a.animal_id = vr.animal_id
        WHERE 
            vr.checkup_date BETWEEN ? AND ?
            AND a.name = ?
            AND a.nickname = ?
        ORDER BY 
            a.name, vr.checkup_date DESC
        `,
		[start_date, end_date, animal_name, nickname],
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

const getAnimalHealthPerformance = (req, res) => {
	dbConnection.query(
		`SELECT 
            a.animal_id,
            a.name AS animal_name,
            a.nickname,
            SUM(af.quantity) AS total_food_quantity,
            GROUP_CONCAT(DISTINCT f.food_name SEPARATOR ', ') AS food_types,
            MIN(vr.measured_weight) AS min_weight,
            MAX(vr.measured_weight) AS max_weight,
            (MAX(vr.measured_weight) - MIN(vr.measured_weight)) AS net_weight_change,
            MIN(vr.measured_height) AS min_height,
            MAX(vr.measured_height) AS max_height,
            (MAX(vr.measured_height) - MIN(vr.measured_height)) AS net_height_change,
            SUM(CASE WHEN vr.health_status = 'Sick' THEN 1 ELSE 0 END) AS sick_count,
            SUM(CASE WHEN vr.health_status = 'Injured' THEN 1 ELSE 0 END) AS injured_count,
            COUNT(vr.vet_report_id) AS total_checkups
        FROM 
            animalfoodeaten af
        JOIN 
            animals a ON af.animal_id = a.animal_id
        JOIN 
            animalfood f ON af.animal_food_id = f.animal_food_id
        JOIN 
            veterinaryreports vr ON a.animal_id = vr.animal_id
        GROUP BY 
            a.animal_id, a.name, a.nickname
        ORDER BY 
            a.name
        `,
		[],
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

const getAnimalHealthPerformanceByNameDate = (
	req,
	res,
	animal_name,
	nickname,
	start_date,
	end_date
) => {
	dbConnection.query(
		`SELECT 
            a.animal_id,
            a.name AS animal_name,
            a.nickname,
            SUM(af.quantity) AS total_food_quantity,
            GROUP_CONCAT(DISTINCT f.food_name SEPARATOR ', ') AS food_types,
            MIN(vr.measured_weight) AS min_weight,
            MAX(vr.measured_weight) AS max_weight,
            (MAX(vr.measured_weight) - MIN(vr.measured_weight)) AS net_weight_change,
            MIN(vr.measured_height) AS min_height,
            MAX(vr.measured_height) AS max_height,
            (MAX(vr.measured_height) - MIN(vr.measured_height)) AS net_height_change,
            SUM(CASE WHEN vr.health_status = 'Sick' THEN 1 ELSE 0 END) AS sick_count,
            SUM(CASE WHEN vr.health_status = 'Injured' THEN 1 ELSE 0 END) AS injured_count,
            COUNT(vr.vet_report_id) AS total_checkups
        FROM 
            animalfoodeaten af
        JOIN 
            animals a ON af.animal_id = a.animal_id
        JOIN 
            animalfood f ON af.animal_food_id = f.animal_food_id
        JOIN 
            veterinaryreports vr ON a.animal_id = vr.animal_id
        WHERE 
            af.feeding_date BETWEEN ? AND ?
            AND vr.checkup_date BETWEEN ? AND ?
            AND a.name = ?
            AND a.nickname = ?
        GROUP BY 
            a.animal_id, a.name, a.nickname
        ORDER BY 
            a.name;
        `,
		[start_date, end_date, start_date, end_date, animal_name, nickname],
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
	getAnimalHealthPerformance,
	getRawAnimalFoodEatenMetrics,
	getRawVetReportMetrics,
	getAnimalHealthPerformanceByNameDate,
	getAnimalFoodEatenMetricsByNameDate,
	getVetReportMetricsByNameDate,
};
