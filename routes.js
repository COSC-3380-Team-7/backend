const url = require("url"); // Import URL module for parsing query parameters

const employees = [
  { id: 1, name: "John Doe", role: "Veterinarian" },
  { id: 2, name: "Jane Smith", role: "Zookeeper" },
  { id: 3, name: "Mike Johnson", role: "Maintenance" },
];

const employeeRoutes = (req, res) => {
  if (req.method === "GET") {
    // Return all employees
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(employees));
  } else if (req.method === "POST") {
    // Add a new employee
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newEmployee = JSON.parse(body);
      employees.push(newEmployee); // Add new employee to the list
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Employee added",
          employee: newEmployee,
        })
      );
    });
  } else if (req.method === "PUT") {
    // Update an existing employee
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const updatedEmployee = JSON.parse(body);
      const index = employees.findIndex((emp) => emp.id === updatedEmployee.id);
      if (index !== -1) {
        employees[index] = updatedEmployee; // Update the employee in the list
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
    // Delete an employee
    const employeeId = parseInt(url.parse(req.url, true).query.id); // Get the ID from query params
    const index = employees.findIndex((emp) => emp.id === employeeId);
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
    // Handle unsupported methods
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
};

const adminRoutes = (req, res) => {
  // Dummy handler for admin-related logic
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Admin Route" }));
};

const managerRoutes = (req, res) => {
  // Dummy handler for manager-related logic
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Manager Route" }));
};

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
  adminRoutes,
  managerRoutes,
  animalRoutes,
  habitatRoutes,
  exhibitRoutes,
};
