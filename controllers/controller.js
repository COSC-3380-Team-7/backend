// Dummy data for employees
let employees = [
  { id: 1, name: "John Doe", role: "Veterinarian" },
  { id: 2, name: "Jane Smith", role: "Zookeeper" },
  { id: 3, name: "Mike Johnson", role: "Maintenance" },
];

// Dummy data for Admins
let admins = [
  { id: 1, name: "Alice Brown", role: "Admin" },
  { id: 2, name: "Bob White", role: "Admin" },
];

// Dummy data for Managers
let managers = [
  { id: 1, name: "Charlie Green", role: "Manager" },
  { id: 2, name: "Diana Black", role: "Manager" },
];

// Function to get employees by role
const getEmployeesByRole = (role) => {
  if (role === "all") return employees;
  return employees.filter((emp) => emp.role === role);
};

// Function to get all admins
const getAdmins = () => {
  return admins;
};

// Function to get all managers
const getManagers = () => {
  return managers;
};

// Function to add an employee
const addEmployee = (newEmployee, role) => {
  newEmployee.id = employees.length + 1;
  newEmployee.role = role;
  employees.push(newEmployee);
  return newEmployee;
};

// Function to update an employee
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

// Function to delete an employee
const deleteEmployee = (id, role) => {
  const index = employees.findIndex(
    (emp) => emp.id === id && emp.role === role
  );
  if (index !== -1) {
    return employees.splice(index, 1)[0];
  }
  return null;
};

// Export the controller functions
module.exports = {
  getEmployeesByRole,
  getAdmins,
  getManagers,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
