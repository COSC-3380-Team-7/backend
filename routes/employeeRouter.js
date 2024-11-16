// const controller = require("./controller");
const { URL } = require("url"); // Import the URL class
const authController = require("../controllers/authController");

function router(req, res) {
	const url = req.url;
	const method = req.method;

	if (url.startsWith("/employee/login") && method === "POST") {
		authController.employeeLogin(req, res);
	}
}

module.exports = router;
