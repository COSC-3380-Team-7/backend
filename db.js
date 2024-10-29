const fs = require("fs");
const mysql = require("mysql");
const serverCa = [
	fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem", "utf8"),
];

const dbConnection = mysql.createConnection({
	host: "zoo-team7.mysql.database.azure.com",
	user: "dbadmin",
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: 3306,
	ssl: {
		rejectUnauthorized: true,
		ca: serverCa,
	},
});

dbConnection.connect((err) => {
	if (err) {
		console.error("Error connecting to database:", err.stack);
		return;
	}
	console.log("connected as id " + dbConnection.threadId);
});

module.exports = { dbConnection };
