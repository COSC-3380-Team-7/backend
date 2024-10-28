// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

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
 * checkup_date date
 * health_status: string = ["Healthy", "Sick", "Injured"]
 * created_at date
 * updated_at date
 **/

const getSingleVetReport = (req, res, vet_report_id) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			vet_report_id_params: vet_report_id,
			data: {
				vet_report_id: 1,
				title: "Vet Report 1",
				measured_weight: 1.0,
				diagnosis: "Diagnosis of Vet Report 1",
				symptoms: "Symptoms of Vet Report 1",
				animal_id: 1,
				veterinarian_id: 1,
				treatment: "Treatment of Vet Report 1",
				checkup_date: "2021-01-01",
				health_status: "Sick",
				created_at: "2021-01-01",
				updated_at: "2021-01-01",
			},
		})
	);
};

const getAllHabitats = (req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			data: [
				{
					vet_report_id: 1,
					title: "Vet Report 1",
					measured_weight: 1.0,
					diagnosis: "Diagnosis of Vet Report 1",
					symptoms: "Symptoms of Vet Report 1",
					animal_id: 1,
					veterinarian_id: 1,
					treatment: "Treatment of Vet Report 1",
					checkup_date: "2021-01-01",
					health_status: "Sick",
					created_at: "2021-01-01",
					updated_at: "2021-01-01",
				},
			],
		})
	);
};

const updateHabitat = (req, res, vet_report_id) => {
	console.log(vet_report_id);
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const {
			title,
			measured_weight,
			diagnosis,
			symptoms,
			animal_id,
			veterinarian_id,
			treatment,
			checkup_date,
			health_status,
			created_at,
			updated_at,
		} = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: {
					vet_report_id,
					title,
					measured_weight,
					diagnosis,
					symptoms,
					animal_id,
					veterinarian_id,
					treatment,
					checkup_date,
					health_status,
					created_at,
					updated_at,
				},
			})
		);
	});
};

const createHabitat = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const {
			title,
			measured_weight,
			diagnosis,
			symptoms,
			animal_id,
			veterinarian_id,
			treatment,
			checkup_date,
			health_status,
			created_at,
			updated_at,
		} = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: {
					vet_report_id: 1234567,
					title,
					measured_weight,
					diagnosis,
					symptoms,
					animal_id,
					veterinarian_id,
					treatment,
					checkup_date,
					health_status,
					created_at,
					updated_at,
				},
			})
		);
	});
};

module.exports = {
	getSingleVetReport,
	getAllHabitats,
	updateHabitat,
	createHabitat,
};
