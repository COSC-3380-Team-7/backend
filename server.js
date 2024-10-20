const http = require("http");
const url = require("url");
const cors = require("cors");
const {
  employeeRoutes,
  vetRoutes,
  maintenanceRoutes,
  zookeeperRoutes,
  adminRoutes,
  adminEmployeeRoutes,
  managerRoutes,
  animalRoutes,
  habitatRoutes,
  exhibitRoutes,
} = require("./routes"); // Import all routes

const PORT = 8081;

// Middleware for CORS
const corsMiddleware = cors();

// Create the HTTP server
const server = http.createServer((req, res) => {
  corsMiddleware(req, res, () => {
    const parsedUrl = url.parse(req.url, true);

    // Employee routes
    if (parsedUrl.pathname === "/employee" && req.method === "GET") {
      employeeRoutes(req, res); // Handle GET for /employee (only read)
    } else if (
      parsedUrl.pathname.startsWith("/employee/vet") &&
      ["POST", "GET", "PUT", "DELETE"].includes(req.method)
    ) {
      vetRoutes(req, res); // Handle CRUD for /employee/vet
    } else if (
      parsedUrl.pathname.startsWith("/employee/maintenance") &&
      ["POST", "GET", "PUT", "DELETE"].includes(req.method)
    ) {
      maintenanceRoutes(req, res); // Handle CRUD for /employee/maintenance
    } else if (
      parsedUrl.pathname.startsWith("/employee/zookeeper") &&
      ["POST", "GET", "PUT", "DELETE"].includes(req.method)
    ) {
      zookeeperRoutes(req, res); // Handle CRUD for /employee/zookeeper
    }

    // Admin routes
    else if (
      parsedUrl.pathname === "/admin" &&
      ["POST", "GET", "PUT", "DELETE"].includes(req.method)
    ) {
      adminRoutes(req, res); // Handle CRUD for /admin
    } else if (
      parsedUrl.pathname.startsWith("/admin/employee/") &&
      ["POST", "GET", "PUT", "DELETE"].includes(req.method)
    ) {
      adminEmployeeRoutes(req, res); // Handle CRUD for /admin/employee/:id
    }

    // Manager routes
    else if (
      parsedUrl.pathname === "/manager" &&
      ["POST", "GET", "PUT", "DELETE"].includes(req.method)
    ) {
      managerRoutes(req, res); // Handle CRUD for /manager
    }

    // Animal routes
    else if (parsedUrl.pathname === "/animal" && req.method === "GET") {
      animalRoutes(req, res); // Handle GET for /animal
    }

    // Habitat routes
    else if (parsedUrl.pathname === "/habitat" && req.method === "GET") {
      habitatRoutes(req, res); // Handle GET for /habitat
    }

    // Exhibit routes
    else if (parsedUrl.pathname === "/exhibit" && req.method === "GET") {
      exhibitRoutes(req, res); // Handle GET for /exhibit
    }

    // If no matching route, return 404
    else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
