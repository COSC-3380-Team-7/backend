// const controller = require("./controller");
const URL = require("url"); // Import the URL class
const exhibitController = require("../controllers/admin/exhibitController");
const habitatController = require("../controllers/admin/habitatController");
const animalController = require("../controllers/admin/animalController");

function router(req, res) {
	const url = req.url;
	const parsedUrl = URL.parse(req.url, true);
	const method = req.method;

	if (url.startsWith("/admin/exhibit") && method === "GET") {
		// split the URL into parts i.e [ '', 'admin', 'exhibit' ]
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const exhibit_id = parts[3].slice(1); // Extract exhibit_id from the URL
			exhibitController.getSingleExhibit(req, res, exhibit_id.slice(1));
		} else {
			exhibitController.getAllExhibits(req, res);
		}
	} else if (url.startsWith("/admin/exhibit") && method === "POST") {
		exhibitController.createExhibit(req, res);
	} else if (url.startsWith("/admin/exhibit") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const exhibit_id = parts[3].slice(1); // Extract exhibit_id from the URL
			exhibitController.updateExhibit(req, res, exhibit_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing exhibit id." }));
		}
	} else if (url.startsWith("/admin/habitat") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const habitat_id = parts[3].slice(1); // Extract habitat_id from the URL
			// const query = parsedUrl.query;
			// const exhibit_id = query["exhibit_id"];

			if (habitat_id) {
				habitatController.getSingleHabitat(req, res, habitat_id);
			}
		} else {
			habitatController.getAllHabitats(req, res);
		}
	} else if (url.startsWith("/admin/habitat") && method === "POST") {
		habitatController.createHabitat(req, res);
	} else if (url.startsWith("/admin/habitat") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const habitat_id = parts[3].slice(1); // Extract habitat_id from the URL
			habitatController.updateHabitat(req, res, habitat_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing habitat id." }));
		}
	} else if (url.startsWith("/admin/animal") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const animal_id = parts[3].slice(1); // Extract animal_id from the URL
			animalController.getSingleAnimal(req, res, animal_id);
		} else {
			animalController.getAllAnimals(req, res);
		}
	} else if (url.startsWith("/admin/animal") && method === "POST") {
		animalController.createAnimal(req, res);
	} else if (url.startsWith("/admin/animal") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const animal_id = parts[3].slice(1); // Extract animal_id from the URL
			animalController.updateAnimal(req, res, animal_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing animal id." }));
		}
	}
}

module.exports = router;
