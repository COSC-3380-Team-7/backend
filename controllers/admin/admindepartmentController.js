const departments = [
  { id: "INV001", name: "Animal Care", location: "Main Zoo", employees: [] },
  { id: "INV002", name: "Education", location: "Visitor Center", employees: [] },
  { id: "INV003", name: "Conservation", location: "Field Office", employees: [] },
]; // This should be replaced with a database call

const employees = [
  { d_id: "INV001", id: "INV001", name: "John Smith", role: "Vet" },
  { d_id: "INV002", id: "INV001", name: "Lee Anderson", role: "Maintenance" },
  { d_id: "INV003", id: "INV001", name: "Sofia Carter", role: "Zookeeper" },
];

// Get all departments
const getAllDepartments = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(departments));
};

// Create a new department
const createDepartment = (req, res) => {
  // Handle the request body
  let body = "";

  // Collect data from the request body
  req.on("data", (chunk) => {
    body += chunk.toString(); // Convert Buffer to string
  });

  req.on("end", () => {
    // Assume body is in JSON format
    try {
      const newDepartment = JSON.parse(body);
      departments.push(newDepartment); // Add to database
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newDepartment));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid JSON");
    }
  });
};

const mapEmployeetoDepartment = () =>{
  departments.forEach((department) => {
    department.employees = employees.filter(emp => emp.d_id === department.id);
  });
};

mapEmployeetoDepartment();

// Get employees by department ID
const getEmployeesByDepartmentId = (req, res) => {
  // Extract the department ID from the request URL
  const departmentId = req.url.split("/").pop(); // Get the last part of the URL
  const department = departments.find((d) => d.id === departmentId);
  if(!department){
    res.writeHead(404, { "Content-Type": "text/plain" });

    res.end(JSON.stringify("Department not found"));
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(department.employees));
};

// Get a specific employee by ID within a department
const getEmployeeById = (req, res) => {
  const urlParts = req.url.split("/");
  const departmentId = urlParts[urlParts.length - 2]; // Second last part
  const employeeId = urlParts[urlParts.length - 1]; // Last part

  const department = departments.find((d) => d.id === departmentId);
  if(!department){
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(JSON.stringify("Department not found"));
  }
  const employee = department.employees.find((e) => e.id === employeeId);
  if (!employee) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Employee not found");
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(employee));
};

// Update employee info
const updateEmployee = (req, res) => {
  const urlParts = req.url.split("/");
  const departmentId = urlParts[urlParts.length - 2]; // Second last part
  const employeeId = urlParts[urlParts.length - 1]; // Last part

  const department = departments.find((d) => d.id === departmentId);
  if(!department){
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(JSON.stringify("Department not found"));
  }
  let employee = department.employees.find((e) => e.id === employeeId);
  if (!employee) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Employee not found");
  }

  // Handle the request body
  let body = "";

  // Collect data from the request body
  req.on("data", (chunk) => {
    body += chunk.toString(); // Convert Buffer to string
  });

  req.on("end", () => {
    // Assume body is in JSON format
    try {
      const updatedData = JSON.parse(body);
      employee = { ...employee, ...updatedData }; // Merge with updated data
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(employee));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid JSON");
    }
  });
};

module.exports = {
  getAllDepartments,
  createDepartment,
  getEmployeesByDepartmentId,
  getEmployeeById,
  updateEmployee,
};
