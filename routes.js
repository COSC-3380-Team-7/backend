const url = require("url");
const {
  getEmployeesByRole,
  getAdmins,
  getManagers,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./controller"); // Import the controller functions

// Employee routes handler
const employeeRoutes = (req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getEmployeesByRole("all")));
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
};

// Handle CRUD for employee roles (Veterinarian, Maintenance, Zookeeper)
const vetRoutes = (req, res) => handleCRUD(req, res, "Veterinarian");
const maintenanceRoutes = (req, res) => handleCRUD(req, res, "Maintenance");
const zookeeperRoutes = (req, res) => handleCRUD(req, res, "Zookeeper");

// Function to handle CRUD operations based on employee role
const handleCRUD = (req, res, role) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getEmployeesByRole(role)));
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newEmployee = JSON.parse(body);
      const employee = addEmployee(newEmployee, role);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Employee added", employee }));
    });
  } else if (req.method === "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const updatedEmployee = JSON.parse(body);
      const employee = updateEmployee(updatedEmployee, role);
      if (employee) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Employee updated",
            employee,
          })
        );
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Employee not found" }));
      }
    });
  } else if (req.method === "DELETE") {
    const employeeId = parseInt(url.parse(req.url, true).query.id);
    const employee = deleteEmployee(employeeId, role);
    if (employee) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Employee deleted", employee }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Employee not found" }));
    }
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
};

// Admin routes
const adminRoutes = (req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getAdmins()));
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
};

// Admin employee routes
const adminEmployeeRoutes = (req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Admin Employee Route" }));
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
};

// Manager routes
const managerRoutes = (req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getManagers()));
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
};

// Animal, habitat, and exhibit routes
const animalRoutes = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Animal Route" }));
};

const habitatRoutes = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Habitat Route" }));
};

const exhibitRoutes = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Exhibit Route" }));
};

// Export the route handlers
module.exports = {
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
};
