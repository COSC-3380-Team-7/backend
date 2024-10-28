// const pool = require("./db.js");
// const queries = require("./queries.js");
const jwt = require("jsonwebtoken");

/**
 * Habitat Schema
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
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			employee_id_params: employee_id,
			data: {
				employee_id: 1,
				first_name: "Employee 1",
				middle_initial: "A",
				last_name: "Employee 1",
				email: "a@gmail.com",
				phone_number: "1234567890",
				date_of_birth: "2021-01-01",
				address: "1234 Street",
				salary: 1.0,
				occupation_id: 1,
				auth_level_id: 1,
				department_id: 1,
				employment_status: "Employed",
				hire_date: "2021-01-01",
				password: "password",
				created_at: "2021-01-01",
				updated_at: "2021-01-01",
			},
		})
	);
};

const getAllEmployees = (req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
			data: [
				{
					employee_id: 1,
					first_name: "Employee 1",
					middle_initial: "A",
					last_name: "Employee 1",
					email: "a@gmail.com",
					phone_number: "1234567890",
					date_of_birth: "2021-01-01",
					address: "1234 Street",
					salary: 1.0,
					occupation_id: 1,
					auth_level_id: 1,
					department_id: 1,
					employment_status: "Employed",
					hire_date: "2021-01-01",
					password: "password",
					created_at: "2021-01-01",
					updated_at: "2021-01-01",
				},
			],
		})
	);
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
			created_at,
			updated_at,
		} = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: {
					employee_id,
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
					created_at,
					updated_at,
				},
			})
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
			created_at,
			updated_at,
		} = JSON.parse(body);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				data: {
					employee_id: 1234567,
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
					created_at,
					updated_at,
				},
			})
		);
	});
};

module.exports = {
	getSingleEmployee,
	getAllEmployees,
	updateEmployee,
	createEmployee,
};
