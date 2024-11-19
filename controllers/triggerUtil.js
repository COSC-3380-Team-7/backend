const { conn } = require("../db.js");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
	apiKey:
		"mlsn.0bb697676a9d0ac9913245a4d12191e9a87efbe998a4553fcd1cd3808681d413",
});

const restockNotificationStoredProcedure = () => {
	const sentFrom = new Sender(
		"MS_hDQ5DM@trial-z3m5jgrw0exldpyo.mlsender.net",
		"Houston Zoo"
	);

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
							createRestockEmailHTML(
								"Zookeeper",
								`${r.first_name} ${r.last_name}`,
								message
							)
						);

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

const createRestockEmailHTML = (first_name, last_name, message) => {
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
                    <p>&copy; 2024 Houston Zoo Management System</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

const sickAnimalNotificationStoredProcedure = () => {
	const sentFrom = new Sender(process.env.MAILERSEND_FROM_EMAIL, "Houston Zoo");

	conn
		.promise()
		.query(
			"SELECT `email_que_id`, `email`, `message`, `first_name`, `last_name` FROM `sick_animal_notification_email_queue`"
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
						.setSubject("Sick / Injured Animal Notification")
						.setHtml(
							createSickAnimalEmailHTML(
								"Zookeeper",
								`${r.first_name} ${r.last_name}`,
								message
							)
						);

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
					`DELETE FROM sick_animal_notification_email_queue WHERE email IN (${emailStrForSQLDelete})`
				)
				.then(([rows, fields]) => {
					console.log("Cleared email queue.");
				})
				.catch(console.log);
		})
		.catch(console.log);
};

const createSickAnimalEmailHTML = (first_name, last_name, message) => {
	return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sick Animal Notification</title>
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
                    <h1>Sick Animal Notification</h1>
                </div>
                <div class="content">
                    <p>Dear ${first_name} ${last_name}</p>
                    <p>${message}</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Houston Zoo Management System</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

module.exports = {
	restockNotificationStoredProcedure,
	sickAnimalNotificationStoredProcedure,
};
