const { dbConnection } = require("../db.js");
const { sickAnimalNotificationStoredProcedure } = require("./triggerUtil.js");

/**
 * Vet Report Schema
 * vet_report_id: int
 * title: string
 * measured_weight: float
 * diagnosis: string
 * symptoms: string
 * animal_id: int
 * veterinarian_id: int
 * treatment: string
 * checkup_date: date
 * health_status: string = ["Healthy", "Sick", "Injured"]
 * created_at: date
 * updated_at: date
 **/

const getSingleVetReport = (req, res, vet_report_id) => {
	dbConnection.query(
		"SELECT vr.vet_report_id, vr.title, vr.measured_weight, vr.measured_height, vr.diagnosis, vr.symptoms, vr.animal_id, vr.health_status, vr.veterinarian_id, vr.checkup_date, vr.created_at, vr.updated_at, vr.treatment, a.name AS animal_name, a.nickname, e.first_name, e.last_name FROM veterinaryreports AS vr JOIN animals AS a ON vr.animal_id = a.animal_id JOIN employees AS e ON vr.veterinarian_id = e.employee_id WHERE vr.vet_report_id = ?",
		[vet_report_id],
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
						error: "Vet report does not exist",
					})
				);
				return;
			}

			console.log(result);

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: result[0],
				})
			);
		}
	);
};

const getAllVetReports = (req, res) => {
	dbConnection.query(
		"SELECT * FROM veterinaryreports ORDER BY created_at DESC",
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

const updateVetReport = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const {
			title,
			measured_weight,
			measured_height,
			diagnosis,
			symptoms,
			animal_id,
			veterinarian_id,
			treatment,
			checkup_date,
			health_status,
			vet_report_id,
		} = JSON.parse(body);

		dbConnection.query(
			"UPDATE veterinaryreports SET title = ?, measured_weight = ?, measured_height = ?, diagnosis = ?, symptoms = ?, animal_id = ?, veterinarian_id = ?, treatment = ?, checkup_date = ?, health_status = ? WHERE vet_report_id = ?",
			[
				title,
				measured_weight,
				measured_height,
				diagnosis,
				symptoms,
				animal_id,
				veterinarian_id,
				treatment,
				checkup_date,
				health_status,
				vet_report_id,
			],
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
						message: "Vet report has been updated successfully",
					})
				);
			}
		);
	});
};

const createVetReport = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const {
			title,
			measured_weight,
			measured_height,
			diagnosis,
			symptoms,
			treatment,
			animal_id,
			health_status,
			veterinarian_id,
			checkup_date,
			created_at,
			updated_at,
		} = JSON.parse(body);

		dbConnection.query(
			"INSERT INTO veterinaryreports (title, measured_weight, measured_height, diagnosis, symptoms, treatment, animal_id, health_status, veterinarian_id, checkup_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				title,
				measured_weight,
				measured_height,
				diagnosis,
				symptoms,
				treatment,
				animal_id,
				health_status,
				veterinarian_id,
				checkup_date,
				created_at,
				updated_at,
			],
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

				if (health_status === "Sick" || health_status === "Injured") {
					sickAnimalNotificationStoredProcedure();
				}

				res.writeHead(201, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						message: "Vet report has been created successfully",
						vet_report_id: result.insertId,
					})
				);
			}
		);
	});
};

const getVetReportsByAnimal = (
	req,
	res,
	animal_name,
	nickname,
	start_date,
	end_date
) => {
	dbConnection.query(
		"SELECT vr.vet_report_id, vr.title, vr.measured_weight, vr.diagnosis, vr.symptoms, vr.animal_id, vr.health_status, vr.veterinarian_id, vr.checkup_date, vr.created_at, vr.updated_at, vr.treatment, a.name AS animal_name, a.nickname, e.first_name, e.last_name FROM veterinaryreports AS vr JOIN animals AS a ON vr.animal_id = a.animal_id JOIN employees AS e ON vr.veterinarian_id = e.employee_id WHERE a.name = ? AND vr.checkup_date BETWEEN ? AND ? AND a.nickname = ? ORDER BY vr.created_at DESC",
		[animal_name, start_date, end_date, nickname],
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

const setAnimalHealthStatus = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { health_status, animal_id } = JSON.parse(body);

		dbConnection.query(
			"UPDATE animals SET health_status = ? WHERE animal_id = ?",
			[health_status, animal_id],
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
						message: "Animal health status has been updated successfully",
					})
				);
			}
		);
	});
};

module.exports = {
	getSingleVetReport,
	getAllVetReports,
	updateVetReport,
	createVetReport,
	getVetReportsByAnimal,
	setAnimalHealthStatus,
};
