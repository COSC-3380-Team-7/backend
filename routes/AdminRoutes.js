const http = require("http");
const url = require("url");
const exhibitController = require("../controllers/admin/adminexhibitController");
const departmentController = require("../controllers/admin/admindepartmentController");

const adminRoutes = async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    // Extract ID from URL for reuse
    const getIdFromPath = (path, pattern) => {
      const match = path.match(pattern);
      return match ? match[1] : null;
    };

    // Exhibit Routes
    if (parsedUrl.pathname.startsWith("/admin/exhibit")) {
      // Order routes from most specific to least specific
      if (method === "PUT" && parsedUrl.pathname.match(/\/admin\/exhibit\/([^/]+)\/edit/)) {
        await exhibitController.updateExhibit(req, res);
      } 
      else if (method === "GET" && parsedUrl.pathname.match(/\/admin\/exhibit\/([^/]+)/)) {
        await exhibitController.getExhibitById(req, res);
      }
      else if (method === "POST" && parsedUrl.pathname === "/admin/exhibit/create") {
        exhibitController.createExhibit(req, res);
      }
      else if (method === "GET" && parsedUrl.pathname === "/admin/exhibit") {
       exhibitController.getAllExhibits(req, res);
      }
      else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
      }
    }
    
    // Department Routes
    else if (parsedUrl.pathname.startsWith("/admin/department")) {
      // Order routes from most specific to least specific
      if (method === "PUT" && parsedUrl.pathname.match(/\/admin\/department\/([^/]+)\/employee\/([^/]+)\/edit/)) {
        await departmentController.updateEmployee(req, res);
      }
      else if (method === "GET" && parsedUrl.pathname.match(/\/admin\/department\/([^/]+)\/employee\/([^/]+)/)) {
        await departmentController.getEmployeeById(req, res);
      }
      else if (method === "GET" && parsedUrl.pathname.match(/\/admin\/department\/([^/]+)/)) {
        await departmentController.getEmployeesByDepartmentId(req, res);
      }
      else if (method === "POST" && parsedUrl.pathname === "/admin/department/create") {
        await departmentController.createDepartment(req, res);
      }
      else if (method === "GET" && parsedUrl.pathname === "/admin/department") {
       departmentController.getAllDepartments(req, res);
      }
      else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
      }
    }
    
    else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
    }
  } catch (error) {
    console.error('Error in admin routes:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
};

module.exports = adminRoutes;