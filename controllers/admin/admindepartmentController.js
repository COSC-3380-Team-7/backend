const departments = [
  { id: "INV001", department_details: { name: "Animal Care", location: "Main Zoo", employees: [] } },
  { id: "INV002", department_details: { name: "Education", location: "Visitor Center", employees: [] } },
  { id: "INV003", department_details: { name: "Conservation", location: "Field Office", employees: [] } },
];

const employees = [
  { d_id: "INV001", id: "E001", name: "John Smith", role: "Vet" },
  { d_id: "INV002", id: "E002", name: "Lee Anderson", role: "Maintenance" },
  { d_id: "INV003", id: "E003", name: "Sofia Carter", role: "Zookeeper" },
];

// Helper function to read request body
const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', (error) => reject(error));
  });
};

const mapEmployeetoDepartment = () => {
  departments.forEach((department) => {
    department.department_details.employees = employees.filter(emp => emp.d_id === department.id);
  });
};

// Initialize employee mapping
mapEmployeetoDepartment();

const getAllDepartments = (req, res) => {
  try {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(departments));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
};

const createDepartment = async (req, res) => {
  try {
    const newDepartment = await getRequestBody(req);
    departments.push(newDepartment);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newDepartment));
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const getEmployeesByDepartmentId = (req, res) => {
  try {
    const departmentId = req.url.split("/").pop();
    const department = departments.find((d) => d.id === departmentId);

    if (!department) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Department not found" }));
    }

    // Access employees within department details
    const employeesList = department.department_details.employees || [];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(employeesList));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
};

const getEmployeeById = (req, res) => {
  try {
    const urlParts = req.url.split("/");
    const departmentId = urlParts[urlParts.length - 3]; // Second-to-last parameter
    const employeeId = urlParts[urlParts.length - 1];   // Last parameter

    const department = departments.find((d) => d.id === departmentId);
    if (!department) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Department not found" }));
    }

    const employee = department.department_details.employees.find((e) => e.id === employeeId);
    if (!employee) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Employee not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(employee));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
};

const updateEmployee = async (req, res) => {
  try {
    const urlParts = req.url.split("/");
    const departmentId = urlParts[urlParts.length - 3]; // account for '/edit' at the end
    const employeeId = urlParts[urlParts.length - 2];

    const department = departments.find((d) => d.id === departmentId);
    if (!department) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Department not found" }));
    }

    const employeeIndex = department.employees.findIndex((e) => e.id === employeeId);
    if (employeeIndex === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Employee not found" }));
    }

    const updatedData = await getRequestBody(req);
    department.employees[employeeIndex] = { 
      ...department.employees[employeeIndex], 
      ...updatedData 
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(department.employees[employeeIndex]));
  } catch (error) {
    res.writeHead(error.message === 'Invalid JSON' ? 400 : 500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message || "Internal server error" }));
  }
};

module.exports = {
  getAllDepartments,
  createDepartment,
  getEmployeesByDepartmentId,
  getEmployeeById,
  updateEmployee,
};