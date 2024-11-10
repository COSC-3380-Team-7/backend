// const controller = require("./controller");
const URL = require("url"); // Import the URL class
const employeeController = require("../controllers/employeeController");
const authController = require("../controllers/authController");

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
	}
}

module.exports = router;
