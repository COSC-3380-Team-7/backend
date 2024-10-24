const http = require("http");
const adminRoutes = require("./routes/AdminRoutes"); // Ensure the path and casing are correct

const server = http.createServer((req, res) => {
  adminRoutes(req, res);
  // Handle other routes or middleware here
});

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
