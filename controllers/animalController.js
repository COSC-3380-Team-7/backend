// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * Animal Schema
 * animal_id: int
 * name: string
 * description: string
 * scientific_name: string
 * height: int
 * weight: float
 * date_of_birth: date
 * gender: string
 * origin: string
 * arrival_date: date
 * age: int
 * species: string
 * [Optional] removal_reason: string
 * animal_fact: string
 * geographic_range: string
 * image_cloud_link: string
 * conservation_status: string
 * availability_status: string
 * habitat_id: int
 **/

const getSingleAnimal = (req, res, animal_id) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			animal_id_params: animal_id,
			data: {
				animal_id: 1,
				name: "Animal 1",
				description: "Description of Animal 1",
				scientific_name: "Scientific Name of Animal 1",
				height: 1,
				weight: 1.0,
				date_of_birth: "2021-01-01",
				gender: "Male",
				origin: "Origin of Animal 1",
				arrival_date: "2021-01-01",
				age: 1,
				species: "Species of Animal 1",
				removal_reason: "Removal Reason of Animal 1",
				animal_fact: "Animal Fact of Animal 1",
				geographic_range: "Geographic Range of Animal 1",
				image_cloud_link: "Image Cloud Link of Animal 1",
				conservation_status: "Conservation Status of Animal 1",
				availability_status: "Availability Status of Animal 1",
				habitat_id: 1,
			},
		})
	);
};

const getAllAnimals = (req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			data: [
				{
					animal_id: 1,
					name: "Animal 1",
					description: "Description of Animal 1",
					scientific_name: "Scientific Name of Animal 1",
					height: 1,
					weight: 1.0,
					date_of_birth: "2021-01-01",
					gender: "Male",
					origin: "Origin of Animal 1",
					arrival_date: "2021-01-01",
					age: 1,
					species: "Species of Animal 1",
					removal_reason: "Removal Reason of Animal 1",
					animal_fact: "Animal Fact of Animal 1",
					geographic_range: "Geographic Range of Animal 1",
					image_cloud_link: "Image Cloud Link of Animal 1",
					conservation_status: "Conservation Status of Animal 1",
					availability_status: "Availability Status of Animal 1",
					habitat_id: 1,
				},
			],
		})
	);
};

const updateAnimal = (req, res, animal_id) => {
	console.log(animal_id);
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const {
			name,
			scientific_name,
			height,
			weight,
			date_of_birth,
			gender,
			origin,
			arrival_date,
			age,
			species,
			removal_reason,
			animal_fact,
			geographic_range,
			image_cloud_link,
			conservation_status,
			availability_status,
			habitat_id,
		} = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: {
					animal_id: 1234567,
					name,
					scientific_name,
					height,
					weight,
					date_of_birth,
					gender,
					origin,
					arrival_date,
					age,
					species,
					removal_reason,
					animal_fact,
					geographic_range,
					image_cloud_link,
					conservation_status,
					availability_status,
					habitat_id,
				},
			})
		);
	});
};

const createAnimal = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const {
			name,
			scientific_name,
			height,
			weight,
			date_of_birth,
			gender,
			origin,
			arrival_date,
			age,
			species,
			removal_reason,
			animal_fact,
			geographic_range,
			image_cloud_link,
			conservation_status,
			availability_status,
			habitat_id,
		} = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: {
					animal_id: 1234567,
					name,
					scientific_name,
					height,
					weight,
					date_of_birth,
					gender,
					origin,
					arrival_date,
					age,
					species,
					removal_reason,
					animal_fact,
					geographic_range,
					image_cloud_link,
					conservation_status,
					availability_status,
					habitat_id,
				},
			})
		);
	});
};

module.exports = {
	getSingleAnimal,
	getAllAnimals,
	updateAnimal,
	createAnimal,
};
