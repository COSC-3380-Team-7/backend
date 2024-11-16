const { dbConnection } = require("../db.js");
const { cloudinary } = require("../cloudinary.js");

/**
 * Animal Schema
 * animal_id: int
 * name: string
 * scientific_name: string
 * height: int
 * weight: float
 * date_of_birth: date
 * gender: string
 * origin: string
 * arrival_date: date
 * [Optional] removal_reason: string
 * animal_fact: string
 * geographic_range: string
 * image_cloud_link: string
 * conservation_status: string = ('Stable', 'Threatened', 'Endangered')
 * availability_status: string = ('Present', 'Transferred', 'Deceased') Default = 'Present'
 * habitat_id: int
 **/

const getSingleAnimal = (req, res, animal_id) => {
	dbConnection.query(
		"SELECT * FROM animals WHERE animal_id = ?",
		[animal_id],
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
						error: "Animal does not exist",
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

const getHabitatAnimals = (req, res, habitat_id) => {
	dbConnection.query(
		"SELECT * FROM animals WHERE habitat_id = ? AND availability_status = 'Present'",
		[habitat_id],
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
						error: "Animal does not exist",
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

const getAllAnimals = (req, res) => {
	dbConnection.query("SELECT * FROM animals", (err, result) => {
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
	});
};

const updateAnimal = (req, res, animal_id) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", async () => {
		const {
			name,
			scientific_name,
			nickname,
			height,
			weight,
			date_of_birth,
			gender,
			origin,
			arrival_date,
			animal_fact,
			geographic_range,
			image,
			image_filename,
			conservation_status,
			habitat_id,
		} = JSON.parse(body);

		if (image) {
			let image_cloud_link;

			try {
				image_cloud_link = await cloudinary.uploader.upload(image, {
					upload_preset: "animal_upload",
					public_id: Date.now() + image_filename.split(".")[0],
				});
			} catch (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						error: "Internal Server Error",
					})
				);
				return;
			}

			dbConnection.query(
				"Update animals set name = ?, scientific_name = ?, nickname= ?, height = ?, weight = ?, date_of_birth = ?, gender = ?, origin = ?, arrival_date = ?, animal_fact = ?, geographic_range = ?, image_cloud_link = ?, conservation_status = ?, habitat_id = ? where animal_id = ?",
				[
					name,
					scientific_name,
					nickname,
					height,
					weight,
					date_of_birth,
					gender,
					origin,
					arrival_date,
					animal_fact,
					geographic_range,
					image_cloud_link.public_id,
					conservation_status,
					habitat_id,
					animal_id,
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
							message: "Animal has been updated successfully",
						})
					);
				}
			);
		} else {
			dbConnection.query(
				"Update animals set name = ?, scientific_name = ?, nickname = ?, height = ?, weight = ?, date_of_birth = ?, gender = ?, origin = ?, arrival_date = ?, animal_fact = ?, geographic_range = ?, conservation_status = ?, habitat_id = ? where animal_id = ?",
				[
					name,
					scientific_name,
					nickname,
					height,
					weight,
					date_of_birth,
					gender,
					origin,
					arrival_date,
					animal_fact,
					geographic_range,
					conservation_status,
					habitat_id,
					animal_id,
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
							message: "Animal has been updated successfully",
						})
					);
				}
			);
		}
	});
};

const createAnimal = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", async () => {
		const {
			name,
			scientific_name,
			nickname,
			height,
			weight,
			date_of_birth,
			gender,
			origin,
			arrival_date,
			animal_fact,
			geographic_range,
			image,
			image_filename,
			conservation_status,
			availability_status,
			habitat_id,
		} = JSON.parse(body);

		let image_cloud_link;

		try {
			image_cloud_link = await cloudinary.uploader.upload(image, {
				upload_preset: "animal_upload",
				public_id: Date.now() + image_filename.split(".")[0],
			});
		} catch (err) {
			console.log(err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					error: "Internal Server Error",
				})
			);
			return;
		}

		dbConnection.query(
			"Insert into animals (name, scientific_name, nickname, height, weight, date_of_birth, gender, origin, arrival_date, animal_fact, geographic_range, image_cloud_link, conservation_status, availability_status, habitat_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				name,
				scientific_name,
				nickname,
				height,
				weight,
				date_of_birth,
				gender,
				origin,
				arrival_date,
				animal_fact,
				geographic_range,
				image_cloud_link.public_id,
				conservation_status,
				availability_status,
				habitat_id,
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
						message: "Animal has been added successfully",
					})
				);
			}
		);
	});
};

const getAnimalByName = (req, res, animal_name, nickname) => {
	dbConnection.query(
		"SELECT * FROM animals WHERE name = ? AND availability_status = 'Present' AND nickname = ? ORDER BY name, nickname",
		[animal_name, nickname],
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

const updateAvailability = (req, res) => {
	let body = "";

	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { availability_status, animal_id } = JSON.parse(body);

		dbConnection.query(
			"UPDATE animals SET availability_status = ? WHERE animal_id = ?",
			[availability_status, animal_id],
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
						message: "Animal has been removed successfully",
					})
				);
			}
		);
	});
};

const getAllAnimalsPresent = (req, res) => {
	dbConnection.query(
		"SELECT * FROM animals WHERE availability_status = 'Present' ORDER BY name",
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

module.exports = {
	getSingleAnimal,
	getHabitatAnimals,
	getAnimalByName,
	getAllAnimals,
	getAllAnimalsPresent,
	updateAnimal,
	createAnimal,
	updateAvailability,
};
