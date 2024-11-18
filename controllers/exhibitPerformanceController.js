const { dbConnection } = require("../db.js");

const getExhibitsPerformance = (req, res) => {
	/*
        SELECT 
        e.name AS exhibit_name,
        COALESCE(SUM(tp.quantity_purchased), 0) AS tickets_sold,
        COALESCE(SUM(tp.purchase_price * tp.quantity_purchased), 0) AS total_profit,
        COALESCE(COUNT(c.id), 0) AS number_of_complaints
        FROM 
            exhibits e
        LEFT JOIN 
            ticketpurchases tp ON e.exhibit_id = tp.exhibit_id
        LEFT JOIN 
            complaints c ON e.exhibit_id = c.exhibit_id
        GROUP BY 
            e.exhibit_id, e.name
        ORDER BY 
            total_profit DESC;

    */
	dbConnection.query(
		`SELECT 
            e.name AS exhibit_name,
            COALESCE(SUM(tp.quantity_purchased), 0) AS tickets_sold,
            COALESCE(SUM(tp.purchase_price * tp.quantity_purchased), 0) AS total_profit,
            COALESCE(COUNT(c.id), 0) AS number_of_complaints
        FROM 
            exhibits e
        LEFT JOIN 
            ticketpurchases tp ON e.exhibit_id = tp.exhibit_id
        LEFT JOIN 
            complaints c ON e.exhibit_id = c.exhibit_id
        GROUP BY 
            e.exhibit_id, e.name
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
            COALESCE(SUM(tp.quantity_purchased), 0) AS tickets_sold,
            COALESCE(SUM(tp.purchase_price * tp.quantity_purchased), 0) AS total_profit,
            COALESCE(COUNT(c.id), 0) AS number_of_complaints
        FROM 
            exhibits e
        LEFT JOIN 
            ticketpurchases tp ON e.exhibit_id = tp.exhibit_id
        LEFT JOIN 
            complaints c ON e.exhibit_id = c.exhibit_id
        WHERE 
            e.name = ? AND tp.purchase_date BETWEEN ? AND ?
            AND c.date_created BETWEEN ? AND ?
        GROUP BY 
            e.exhibit_id, e.name
        ORDER BY 
            total_profit DESC;`,
		[exhibitName, startDate, endDate, startDate, endDate],
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
