// const controller = require("./controller");
const URL = require("url"); // Import the URL class
const exhibitController = require("../controllers/exhibitController");
const habitatController = require("../controllers/habitatController");
const animalController = require("../controllers/animalController");
const maintenanceController = require("../controllers/maintenanceController");
const eventController = require("../controllers/eventController");
const ticketController = require("../controllers/ticketController");
const vetReportsController = require("../controllers/vetReportsController");
const departmentController = require("../controllers/departmentController");

function router(req, res) {
  const url = req.url;
  const parsedUrl = URL.parse(req.url, true);
  const method = req.method;

  if (url.startsWith("/admin/exhibit") && method === "GET") {
    // split the URL into parts i.e [ '', 'admin', 'exhibit' ]
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const exhibit_id = parts[3].slice(1); // Extract exhibit_id from the URL
      exhibitController.getSingleExhibit(req, res, exhibit_id.slice(1));
    } else {
      exhibitController.getAllExhibits(req, res);
    }
  } else if (url.startsWith("/admin/exhibit") && method === "POST") {
    exhibitController.createExhibit(req, res);
  } else if (url.startsWith("/admin/exhibit") && method === "PUT") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const exhibit_id = parts[3].slice(1); // Extract exhibit_id from the URL
      exhibitController.updateExhibit(req, res, exhibit_id);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid URL missing exhibit id." }));
    }
  } else if (url.startsWith("/admin/habitat") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const habitat_id = parts[3].slice(1); // Extract habitat_id from the URL
      // const query = parsedUrl.query;
      // const exhibit_id = query["exhibit_id"];

      if (habitat_id) {
        habitatController.getSingleHabitat(req, res, habitat_id);
      }
    } else {
      habitatController.getAllHabitats(req, res);
    }
  } else if (url.startsWith("/admin/habitat") && method === "POST") {
    habitatController.createHabitat(req, res);
  } else if (url.startsWith("/admin/habitat") && method === "PUT") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const habitat_id = parts[3].slice(1); // Extract habitat_id from the URL
      habitatController.updateHabitat(req, res, habitat_id);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid URL missing habitat id." }));
    }
  } else if (url.startsWith("/admin/animal") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const animal_id = parts[3].slice(1); // Extract animal_id from the URL
      animalController.getSingleAnimal(req, res, animal_id);
    } else {
      animalController.getAllAnimals(req, res);
    }
  } else if (url.startsWith("/admin/animal") && method === "POST") {
    animalController.createAnimal(req, res);
  } else if (url.startsWith("/admin/animal") && method === "PUT") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const animal_id = parts[3].slice(1); // Extract animal_id from the URL
      animalController.updateAnimal(req, res, animal_id);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid URL missing animal id." }));
    }
  } else if (url.startsWith("/admin/maintenance_report") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");
    if (parts.length >= 4) {
      const maintenance_report_id = parts[3];
      maintenanceController.getSingleMaintenanceReport(
        req,
        res,
        maintenance_report_id
      );
    } else {
      maintenanceController.getAllMaintenanceReports(req, res);
    }
  } else if (url.startsWith("/admin/event") && method === "GET") {
    eventController.getAllEvents(req, res);
  } else if (url.startsWith("/admin/event/create") && method === "POST") {
    eventController.createEvent(req, res);
  } else if (url.startsWith("/admin/event") && method === "PUT") {
    const parts = parsedUrl.pathname.split("/");
    if (parts.length >= 4) {
      const event_id = parts[3].slice(1);
      eventController.updateEvent(req, res, event_id);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid URL missing event id." }));
    }
  } else if (url.startsWith("/admin/ticket") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const ticket_id = parts[3].slice(1); // Extract ticket_id from the URL
      ticketController.getSingleTicket(req, res, ticket_id);
    } else {
      ticketController.getAllTickets(req, res);
    }
  } else if (url.startsWith("/admin/ticket") && method === "POST") {
    ticketController.createTicket(req, res);
  } else if (url.startsWith("/admin/ticket") && method === "PUT") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const ticket_id = parts[3]; // Extract ticket_id from the URL
      ticketController.updateTicket(req, res, ticket_id);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid URL missing ticket id." }));
    }
  }
  if (url.startsWith("/admin/vet_report") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length === 4) {
      const vet_report_id = parts[3]; // Extract vet_report_id from the URL
      vetReportsController.getSingleVetReport(req, res, vet_report_id);
    } else {
      vetReportsController.getAllHabitats(req, res);
    }
  } else if (url.startsWith("/admin/vet_report") && method === "POST") {
    vetReportsController.createHabitat(req, res);
  } else if (url.startsWith("/admin/vet_report") && method === "PUT") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const vet_report_id = parts[3]; // Extract vet_report_id from the URL
      vetReportsController.updateHabitat(req, res, vet_report_id);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid URL missing vet_report_id." }));
    }
  }
  if (url.startsWith("/admin/department") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length === 4) {
      const department_id = parts[3]; // Extract department_id from the URL
      departmentController.getSingleDepartment(req, res, department_id);
    } else {
      departmentController.getAllDepartments(req, res);
    }
  } else if (url.startsWith("/admin/department") && method === "POST") {
    departmentController.createDepartment(req, res);
  } else if (url.startsWith("/admin/department") && method === "PUT") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const department_id = parts[3]; // Extract department_id from the URL
      departmentController.updateDepartment(req, res, department_id);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid URL missing department_id." }));
    }
  }
}

module.exports = router;
