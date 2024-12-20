// const controller = require("./controller");
const URL = require("url"); // Import the URL class
const exhibitController = require("../controllers/exhibitController");
const habitatController = require("../controllers/habitatController");
const animalController = require("../controllers/animalController");
const maintenanceController = require("../controllers/maintenanceController.js");
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
const authController = require("../controllers/authController");
const triggerController = require("../controllers/triggerController");
const animalFoodCostAnalysisController = require("../controllers/animalFoodCostAnalysisController");
const animalHealthPerformanceController = require("../controllers/animalHealthPerformanceController");
const exhibitPerformanceController = require("../controllers/exhibitPerformanceController");

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
	} else if (
		url.startsWith("/admin/exhibit_availability") &&
		method === "PUT"
	) {
		exhibitController.updateExhibitAvailability(req, res);
	} else if (
		url.startsWith("/admin/habitat_availability") &&
		method === "PUT"
	) {
		habitatController.updateHabitatAvailability(req, res);
	} else if (url.startsWith("/admin/all_exhibits") && method === "GET") {
		exhibitController.getAllExhibits(req, res);
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
	} else if (url.startsWith("/admin/query_animal_name") && method === "GET") {
		const query = parsedUrl.query;
		const animal_name = query["name"];
		const nickname = query["nickname"];

		if (!animal_name) {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({ error: "Invalid URL missing query parameters." })
			);
		}

		animalController.getAnimalByName(req, res, animal_name, nickname);
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
	} else if (url.startsWith("/admin/update_availability") && method === "PUT") {
		animalController.updateAvailability(req, res);
	} else if (
		url.startsWith("/admin/query_maintenance_report") &&
		method === "GET"
	) {
		const query = parsedUrl.query;
		const habitat_name = query["habitat_name"];
		const working_status = query["working_status"];
		const start_date = query["start_date"];
		const end_date = query["end_date"];

		if (!habitat_name || !start_date || !end_date || !working_status) {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({ error: "Invalid URL missing query parameters." })
			);
			return;
		}

		maintenanceController.getMaintenceReportsByHabitat(
			req,
			res,
			habitat_name,
			working_status,
			start_date,
			end_date
		);
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
	} else if (url.startsWith("/admin/maintenance_report") && method === "POST") {
		maintenanceController.createMaintenanceReport(req, res);
	} else if (url.startsWith("/admin/maintenance_report") && method === "PUT") {
		const parts = parsedUrl.pathname.split("/");
		if (parts.length >= 4) {
			const maintenance_report_id = parts[3].slice(1);
			maintenanceController.updateMaintenanceReport(
				req,
				res,
				maintenance_report_id
			);
		} else {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({ error: "Invalid URL missing maintenance report id." })
			);
		}
	} else if (url.startsWith("/admin/event_category") && method === "GET") {
		eventController.getEventCategories(req, res);
	} else if (url.startsWith("/admin/event") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const event_id = parts[3].slice(1); // Extract event_id from the URL
			eventController.getSingleEvent(req, res, event_id);
		} else {
			eventController.getAllEvents(req, res);
		}
	} else if (url.startsWith("/admin/event") && method === "POST") {
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
	} else if (url.startsWith("/admin/ticket_type") && method === "GET") {
		const parts = parsedUrl.pathname.split("/");

		if (parts.length >= 4) {
			const ticket_type_id = parts[3].slice(1); // Extract ticket_type_id from the URL
			ticketController.getSingleTicketPrice(req, res, ticket_type_id);
		} else {
			ticketController.getAllTicketPricing(req, res);
		}
	} else if (url.startsWith("/admin/ticket_type") && method === "PUT") {
		ticketController.updateTicketPricing(req, res);
	} else if (url.startsWith("/admin/ticket_type") && method === "POST") {
		ticketController.createTicketPricing(req, res);
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
	} else if (url.startsWith("/admin/queried_vet_report") && method === "GET") {
		const query = parsedUrl.query;
		const animal_name = query["name"];
		const nickname = query["nickname"];
		const start_date = query["start_date"];
		const end_date = query["end_date"];

		if (!animal_name || !start_date || !end_date) {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({ error: "Invalid URL missing query parameters." })
			);
		}

		vetReportsController.getVetReportsByAnimal(
			req,
			res,
			animal_name,
			nickname,
			start_date,
			end_date
		);
	} else if (url.startsWith("/admin/vet_report") && method === "POST") {
		vetReportsController.createVetReport(req, res);
	} else if (url.startsWith("/admin/vet_report") && method === "PUT") {
		vetReportsController.updateVetReport(req, res);
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
	} else if (url.startsWith("/admin/employee_personal") && method === "PUT") {
		employeeController.updateEmployeePersonalInfo(req, res);
	} else if (url.startsWith("/admin/employee_employment") && method === "PUT") {
		employeeController.updateEmployeeEmploymentInfo(req, res);
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
	} else if (url.startsWith("/admin/login") && method === "POST") {
		authController.adminLogin(req, res);
	} else if (url.startsWith("/admin/auth_levels") && method === "GET") {
		authController.getAuthLevels(req, res);
	} else if (
		url.startsWith("/admin/other_department_employees") &&
		method === "GET"
	) {
		const query = parsedUrl.query;
		const first_name = query["first_name"];
		const last_name = query["last_name"];
		const department_id = query["department_id"];

		if (!first_name || !last_name || !department_id) {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({ error: "Invalid URL missing query parameters." })
			);
		}

		employeeController.getDifferentDepartmentEmployees(
			req,
			res,
			department_id,
			first_name,
			last_name
		);
	} else if (
		url.startsWith("/admin/assign_employee_department") &&
		method === "PUT"
	) {
		employeeController.assignDepartment(req, res);
	} else if (url.startsWith("/admin/query_habitat_name") && method === "GET") {
		const query = parsedUrl.query;
		const name = query["name"];

		if (!name) {
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({ error: "Invalid URL missing query parameters." })
			);
		}
		habitatController.getHabitatsByName(req, res, name);
	} else if (
		url.startsWith("/admin/raw_cost_analysis_animal_food") &&
		method === "GET"
	) {
		const query = parsedUrl.query;
		const start_date = query["start_date"];
		const end_date = query["end_date"];
		const animal_name = query["animal_name"];

		if (!start_date || !end_date || !animal_name) {
			animalFoodCostAnalysisController.getRawCostData(req, res);
		} else {
			animalFoodCostAnalysisController.getRawCostDataByDate(
				req,
				res,
				animal_name,
				start_date,
				end_date
			);
		}
	} else if (
		url.startsWith("/admin/cost_analysis_animal_food") &&
		method === "GET"
	) {
		const query = parsedUrl.query;
		const start_date = query["start_date"];
		const end_date = query["end_date"];
		const animal_name = query["animal_name"];

		if (!start_date || !end_date || !animal_name) {
			animalFoodCostAnalysisController.getCostAnalysis(req, res);
		} else {
			animalFoodCostAnalysisController.getCostAnalysisByDate(
				req,
				res,
				animal_name,
				start_date,
				end_date
			);
		}
	} else if (
		url.startsWith("/admin/raw_health_performance_metrics") &&
		method === "GET"
	) {
		const query = parsedUrl.query;
		const start_date = query["start_date"];
		const end_date = query["end_date"];
		const animal_name = query["animal_name"];
		const nickname = query["nickname"];

		if (!start_date || !end_date || !animal_name || !nickname) {
			animalHealthPerformanceController.getRawVetReportMetrics(req, res);
		} else {
			animalHealthPerformanceController.getVetReportMetricsByNameDate(
				req,
				res,
				animal_name,
				nickname,
				start_date,
				end_date
			);
		}
	} else if (
		url.startsWith("/admin/raw_health_food_eaten_metrics") &&
		method === "GET"
	) {
		const query = parsedUrl.query;
		const start_date = query["start_date"];
		const end_date = query["end_date"];
		const animal_name = query["animal_name"];
		const nickname = query["nickname"];

		if (!start_date || !end_date || !animal_name || !nickname) {
			animalHealthPerformanceController.getRawAnimalFoodEatenMetrics(req, res);
		} else {
			animalHealthPerformanceController.getAnimalFoodEatenMetricsByNameDate(
				req,
				res,
				animal_name,
				nickname,
				start_date,
				end_date
			);
		}
	} else if (
		url.startsWith("/admin/health_performance_metrics") &&
		method === "GET"
	) {
		const query = parsedUrl.query;
		const start_date = query["start_date"];
		const end_date = query["end_date"];
		const animal_name = query["animal_name"];
		const nickname = query["nickname"];

		if (!start_date || !end_date || !animal_name || !nickname) {
			animalHealthPerformanceController.getAnimalHealthPerformance(req, res);
		} else {
			animalHealthPerformanceController.getAnimalHealthPerformanceByNameDate(
				req,
				res,
				animal_name,
				nickname,
				start_date,
				end_date
			);
		}
	} else if (url.startsWith("/admin/pm_exhibit") && method === "GET") {
		const query = parsedUrl.query;
		const start_date = query["start_date"];
		const end_date = query["end_date"];
		const exhibit_name = query["exhibit_name"];

		if (!start_date || !end_date || !exhibit_name) {
			exhibitPerformanceController.getExhibitsPerformance(req, res);
		} else {
			exhibitPerformanceController.getExhibitsPerformanceByNameDate(
				req,
				res,
				exhibit_name,
				start_date,
				end_date
			);
		}
	} else if (url.startsWith("/admin/pm_tickets") && method === "GET") {
		const query = parsedUrl.query;
		const start_date = query["start_date"];
		const end_date = query["end_date"];
		const exhibit_name = query["exhibit_name"];

		if (!start_date || !end_date || !exhibit_name) {
			exhibitPerformanceController.getTicketsSoldPerExhibit(req, res);
		} else {
			exhibitPerformanceController.getTicketsSoldPerExhibitNameDate(
				req,
				res,
				exhibit_name,
				start_date,
				end_date
			);
		}
	} else if (
		url.startsWith("/admin/performance_complaints") &&
		method === "GET"
	) {
		const query = parsedUrl.query;
		const start_date = query["start_date"];
		const end_date = query["end_date"];
		const exhibit_name = query["exhibit_name"];

		if (!start_date || !end_date || !exhibit_name) {
			exhibitPerformanceController.getComplaintsPerExhibit(req, res);
		} else {
			exhibitPerformanceController.getComplaintsPerExhibitNameDate(
				req,
				res,
				exhibit_name,
				start_date,
				end_date
			);
		}
	} else if (url.startsWith("/admin/trigger") && method === "GET") {
		triggerController.testTrigger(req, res);
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "Route not found" }));
	}
}

module.exports = router;
