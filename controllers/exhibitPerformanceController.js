const { dbConnection } = require("../db.js");

const getExhibitsPerformance = (req, res) => {
	dbConnection.query(
		`SELECT 
			e.name AS exhibit_name,
			COALESCE(tp_data.tickets_sold, 0) AS tickets_sold,
			COALESCE(tp_data.total_profit, 0) AS total_profit,
			COALESCE(c_data.number_of_complaints, 0) AS number_of_complaints
		FROM
			exhibits e
		LEFT JOIN (
			SELECT 
				exhibit_id,
				SUM(quantity_purchased) AS tickets_sold,
				SUM(purchase_price * quantity_purchased) AS total_profit
			FROM 
				ticketpurchases
			WHERE 
				purchase_date BETWEEN '2024-11-01' AND '2024-11-30'
			GROUP BY 
				exhibit_id
		) tp_data ON e.exhibit_id = tp_data.exhibit_id
		LEFT JOIN (
			SELECT 
				exhibit_id,
				COUNT(DISTINCT id) AS number_of_complaints
			FROM 
				complaints
			WHERE 
				date_created BETWEEN '2024-11-01' AND '2024-11-30'
			GROUP BY 
				exhibit_id
		) c_data ON e.exhibit_id = c_data.exhibit_id
		ORDER BY 
			total_profit DESC;`,
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						error: "Internal Server Error",
					})
				);
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: result,
				})
			);
		}
	);
};

const getTicketsSoldPerExhibit = (req, res) => {
	dbConnection.query(
		`SELECT 
            e.name AS ExhibitName,
            tt.category AS TicketCategory,
			tt.price AS TicketPrice,
            COALESCE(SUM(tp.purchase_price * tp.quantity_purchased), 0) AS TotalProfit,
            COALESCE(SUM(tp.quantity_purchased), 0) AS TicketsSoldByType
        FROM 
            exhibits e
        CROSS JOIN 
            tickettype tt
        LEFT JOIN 
            ticketpurchases tp ON e.exhibit_id = tp.exhibit_id AND tt.ticket_type_id = tp.ticket_type_id
        GROUP BY 
            e.exhibit_id, e.name, tt.category
        ORDER BY 
            e.exhibit_id, tt.category;`,
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						error: "Internal Server Error",
					})
				);
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: result,
				})
			);
		}
	);
};

const getTicketsSoldPerExhibitNameDate = (
	req,
	res,
	exhibitName,
	startDate,
	endDate
) => {
	dbConnection.query(
		`SELECT 
            e.name AS ExhibitName,
			tt.price AS TicketPrice,
            tt.category AS TicketCategory,
            COALESCE(SUM(tp.purchase_price * tp.quantity_purchased), 0) AS TotalProfit,
            COALESCE(SUM(tp.quantity_purchased), 0) AS TicketsSoldByType
        FROM 
            exhibits e
        CROSS JOIN 
            tickettype tt
        LEFT JOIN 
            ticketpurchases tp ON e.exhibit_id = tp.exhibit_id AND tt.ticket_type_id = tp.ticket_type_id
        WHERE 
            e.name = ? AND tp.purchase_date BETWEEN ? AND ?
        GROUP BY 
            e.exhibit_id, e.name, tt.category
        ORDER BY 
            e.exhibit_id, tt.category;`,
		[exhibitName, startDate, endDate],
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						error: "Internal Server Error",
					})
				);
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: result,
				})
			);
		}
	);
};

