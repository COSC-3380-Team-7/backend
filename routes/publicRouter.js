const URL = require("url"); // Import the URL class
const animalController = require("../controllers/animalController");
const exhibitController = require("../controllers/exhibitController");
const habitatController = require("../controllers/habitatController");

function router(req, res) {
	const url = req.url;
	const parsedUrl = URL.parse(req.url, true);
	const method = req.method;

	if (url.startsWith("/public/exhibit") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const exhibit_id = parts[3].slice(1); // Extract exhibit_id from the URL
			exhibitController.getSingleExhibit(req, res, exhibit_id.slice(1));
		} else {
			exhibitController.getAllExhibits(req, res);
		}
	} else if (url.startsWith("/public/habitat") && method === "GET") {
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
	} else if (url.startsWith("/public/animal") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const animal_id = parts[3].slice(1); // Extract animal_id from the URL
			animalController.getSingleAnimal(req, res, animal_id);
		} else {
			animalController.getAllAnimals(req, res);
		}
	}
}

module.exports = router;
