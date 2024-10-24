const http = require("http");
const url = require("url");
const exhibitController = require("../controllers/admin/adminexhibitController");
const departmentController = require("../controllers/admin/admindepartmentController");

const adminRoutes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;

  if (parsedUrl.pathname.startsWith("/admin/exhibit")) {
    if (method === "GET" && parsedUrl.pathname === "/admin/exhibit") {
      exhibitController.getAllExhibits(req, res);
    } else if (
      method === "POST" &&
      parsedUrl.pathname === "/admin/exhibit/create"
    ) {
      exhibitController.createExhibit(req, res);
    } else if (
      method === "GET" &&
      parsedUrl.pathname.match(/\/admin\/exhibit\/([^/]+)/)
    ) {
      exhibitController.getExhibitById(req, res);
    } else if (
      method === "PUT" &&
      parsedUrl.pathname.match(/\/admin\/exhibit\/([^/]+)\/edit/)
    ) {
      exhibitController.updateExhibit(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  } else if (parsedUrl.pathname.startsWith("/admin/department")) {
    if (method === "GET" && parsedUrl.pathname === "/admin/department") {
      departmentController.getAllDepartments(req, res);
    } else if (
      method === "POST" &&
      parsedUrl.pathname === "/admin/department/create"
    ) {
      departmentController.createDepartment(req, res);
    } else if (
      method === "GET" &&
      parsedUrl.pathname.match(/\/admin\/department\/([^/]+)/)
    ) {
      departmentController.getEmployeesByDepartmentId(req, res);
    } else if (
      method === "GET" &&
      parsedUrl.pathname.match(
        /\/admin\/department\/([^/]+)\/employee\/([^/]+)/
      )
    ) {
      departmentController.getEmployeeById(req, res);
    } else if (
      method === "PUT" &&
      parsedUrl.pathname.match(
        /\/admin\/department\/([^/]+)\/employee\/([^/]+)\/edit/
      )
    ) {
      departmentController.updateEmployee(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  } else {
    res.writeHead(404);
    res.end();
  }
};

module.exports = adminRoutes;
