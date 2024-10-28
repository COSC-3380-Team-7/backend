// const controller = require("./controller");
const { URL } = require("url"); // Import the URL class

function router(req, res) {
	const url = req.url;
	const method = req.method;

	if (url.startsWith("/employee/exhibit") && method === "GET") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "GET /employee/exhibit" }));
	}
}

module.exports = router;
