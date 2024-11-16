const { dbConnection } = require("../db.js");
const bcrypt = require("bcrypt");

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
		"SELECT e.employee_id, e.first_name, e.middle_initial, e.last_name, e.email, e.phone_number, e.date_of_birth, e.address, e.salary, e.occupation_id, e.auth_level_id, e.manager_id, e.department_id, e.employment_status, e.hire_date, d.name AS department_name, o.name AS occupation_name, a.title as position FROM employees AS e JOIN departments AS d ON e.department_id = d.department_id JOIN occupation AS o ON o.occupation_id = e.occupation_id JOIN authlevel AS a ON e.auth_level_id = a.auth_level_id WHERE e.employee_id = ?",
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
		"SELECT e.employee_id, e.first_name, e.last_name, o.name as occupation, a.title FROM employees AS e JOIN occupation AS o ON e.occupation_id = o.occupation_id JOIN authlevel AS a ON e.auth_level_id = a.auth_level_id WHERE department_id = ? AND e.employment_status = 'Employed' AND e.employment_status = 'Employed'",
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

const getSupervisedEmployees = (req, res, supervisor_id) => {
	dbConnection.query(
		"SELECT e.employee_id, e.first_name, e.last_name, o.name as occupation, a.title FROM employees AS e JOIN occupation AS o ON e.occupation_id = o.occupation_id JOIN authlevel AS a ON e.auth_level_id = a.auth_level_id WHERE manager_id = ? AND e.employment_status = 'Employed'",
		[supervisor_id],
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

const getDifferentDepartmentEmployees = (
	req,
	res,
	department_id,
	first_name,
	last_name
) => {
	dbConnection.query(
		"SELECT e.employee_id, e.first_name, e.last_name, d.name as department_name, a.title, o.name as occupation_name FROM employees AS e JOIN occupation AS o ON e.occupation_id = o.occupation_id JOIN authlevel AS a ON e.auth_level_id = a.auth_level_id JOIN departments AS D ON e.department_id = d.department_id WHERE e.department_id != ? AND e.first_name = ? AND e.last_name = ? AND e.employment_status = 'Employed'",
		[department_id, first_name, last_name],
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
			hire_date,
			password,
		} = JSON.parse(body);

		dbConnection.query(
			"UPDATE employees SET first_name = ?, middle_initial = ?, last_name = ?, email = ?, phone_number = ?, date_of_birth = ?, address = ?, salary = ?, occupation_id = ?, auth_level_id = ?, department_id = ?, hire_date = ?, password = ?, created_at = ?, updated_at = ? WHERE employee_id = ?",
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

const updateEmployeePersonalInfo = (req, res) => {
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
			employee_id,
		} = JSON.parse(body);

		dbConnection.query(
			"UPDATE employees SET first_name = ?, middle_initial = ?, last_name = ?, email = ?, phone_number = ?, date_of_birth = ?, address = ? WHERE employee_id = ?",
			[
				first_name,
				middle_initial,
				last_name,
				email,
				phone_number,
				date_of_birth,
				address,
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

const updateEmployeeEmploymentInfo = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const {
			salary,
			occupation_id,
			auth_level_id,
			department_id,
			employment_status,
			hire_date,
			password,
			employee_id,
		} = JSON.parse(body);

		if (!password) {
			dbConnection.query(
				"UPDATE employees SET salary = ?, occupation_id = ?, auth_level_id = ?, department_id = ?, employment_status = ?, hire_date = ? WHERE employee_id = ?",
				[
					salary,
					occupation_id,
					auth_level_id,
					department_id,
					employment_status,
					hire_date,
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
		} else {
			const hash = bcrypt.hashSync(password, 10);

			dbConnection.query(
				"UPDATE employees SET salary = ?, occupation_id = ?, auth_level_id = ?, department_id = ?, employment_status = ?, hire_date = ?, password = ? WHERE employee_id = ?",
				[
					salary,
					occupation_id,
					auth_level_id,
					department_id,
					employment_status,
					hire_date,
					hash,
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
		}
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

		const hash = bcrypt.hashSync(password, 10);

		// Check if email already exists
		dbConnection.query(
			"SELECT email FROM employees WHERE email = ?",
			[email],
			(err, result) => {
				if (err) {
					console.log(err);
					res.writeHead(500, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Internal Server Error" }));
					return;
				}

				if (result.length > 0) {
					res.writeHead(400, { "Content-Type": "application/json" });
					res.end(
						JSON.stringify({
							error_message: "Employee with email already exists",
						})
					);
					return;
				}

				// Insert new employee
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
						hash,
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
			}
		);
	});
};

const assignDepartment = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { department_id, employee_id } = JSON.parse(body);

		dbConnection.query(
			"UPDATE employees SET department_id = ? WHERE employee_id = ?",
			[department_id, employee_id],
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
						message: "Department assigned successfully",
					})
				);
			}
		);
	});
};

const getPastEmployees = (req, res) => {
	dbConnection.query(
		"SELECT * FROM employees WHERE employment_status != 'Employed'",
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

const rehireEmployee = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		dbConnection.query(
			"UPDATE employees SET employment_status = 'Employed' WHERE employee_id = ?",
			[employee_id],
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
						message: "Employee rehired successfully",
					})
				);
			}
		);
	});
};

const promoteEmployee = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const { auth_level_id, employee_id } = JSON.parse(body);

		dbConnection.query(
			"UPDATE employees SET auth_level_id = ? WHERE employee_id = ?",
			[auth_level_id, employee_id],
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
						message: "Employee promoted successfully",
					})
				);
			}
		);
	});
};

module.exports = {
	getDepartmentEmployees,
	getDifferentDepartmentEmployees,
	getSingleEmployee,
	getAllEmployees,
	updateEmployee,
	updateEmployeePersonalInfo,
	updateEmployeeEmploymentInfo,
	createEmployee,
	assignDepartment,
	getSupervisedEmployees,
	rehireEmployee,
};
