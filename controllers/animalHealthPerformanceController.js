const { dbConnection } = require("../db.js");

/*
SELECT 
    a.animal_id,
    a.name AS animal_name,
    a.scientific_name,
    SUM(af.quantity) AS total_food_quantity,
    GROUP_CONCAT(DISTINCT f.food_name SEPARATOR ', ') AS food_types,
    MIN(vr.measured_weight) AS min_weight,
    MAX(vr.measured_weight) AS max_weight,
    (MAX(vr.measured_weight) - MIN(vr.measured_weight)) AS net_weight_change,
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
    af.feeding_date BETWEEN '2024-01-01' AND '2024-12-31'
    AND vr.checkup_date BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY 
    a.animal_id, a.name, a.scientific_name
ORDER BY 
    a.name;
*/

const getAnimalHealthPerformance = (req, res) => {
	dbConnection.query(
		`SELECT 
            a.animal_id,
            a.name AS animal_name,
            a.scientific_name,
            SUM(af.quantity) AS total_food_quantity,
            GROUP_CONCAT(DISTINCT f.food_name SEPARATOR ', ') AS food_types,
            MIN(vr.measured_weight) AS min_weight,
            MAX(vr.measured_weight) AS max_weight,
            (MAX(vr.measured_weight) - MIN(vr.measured_weight)) AS net_weight_change,
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
            a.animal_id, a.name, a.scientific_name
        ORDER BY 
            a.name;
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

const getAnimalHealthPerformanceByDate = (req, res, start_date, end_date) => {
	dbConnection.query(
		`SELECT 
            a.animal_id,
            a.name AS animal_name,
            a.scientific_name,
            SUM(af.quantity) AS total_food_quantity,
            GROUP_CONCAT(DISTINCT f.food_name SEPARATOR ', ') AS food_types,
            MIN(vr.measured_weight) AS min_weight,
            MAX(vr.measured_weight) AS max_weight,
            (MAX(vr.measured_weight) - MIN(vr.measured_weight)) AS net_weight_change,
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
        GROUP BY 
            a.animal_id, a.name, a.scientific_name
        ORDER BY 
            a.name;
        `,
		[start_date, end_date, start_date, end_date],
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
	getAnimalHealthPerformanceByDate,
};
