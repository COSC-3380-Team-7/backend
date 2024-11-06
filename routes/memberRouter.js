// const controller = require("./controller");
const { URL } = require("url"); // Import the URL class
const authController = require("../controllers/authController");

function router(req, res) {
	const url = req.url;
	const method = req.method;

	if (url.startsWith("/member/ticket") && method === "GET") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "GET /member/ticket" }));
	} else if (url.startsWith("/member/login") && method === "POST") {
		authController.memberLogin(req, res);
	}
}

module.exports = router;
