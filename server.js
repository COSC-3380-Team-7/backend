const http = require("http");
const url = require("url");
const cors = require("cors");
require("dotenv").config();
const employeeRoutes = require("./routes/employeeRouter");
const managerRoutes = require("./routes/managerRouter");
const adminRoutes = require("./routes/adminRouter");
const memberRoutes = require("./routes/memberRouter");
const publicRoutes = require("./routes/publicRouter");
const { dbConnection } = require("./db");

const PORT = process.env.PORT || 8081;

// Create a CORS middleware
const corsMiddleware = cors();

// Create the HTTP server
const server = http.createServer((req, res) => {
	// Apply CORS middleware to all routes
	corsMiddleware(req, res, () => {
		const parsedUrl = url.parse(req.url, true);
		if (parsedUrl.pathname === "/") {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ res: "Status OK 🐳" }));
		} else if (parsedUrl.pathname.startsWith("/public/")) {
			publicRoutes(req, res);
		} else if (parsedUrl.pathname.startsWith("/member/")) {
			memberRoutes(req, res);
		} else if (parsedUrl.pathname.startsWith("/employee/")) {
			employeeRoutes(req, res);
		} else if (parsedUrl.pathname.startsWith("/manager/")) {
			managerRoutes(req, res);
		} else if (parsedUrl.pathname.startsWith("/admin/")) {
			adminRoutes(req, res);
		} else {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "404 Route Not Found" }));
		}
	});
});

// Start the server
server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
