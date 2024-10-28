const { URL } = require("url"); // Import the URL class

function router(req, res) {
	const url = req.url;
	const method = req.method;

	if (url.startsWith("/exhibit") && method === "GET") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "GET /exhibit" }));
	} else if (url.startsWith("/habitat") && method === "GET") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "GET /habitat" }));
	} else if (url.startsWith("/animal") && method === "GET") {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "GET /animal" }));
	}
}

module.exports = router;
