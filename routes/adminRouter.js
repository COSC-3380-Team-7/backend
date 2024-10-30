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
const employeeController = require("../controllers/employeeController");
const giftShopController = require("../controllers/giftShopController");
const merchandiseController = require("../controllers/merchandiseController");
const occupationController = require("../controllers/occupationController");
const departmentManagerController = require("../controllers/departmentManagersController");
const visitorController = require("../controllers/visitorController");

function router(req, res) {
	const url = req.url;
	const parsedUrl = URL.parse(req.url, true);
	const method = req.method;

	if (url.startsWith("/admin/exhibit_habitats") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const exhibit_id = parts[3].slice(1); // Extract exhibit_id from the URL
			habitatController.getExhibitsHabitats(req, res, exhibit_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing exhibit id." }));
		}
	} else if (url.startsWith("/admin/habitat_animals") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const habitat_id = parts[3].slice(1); // Extract habitat_id from the URL
			animalController.getHabitatAnimals(req, res, habitat_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing habitat id." }));
		}
	} else if (url.startsWith("/admin/exhibit") && method === "GET") {
		// split the URL into parts i.e [ '', 'admin', 'exhibit' ]
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const exhibit_id = parts[3].slice(1); // Extract exhibit_id from the URL
			exhibitController.getSingleExhibit(req, res, exhibit_id);
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
			const maintenance_report_id = parts[3].slice(1);
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
			const ticket_id = parts[3].slice(1); // Extract ticket_id from the URL
			ticketController.updateTicket(req, res, ticket_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing ticket id." }));
		}
	} else if (url.startsWith("/admin/vet_report") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const vet_report_id = parts[3].slice(1); // Extract vet_report_id from the URL
			vetReportsController.getSingleVetReport(req, res, vet_report_id);
		} else {
			vetReportsController.getAllVetReports(req, res);
		}
	} else if (url.startsWith("/admin/vet_report") && method === "POST") {
		vetReportsController.createVetReport(req, res);
	} else if (url.startsWith("/admin/vet_report") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const vet_report_id = parts[3].slice(1); // Extract vet_report_id from the URL
			vetReportsController.updateVetReport(req, res, vet_report_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing vet_report_id." }));
		}
	} else if (url.startsWith("/admin/department_employee") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const department_id = parts[3].slice(1); // Extract department_id from the URL
			employeeController.getDepartmentEmployees(req, res, department_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					error: "Invalid URL missing department_id of employees.",
				})
			);
		}
	} else if (url.startsWith("/admin/department_manager") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const department_id = parts[3].slice(1); // Extract department_id from the URL
			departmentManagerController.getAllManagers(req, res, department_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL." }));
		}
	} else if (url.startsWith("/admin/department_manager") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const manager_id = parts[3].slice(1); // Extract manager_id from the URL
			departmentManagerController.updateDepartmentManager(req, res, manager_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing manager_id." }));
		}
	} else if (
		url.startsWith("/admin/department_manager") &&
		method === "DELETE"
	) {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const manager_id = parts[3].slice(1); // Extract manager_id from the URL
			departmentManagerController.removeDepartmentManager(req, res, manager_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing manager_id." }));
		}
	} else if (url.startsWith("/admin/employee") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const employee_id = parts[3].slice(1); // Extract employee_id from the URL
			employeeController.getSingleEmployee(req, res, employee_id);
		} else {
			employeeController.getAllEmployees(req, res);
		}
	} else if (url.startsWith("/admin/department") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const department_id = parts[3].slice(1); // Extract department_id from the URL
			departmentController.getSingleDepartment(req, res, department_id);
		} else {
			departmentController.getAllDepartments(req, res);
		}
	} else if (url.startsWith("/admin/department") && method === "POST") {
		departmentController.createDepartment(req, res);
	} else if (url.startsWith("/admin/department") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const department_id = parts[3].slice(1); // Extract department_id from the URL
			departmentController.updateDepartment(req, res, department_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing department_id." }));
		}
	} else if (url.startsWith("/admin/employee") && method === "POST") {
		employeeController.createEmployee(req, res);
	} else if (url.startsWith("/admin/employee") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const employee_id = parts[3].slice(1); // Extract employee_id from the URL
			employeeController.updateEmployee(req, res, employee_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing employee id." }));
		}
	} else if (url.startsWith("/admin/gift_shop") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const gift_shop_id = parts[3].slice(1); // Extract gift_shop_id from the URL
			giftShopController.getSingleGiftShop(req, res, gift_shop_id);
		} else {
			giftShopController.getAllGiftShops(req, res);
		}
	} else if (url.startsWith("/admin/gift_shop") && method === "POST") {
		giftShopController.createGiftShop(req, res);
	} else if (url.startsWith("/admin/gift_shop") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const gift_shop_id = parts[3].slice(1); // Extract gift_shop_id from the URL
			giftShopController.updateGiftShop(req, res, gift_shop_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing gift shop id." }));
		}
	} else if (url.startsWith("/admin/merchandise") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const merchandise_id = parts[3].slice(1); // Extract merchandise_id from the URL
			merchandiseController.getSingleMerchandise(req, res, merchandise_id);
		} else {
			merchandiseController.getAllMerchandise(req, res);
		}
	} else if (url.startsWith("/admin/merchandise") && method === "POST") {
		merchandiseController.createMerchandise(req, res);
	} else if (url.startsWith("/admin/merchandise") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const merchandise_id = parts[3].slice(1); // Extract merchandise_id from the URL
			merchandiseController.updateMerchandise(req, res, merchandise_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing merchandise id." }));
		}
	} else if (url.startsWith("/admin/occupations") && method === "GET") {
		// For getting all occupations
		occupationController.getAllOccupations(req, res);
	} else if (url.startsWith("/admin/occupations") && method === "POST") {
		// For creating a new occupation
		occupationController.createOccupation(req, res);
	} else if (url.startsWith("/admin/occupations") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const occupation_id = parts[3].slice(1); // Extract occupation_id from the URL
			occupationController.updateOccupation(req, res, occupation_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL: missing occupation id." }));
		}
	} else if (url.startsWith("/admin/visitor") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const visitor_id = parts[3].slice(1); // Extract visitor_id from the URL
			visitorController.getSingleVisitor(req, res, visitor_id);
		} else {
			visitorController.getAllVisitors(req, res);
		}
	} else if (url.startsWith("/admin/visitor") && method === "POST") {
		visitorController.createVisitor(req, res);
	} else if (url.startsWith("/admin/visitor") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const visitor_id = parts[3].slice(1); // Extract visitor_id from the URL
			visitorController.updateVisitor(req, res, visitor_id);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid URL missing visitor id." }));
		}
	}
}

module.exports = router;
