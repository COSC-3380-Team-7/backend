// Dummy data for employees
let employees = [
  { id: 1, name: "John Doe", role: "Veterinarian" },
  { id: 2, name: "Jane Smith", role: "Zookeeper" },
  { id: 3, name: "Mike Johnson", role: "Maintenance" },
];

// Get employees based on role or all employees
const getEmployeesByRole = (role = "all") => {
  if (role === "all") {
    return employees;
  }
  return employees.filter((emp) => emp.role === role);
};

// Add a new employee
const addEmployee = (newEmployee, role) => {
  newEmployee.id = employees.length + 1; // Simple ID generation
  newEmployee.role = role;
  employees.push(newEmployee);
  return newEmployee;
};

// Update an existing employee
const updateEmployee = (updatedEmployee, role) => {
  const index = employees.findIndex(
    (emp) => emp.id === updatedEmployee.id && emp.role === role
  );
  if (index !== -1) {
    employees[index] = updatedEmployee;
    return updatedEmployee;
  }
  return null;
};

// Delete an employee
const deleteEmployee = (employeeId, role) => {
  const index = employees.findIndex(
    (emp) => emp.id === employeeId && emp.role === role
  );
  if (index !== -1) {
    return employees.splice(index, 1)[0]; // Remove and return deleted employee
  }
  return null;
};

module.exports = {
  getEmployeesByRole,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
