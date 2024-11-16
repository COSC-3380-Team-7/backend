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

	const sentFrom = new Sender(process.env.MAILERSEND_FROM_EMAIL, "Brandon");

	const recipients = [
		new Recipient("chung.brandon123@gmail.com", "Your Client"),
	];

	conn
		.promise()
		.query("SELECT `email`, `message` FROM `animal_food_restock_email_queue`")
		.then(async ([rows, fields]) => {
			await new Promise((resolve) => setTimeout(resolve, 5000));
			/*
				{
				email: 'jsmith@gmail.com',
				message: 'Lettuce is out of stock. Please restock.'
				}
			*/
			const message = rows[0].message;
			for (const r of rows) {
				console.log(r);
			}

			for (let i = 0; i < 1; i++) {
				const emailParams = new EmailParams()
					.setFrom(sentFrom)
					.setTo(recipients)
					.setReplyTo(sentFrom)
					.setSubject("Restock Animal Food")
					.setHtml(createEmailHTML("Your Client", "Brandon", message))
					.setText("Lettuce is out of stock. Please restock.");

				mailerSend.email
					.send(emailParams)
					.then((response) => {
						console.log("Email sent successfully:", response);
					})
					.catch((error) => {
						console.error("Error sending email:", error);
					});
			}

			conn
				.promise()
				.query("SELECT `email` FROM `animal_food_restock_email_queue`")
				.then(([rows, fields]) => {
					console.log(rows);
				})
				.catch(console.log);
		})
		.catch(console.log);

	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify({ message: "Test Trigger" }));
};

module.exports = {
	testTrigger,
};
