// const controller = require("./controller");
const URL = require("url"); // Import the URL class
const employeeController = require("../controllers/employeeController");
const authController = require("../controllers/authController");
const animalfoodController = require("../controllers/animalfoodController");

function router(req, res) {
	const url = req.url;
	const parsedUrl = URL.parse(req.url, true);
	const method = req.method;

	if (url.startsWith("/manager/supervised_employees") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const supervisor_id = parts[3].slice(1); // Extract exhibit_id from the URL
			employeeController.getSupervisedEmployees(req, res, supervisor_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing supervisor_id." }));
		}
	} else if (url === "/manager/login" && method === "POST") {
		authController.managerLogin(req, res);
	} else if (
		url.startsWith("/manager/create_animal_food") &&
		method === "POST"
	) {
		animalfoodController.createAnimalFood(req, res);
	} else if (url.startsWith("/manager/food_for_animal") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const animal_food_id = parts[3].slice(1); // Extract animal_food_id from the URL
			animalfoodController.getSingleAnimalFood(req, res, animal_food_id);
		} else {
			animalfoodController.getAllAnimalFood(req, res);
		}
	} else if (
		url.startsWith("/manager/update_animal_food") &&
		method === "PUT"
	) {
		animalfoodController.updateAnimalFood(req, res);
	} else if (
		url.startsWith("/manager/purchase_animal_food") &&
		method === "POST"
	) {
		animalfoodController.purchaseAnimalFood(req, res);
	} else if (url.startsWith("/manager/feed_animal") && method === "POST") {
		animalfoodController.feedAnimal(req, res);
	}
}

module.exports = router;
