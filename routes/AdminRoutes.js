const http = require("http");
const url = require("url");
const exhibitController = require("../controllers/admin/adminexhibitController");
const departmentController = require("../controllers/admin/admindepartmentController");
const ticketController = require("../controllers/admin/adminticketController");
const eventController = require("../controllers/admin/admineventController");

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
      if (
        method === "PUT" &&
        parsedUrl.pathname.match(/\/admin\/exhibit\/([^/]+)\/edit/)
      ) {
        await exhibitController.updateExhibit(req, res);
      } else if (
        method === "GET" &&
        parsedUrl.pathname.match(/\/admin\/exhibit\/([^/]+)/)
      ) {
        await exhibitController.getExhibitById(req, res);
      } else if (
        method === "POST" &&
        parsedUrl.pathname === "/admin/exhibit/create"
      ) {
        exhibitController.createExhibit(req, res);
      } else if (method === "GET" && parsedUrl.pathname === "/admin/exhibit") {
        exhibitController.getAllExhibits(req, res);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
      }
    }

    // Department Routes
    else if (parsedUrl.pathname.startsWith("/admin/department")) {
      if (
        method === "PUT" &&
        parsedUrl.pathname.match(
          /\/admin\/department\/([^/]+)\/employee\/([^/]+)\/edit/
        )
      ) {
        await departmentController.updateEmployee(req, res);
      } else if (
        method === "GET" &&
        parsedUrl.pathname.match(
          /\/admin\/department\/([^/]+)\/employee\/([^/]+)/
        )
      ) {
        await departmentController.getEmployeeById(req, res);
      } else if (
        method === "GET" &&
        parsedUrl.pathname.match(/\/admin\/department\/([^/]+)/)
      ) {
        await departmentController.getEmployeesByDepartmentId(req, res);
      } else if (
        method === "POST" &&
        parsedUrl.pathname === "/admin/department/create"
      ) {
        await departmentController.createDepartment(req, res);
      } else if (
        method === "GET" &&
        parsedUrl.pathname === "/admin/department"
      ) {
        departmentController.getAllDepartments(req, res);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
      }
    }

    // Ticket Routes
    else if (parsedUrl.pathname.startsWith("/admin/ticket")) {
      if (method === "GET" && parsedUrl.pathname === "/admin/ticket") {
        ticketController.getAllTickets(req, res);
      } else if (
        method === "POST" &&
        parsedUrl.pathname === "/admin/ticket/create"
      ) {
        ticketController.createTicket(req, res);
      } else if (
        method === "PUT" &&
        parsedUrl.pathname.match(/\/admin\/ticket\/(\d+)\/edit/)
      ) {
        ticketController.updateTicket(req, res);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
      }
    }

    // Event Routes
    else if (parsedUrl.pathname.startsWith("/admin/event")) {
      if (method === "GET" && parsedUrl.pathname === "/admin/event") {
        eventController.getAllEvents(req, res);
      } else if (
        method === "POST" &&
        parsedUrl.pathname === "/admin/event/create"
      ) {
        eventController.createEvent(req, res);
      } else if (
        method === "PUT" &&
        parsedUrl.pathname.match(/\/admin\/event\/([^/]+)\/edit/)
      ) {
        eventController.updateEvent(req, res);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
      }
    }

    // If route is not matched, return 404 error
    else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    }
  } catch (error) {
    console.error("Error in admin routes:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
};

module.exports = adminRoutes;
