const { dbConnection } = require("../db");

const getAuthLevels = (req, res) => {
	dbConnection.query("SELECT * FROM authlevel", (err, result) => {
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

module.exports = {
	getAuthLevels,
};
