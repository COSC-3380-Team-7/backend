const { conn, dbConnection } = require("../db.js");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const mysql = require("mysql2/promise");

const mailerSend = new MailerSend({
	apiKey: process.env.MAILERSEND_API_TOKEN,
});

function createEmailHTML(first_name, last_name, message) {
	return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Restock Notification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #007bff;
                    color: #ffffff;
                    padding: 10px 0;
                    text-align: center;
                }
                .content {
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    color: #777777;
                    font-size: 12px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Restock Notification</h1>
                </div>
                <div class="content">
                    <p>Dear ${first_name} ${last_name}</p>
                    <p>${message}</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Zoo Management System</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

const testTrigger = async (req, res) => {
	/*
		CREATE TABLE if not exists animal_food_restock_email_queue (
			email_que_id BIGINT AUTO_INCREMENT PRIMARY KEY,
			email VARCHAR(255),
			animal_food_id BIGINT,
			message VARCHAR(255),
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	*/
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify({ message: "Test Trigger" }));

	return;

	const sentFrom = new Sender(process.env.MAILERSEND_FROM_EMAIL, "Baker Zoo");

	conn
		.promise()
		.query(
			"SELECT `email_que_id`, `email`, `message`, `first_name`, `last_name` FROM `animal_food_restock_email_queue`"
		)
		.then(async ([rows, fields]) => {
			if (rows.length === 0) {
				console.log("No emails to send.");
				return;
			}

			await new Promise((resolve) => setTimeout(resolve, 5000));

			const message = rows[0].message;
			const zookeeperEmails = rows.map((r) => r.email);

			const bulkEmails = rows
				.filter((r) => !r.email.endsWith("@zoo.com"))
				.map((r) => {
					if (!r.email) {
						return;
					}

					const emailParams = new EmailParams()
						.setFrom(sentFrom)
						.setTo([new Recipient(r.email)])
						.setSubject("Animal Food Restock Notification")
						.setHtml(
							createEmailHTML(
								"Zookeeper",
								`${r.first_name} ${r.last_name}`,
								message
							)
						)
						.setText(message);

					return emailParams;
				});

			mailerSend.email
				.sendBulk(bulkEmails)
				.then((response) => {
					console.log("Email sent successfully:", response);
				})
				.catch(console.error);

			const emailStrForSQLDelete = zookeeperEmails
				.map((email) => `'${email}'`)
				.join(", ");

			conn
				.promise()
				.query(
					`DELETE FROM animal_food_restock_email_queue WHERE email IN (${emailStrForSQLDelete})`
				)
				.then(([rows, fields]) => {
					console.log("Cleared email queue.");
				})
				.catch(console.log);
		})
		.catch(console.log);
};

module.exports = {
	testTrigger,
};
