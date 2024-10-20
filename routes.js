const url = require("url"); // Import URL module for parsing query parameters

// Dummy data for employees
const employees = [
  { id: 1, name: "John Doe", role: "Veterinarian" },
  { id: 2, name: "Jane Smith", role: "Zookeeper" },
  { id: 3, name: "Mike Johnson", role: "Maintenance" },
];

// Handle Read for all employees
const employeeRoutes = (req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(employees));
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
};

// CRUD routes for /employee/vet
const vetRoutes = (req, res) => handleCRUD(req, res, "Veterinarian");

// CRUD routes for /employee/maintenance
const maintenanceRoutes = (req, res) => handleCRUD(req, res, "Maintenance");

// CRUD routes for /employee/zookeeper
const zookeeperRoutes = (req, res) => handleCRUD(req, res, "Zookeeper");

// Handle CRUD operations based on employee role
const handleCRUD = (req, res, role) => {
  if (req.method === "GET") {
    const roleEmployees = employees.filter((emp) => emp.role === role);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(roleEmployees));
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newEmployee = JSON.parse(body);
      newEmployee.role = role; // Ensure role is set correctly
      employees.push(newEmployee);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Employee added", employee: newEmployee })
      );
    });
  } else if (req.method === "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const updatedEmployee = JSON.parse(body);
      const index = employees.findIndex(
        (emp) => emp.id === updatedEmployee.id && emp.role === role
      );
      if (index !== -1) {
        employees[index] = updatedEmployee;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Employee updated",
            employee: updatedEmployee,
          })
        );
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Employee not found" }));
      }
    });
  } else if (req.method === "DELETE") {
    const employeeId = parseInt(url.parse(req.url, true).query.id);
    const index = employees.findIndex(
      (emp) => emp.id === employeeId && emp.role === role
    );
    if (index !== -1) {
      const deletedEmployee = employees.splice(index, 1);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Employee deleted",
          employee: deletedEmployee,
        })
      );
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Employee not found" }));
    }
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
};

// CRUD routes for /admin
const adminRoutes = (req, res) => {
  // Dummy handler for admin-related logic (CRUD)
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Admin Route" }));
};

// CRUD routes for /admin/employee/:id
const adminEmployeeRoutes = (req, res) => {
  // Dummy handler for CRUD operations on employees under admin
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Admin Employee Route" }));
};

// CRUD routes for /manager
const managerRoutes = (req, res) => {
  // Dummy handler for manager-related logic (CRUD)
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Manager Route" }));
};

// Routes for /animal, /habitat, /exhibit (unchanged)
const animalRoutes = (req, res) => {
  // Dummy handler for animal-related logic
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Animal Route" }));
};

const habitatRoutes = (req, res) => {
  // Dummy handler for habitat-related logic
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Habitat Route" }));
};

const exhibitRoutes = (req, res) => {
  // Dummy handler for exhibit-related logic
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
