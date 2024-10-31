const { dbConnection } = require("../db.js");
const jwt = require("jsonwebtoken");

/**
 * Employee Schema
 * employee_id: int
 * first_name: string
 * [Optional] middle_initial: string
 * last_name: string
 * email: string
 * phone_number: string
 * date_of_birth: date
 * address: string
 * salary: float
 * occupation_id: int
 * auth_level_id: int = 0, 1, 2
 * department_id: int
 * employment_status: string = "Employed", "Former Employee", "Fired"
 * hire_date: date
 * password: string
 * created_at: date
 * updated_at: date
 **/

const getSingleEmployee = (req, res, employee_id) => {
	dbConnection.query(
		"SELECT e.employee_id, e.first_name, e.middle_initial, e.last_name, e.email, e.phone_number, e.date_of_birth, e.address, e.salary, e.occupation_id, e.auth_level_id, e.supervisor_id, e.department_id, e.employment_status, e.hire_date, d.name AS department_name, o.name AS occupation_name FROM employees AS e JOIN departments AS d ON e.department_id = d.department_id JOIN occupation AS o ON o.occupation_id = e.occupation_id WHERE e.employee_id = ?",
		[employee_id],
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}
			if (result.length === 0) {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Employee does not exist" }));
				return;
			}
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ data: result[0] }));
		}
	);
};

const getDepartmentEmployees = (req, res, department_id) => {
	dbConnection.query(
		"SELECT * FROM employees WHERE department_id = ?",
		[department_id],
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Internal Server Error" }));
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ data: result }));
		}
	);
};

const getAllEmployees = (req, res) => {
	dbConnection.query("SELECT * FROM employees", (err, result) => {
		if (err) {
			console.log(err);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Internal Server Error" }));
			return;
		}

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ data: result }));
	});
};

const updateEmployee = (req, res, employee_id) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const {
			first_name,
			middle_initial,
			last_name,
			email,
			phone_number,
			date_of_birth,
			address,
			salary,
			occupation_id,
			auth_level_id,
			department_id,
			employment_status,
			hire_date,
			password,
		} = JSON.parse(body);

		dbConnection.query(
			"UPDATE employees SET first_name = ?, middle_initial = ?, last_name = ?, email = ?, phone_number = ?, date_of_birth = ?, address = ?, salary = ?, occupation_id = ?, auth_level_id = ?, department_id = ?, employment_status = ?, hire_date = ?, password = ?, created_at = ?, updated_at = ? WHERE employee_id = ?",
			[
				first_name,
				middle_initial,
				last_name,
				email,
				phone_number,
				date_of_birth,
				address,
				salary,
				occupation_id,
				auth_level_id,
				department_id,
				employment_status,
				hire_date,
				password,
				employee_id,
			],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						message: "Employee updated successfully",
					})
				);
			}
		);
	});
};

const createEmployee = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const {
			first_name,
			middle_initial,
			last_name,
			email,
			phone_number,
			date_of_birth,
			address,
			salary,
			occupation_id,
			auth_level_id,
			department_id,
			employment_status,
			hire_date,
			password,
		} = JSON.parse(body);

		dbConnection.query(
			"INSERT INTO employees (first_name, middle_initial, last_name, email, phone_number, date_of_birth, address, salary, occupation_id, auth_level_id, department_id, employment_status, hire_date, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				first_name,
				middle_initial,
				last_name,
				email,
				phone_number,
				date_of_birth,
				address,
				salary,
				occupation_id,
				auth_level_id,
				department_id,
				employment_status,
				hire_date,
				password,
			],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				res.writeHead(201, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						message: "Employee created successfully",
					})
				);
			}
		);
	});
};

module.exports = {
	getDepartmentEmployees,
	getSingleEmployee,
	getAllEmployees,
	updateEmployee,
	createEmployee,
};