const getComplaintsPerExhibit = (req, res) => {
	/*
        SELECT 
        c.id AS ComplaintID,
        e.exhibit_id AS ExhibitID,
        e.name AS ExhibitName,
        c.title AS ComplaintTitle,
        c.complaint AS ComplaintDetails,
        c.visitor_id AS VisitorID,
        CONCAT(v.first_name, ' ', v.last_name) AS VisitorName
    FROM 
        complaints c
    JOIN 
        exhibits e ON c.exhibit_id = e.exhibit_id
    JOIN 
        visitors v ON c.visitor_id = v.visitor_id
    ORDER BY 
        e.exhibit_id, c.id;
    */

	dbConnection.query(
		`SELECT 
            c.id AS ComplaintID,
            e.exhibit_id AS ExhibitID,
            e.name AS ExhibitName,
            c.title AS ComplaintTitle,
            c.complaint AS ComplaintDetails,
            c.visitor_id AS VisitorID,
            CONCAT(v.first_name, ' ', v.last_name) AS VisitorName
        FROM 
            complaints c
        JOIN 
            exhibits e ON c.exhibit_id = e.exhibit_id
        JOIN 
            visitors v ON c.visitor_id = v.visitor_id
        ORDER BY 
            e.exhibit_id, c.id;`,
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						error: "Internal Server Error",
					})
				);
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: result,
				})
			);
		}
	);
};

const getComplaintsPerExhibitNameDate = (
	req,
	res,
	exhibitName,
	startDate,
	endDate
) => {
	dbConnection.query(
		`SELECT 
            c.id AS ComplaintID,
            e.exhibit_id AS ExhibitID,
            e.name AS ExhibitName,
            c.title AS ComplaintTitle,
            c.complaint AS ComplaintDetails,
            c.visitor_id AS VisitorID,
            CONCAT(v.first_name, ' ', v.last_name) AS VisitorName
        FROM 
            complaints c
        JOIN 
            exhibits e ON c.exhibit_id = e.exhibit_id
        JOIN 
            visitors v ON c.visitor_id = v.visitor_id
        WHERE 
            e.name = ? AND c.date_created BETWEEN ? AND ?
        ORDER BY 
            e.exhibit_id, c.id;`,
		[exhibitName, startDate, endDate],
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						error: "Internal Server Error",
					})
				);
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: result,
				})
			);
		}
	);
};

const getExhibitsPerformanceByNameDate = (
	req,
	res,
	exhibitName,
	startDate,
	endDate
) => {
	dbConnection.query(
		`SELECT 
			e.name AS exhibit_name,
			COALESCE(tp_data.tickets_sold, 0) AS tickets_sold,
			COALESCE(tp_data.total_profit, 0) AS total_profit,
			COALESCE(c_data.number_of_complaints, 0) AS number_of_complaints
		FROM
			exhibits e
		LEFT JOIN (
			SELECT 
				exhibit_id,
				SUM(quantity_purchased) AS tickets_sold,
				SUM(purchase_price * quantity_purchased) AS total_profit
			FROM 
				ticketpurchases
			WHERE 
				exhibit_id = (SELECT exhibit_id FROM exhibits WHERE name = ?) AND purchase_date BETWEEN ? AND ?
			GROUP BY 
				exhibit_id
		) tp_data ON e.exhibit_id = tp_data.exhibit_id
		LEFT JOIN (
			SELECT 
				exhibit_id,
				COUNT(DISTINCT id) AS number_of_complaints
			FROM 
				complaints
			WHERE 
				exhibit_id = (SELECT exhibit_id FROM exhibits WHERE name = ?) AND date_created BETWEEN ? AND ?
			GROUP BY 
				exhibit_id
		) c_data ON e.exhibit_id = c_data.exhibit_id
		 WHERE e.name = ?
		ORDER BY 
			total_profit DESC;`,
		[
			exhibitName,
			startDate,
			endDate,
			exhibitName,
			startDate,
			endDate,
			exhibitName,
		],
		(err, result) => {
			if (err) {
				console.log(err);
				res.writeHead(500, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						error: "Internal Server Error",
					})
				);
				return;
			}

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					data: result,
				})
			);
		}
	);
};

module.exports = {
	getExhibitsPerformance,
	getExhibitsPerformanceByNameDate,
	getTicketsSoldPerExhibit,
	getTicketsSoldPerExhibitNameDate,
	getComplaintsPerExhibit,
	getComplaintsPerExhibitNameDate,
};
