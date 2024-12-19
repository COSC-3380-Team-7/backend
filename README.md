<div>
  <picture align="center">
    <source
      width="100%"
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      srcset="/public/img/jake-weirick-6TyC5S5xnvM-unsplash.jpg"
    />
    <source
      width="100%"
      media="(prefers-color-scheme: dark)"
      srcset="/public/img/jake-weirick-6TyC5S5xnvM-unsplash.jpg"
    />
    <img alt="Logo">
  </picture>
  <h1 align="center">
    The Houston Zoo
  </h1>
  <p>
    Welcome to the Houston Zoo database system and our full-stack website project! Our goal was to design and implement a practical database system tailored for a zoo setting, enabling efficient management of animals, exhibits, habitats, ticketing, and visitor interactions.
  </p>
</div>

---

### About the Houston Zoo Project

Welcome to the Houston Zoo database and our full-stack website project! We aimed to design and implement a practical database system tailored for a zoo environment.

#### Mini-World Description:

Our mini-world revolves around two main sections:

- **Users**: Customers, employees, and branch directors interact with the zoo's services and activities. We manage and store information associated with each user, implementing features like memberships and employee roles.
- **Animalistic Entities and Operations**: The zoo's collection of exhibits, events, tickets, and animal food inventory are managed through the system. Customers can purchase tickets and view the zoo's hours, employees watch over the exhibits and stock on food, and managers can oversee their branch, such as the vet corner or the overall exhibits, and implement additions, updates, and deletions to be made.

#### Key Relationships:

- **Admin**: Manage employees, organize exhibits, and oversee zoo operations.
- **Exhibits**: Contain certian animals in their perfect enviorment.
- **Customers**: Purchase tickets, become a member, and view certian details about the zoo.
- **Manager**: Manage animal food and animal food purchases.

This database system enables efficient tracking of zoo activities, financial transactions, and user interactions, empowering the Houston Zoo to generate joy across all demographics and making sure our animals have a long life and prosper.

# Project Requirements

<h6>Each bullet will route to the specific instance in which we have implemented them</h6>

1. [**User Authentication for different user roles**](#user-auth)
2. [**Data entry forms to add new data, modify existing data, and 'delete' data**](#data-entry-forms)
3. [**At least 2 triggers**](#triggers)
4. [**At least 3 queries**](#queries)
5. [**At least 3 reports**](#reports)

# Technologies

**Frontend**:
![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)

**Backend**:
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)

**Database**:
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white)

**Testing**:
![Postman](https://img.shields.io/badge/-Postman-FF6C37?logo=postman&logoColor=white)

**Authentication**:
![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens) ![JS-Cookies](https://img.shields.io/badge/-JS_Cookies-F7DF1E?logo=javascript&logoColor=black)

**Deployment**:
![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/-Render-2D2D2D?logo=render&logoColor=white) ![Azure](https://img.shields.io/badge/-Azure-0089D6?logo=microsoft-azure&logoColor=white)

**Version Control**:
![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)

# Hosting Locally

- Install git on your machine if you haven't already.
- Make sure the latest version of [Node.js](https://nodejs.org/en/) is installed on your machine. Some features may not work on older versions of Node.js.

### Cloning The Repository

```bash
mkdir backend
cd backend
git init
git remote add origin https://github.com/COSC-3380-Team-7/backend.git
git pull origin main
npm i
(create .env file in root directory)
npm run start
```

> [!IMPORTANT]
> Ensure that `.env` and is properly implemented so it could function.

```env

```

> [!NOTE]
> A new window will automatically open in your default browser on `http://localhost:8081`.

> [!NOTE]
> A new window will become visible on your default browser on `http://localhost:8081`; however, it will not automatically open, so make sure to open this link manually.

<a name="user-auth"></a>

## User Authentication for different user roles

We have 5 different user roles implemented for this: Admin, Zookeeper Manager, Zookeep Employee, Vet Manager and User.

- Admin: The Admin has access to see and manage everything as they should.
  - https://zooteam7.netlify.app/admin/login
  - email: ldoe@zoo.com
  - password: password123
- Zookeeper Manager: The Zookeeper Manger has access to all Zookeeper employees.
- https://zooteam7.netlify.app/manager/login
- email: jsmith@zoo.com
- password:password123
- Zookeeper Employee: The Zookeeper employee is in charge of which ever task is bestowed upon them(i.e. animals, vet help, and etc.)
  - https://zooteam7.netlify.app/employee/login
  - email: btoe@zoo.com
  - password: password123
- Vet Manager: The Vet manager has access to Create and look up vet reports, while having access to the exhibits.
- https://zooteam7.netlify.app/manager/login
- email: atran@zoo.com
- password: password123
- User: The User is any member of the public that can only view what the zoo has to offer, purchase tickets, view times, view exhibits, and view the animals.
  - email: dio@gmail.com
  - password: password

<a name="data-entry-forms"></a>

## Data entry forms to add new data, modify existing data, and 'delete' data

We have plenty of pages through which the admin or employee of that branch can access and add/edit/delete to/from.

### User:

- [Sign Up](https://zooteam7.netlify.app/signup): This page is a data entry form where you can add your information to get into the system to be able to log in.
- [Edit Profile](https://zooteam7.netlify.app/editprofile): This page is an editable data form where you can edit the data you entered from the Sign Up page.
- [Membership](https://zooteam7.netlify.app/memberships): This entry allows to enable a membership or cancel one at the click of a button.

### Manager:

- [Manage Animal Food](https://zooteam7.netlify.app/manager/zookeeper/animal_food/): This data entry form allows the management of food and the addition of new food.
- [Manage Animal Food Purchase](https://zooteam7.netlify.app/manager/zookeeper/animal_food/purchase): This data entry form allows for a form to go in for the purchase of more animal food. This works in correlation to our trigger.

### Admin-Only:

- [Manage Deparments](https://zooteam7.netlify.app/admin/department): This data entry form is for admins to be able to add, delete (fire/terminate), and edit employees; however, firing only makes the employee "inactive" and beside there name is labeled "Fired". There is a selection on the edit form where the admin can select if they choose to reactive or keep the employees inactive.
- [Manage Exhibits](https://zooteam7.netlify.app/admin/department): This data entry form allows admin to create, edit, or close down exhibits. Similar to events we need to make one of these inactive in case one of the animals get sick, or gets too big for that specific exhibit.
- [Manage Events](https://zooteam7.netlify.app/admin/event): This data entry form is for admin to create or edit these events. This allows us to "remove" events until the next year where we can reuse the events.
- [Manage Tickets](https://zooteam7.netlify.app/admin/ticket): This data entry form allows admin to create or edit ticket pricing. As inflation is a serious topic in our society we may need to change the price in order to keep up with the ever growing inflation. With the down comes an up where we can provide many discounts by creating new tickets.

<a name="triggers"></a>

## Triggers

### Sick Animal Trigger:

This setup automates the notification process for zookeepers when an animal's health deteriorates. It ensures health status consistency across the database, and allows timely alerts to zookeepers, allowing quick responses.

```sql
CREATE PROCEDURE insert_sick_animal_notification(
    IN p_animal_id BIGINT,
    IN p_health_status VARCHAR(20)
)
BEGIN
    -- Update the animal's health status
    UPDATE animals
    SET health_status = p_health_status
    WHERE animal_id = p_animal_id;

    -- Insert into the email queue
    INSERT INTO sick_animal_notification_email_queue (email, first_name, last_name, animal_id, animal_name, animal_nickname, health_status, message)
    SELECT
        e.email,
        e.first_name,
        e.last_name,
        p_animal_id,
        a.name,
        a.nickname,
        p_health_status,
        CONCAT('The animal ', a.nickname, ' the ', a.name, ' is ', LOWER(p_health_status), '. Please check on it.')
    FROM
        employees e
            JOIN
        occupation o ON e.occupation_id = o.occupation_id
            JOIN
        departments AS d ON e.department_id = d.department_id,
        animals a
    WHERE
        o.name = 'Zookeeper'
        AND a.animal_id = p_animal_id;
END $$

DELIMITER ;

DROP TRIGGER IF EXISTS after_veterinary_report_insert;

DELIMITER $$

CREATE TRIGGER after_veterinary_report_insert
AFTER INSERT ON veterinaryreports
FOR EACH ROW
BEGIN
    IF NEW.health_status = 'Sick' OR NEW.health_status = 'Injured' THEN
        CALL insert_sick_animal_notification(NEW.animal_id, NEW.health_status);
    END IF;
END $$

DELIMITER ;
```

### Restock Animal Food Trigger:

This trigger ensures that when food for animals runs out, managers that are responsible for restocking are immediately notified. It helps prevent delays in replenishment and supports the animals by ensuring timely restocking of supplies.

```sql
DELIMITER $$

CREATE PROCEDURE insert_animal_food_restock_notification(
    IN p_animal_food_id BIGINT,
    IN p_food_name VARCHAR(100)
)
BEGIN
    -- Insert into the email queue
    INSERT INTO animal_food_restock_email_queue (email, first_name, last_name, animal_food_id, message)
    SELECT
        e.email,
        e.first_name,
        e.last_name,
        p_animal_food_id,
        CONCAT(p_food_name, ' is out of stock. Please restock.')
    FROM
        employees e
            JOIN
        occupation o ON e.occupation_id = o.occupation_id
            JOIN
        departments AS d ON e.department_id = d.department_id
            JOIN
        authlevel AS a ON e.auth_level_id = a.auth_level_id
    WHERE
        o.name = 'Zookeeper' AND a.title = 'Manager';
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER restock_animal_food
AFTER UPDATE ON animalfood
FOR EACH ROW
BEGIN
    IF NEW.stock = 0 AND OLD.stock > 0 THEN
        CALL insert_animal_food_restock_notification(NEW.animal_food_id, NEW.food_name);
    END IF;
END $$

DELIMITER ;
```

<a name="queries"></a>

## Queries

We have 3 queries that go with the 3 reports we go more into detail later: one for a Health Analysis Report, an Cost Analysis of Animal Food Data Report, and Exhibit Performance Report.

### Health Analysis Report Query:

- This query combines data about animals by calculating their total food consumption, distinct food types, minimum and maximum weight/height (with net changes), health statuses (sick/injured counts), and total vet checkups, grouped by each animal's ID, name, and nickname, and ordered alphabetically by the animal's name.

```sql
SELECT
            a.animal_id,
            a.name AS animal_name,
            a.nickname,
            SUM(af.quantity) AS total_food_quantity,
            GROUP_CONCAT(DISTINCT f.food_name SEPARATOR ', ') AS food_types,
            MIN(vr.measured_weight) AS min_weight,
            MAX(vr.measured_weight) AS max_weight,
            (MAX(vr.measured_weight) - MIN(vr.measured_weight)) AS net_weight_change,
            MIN(vr.measured_height) AS min_height,
            MAX(vr.measured_height) AS max_height,
            (MAX(vr.measured_height) - MIN(vr.measured_height)) AS net_height_change,
            SUM(CASE WHEN vr.health_status = 'Sick' THEN 1 ELSE 0 END) AS sick_count,
            SUM(CASE WHEN vr.health_status = 'Injured' THEN 1 ELSE 0 END) AS injured_count,
            COUNT(vr.vet_report_id) AS total_checkups
        FROM
            animalfoodeaten af
        JOIN
            animals a ON af.animal_id = a.animal_id
        JOIN
            animalfood f ON af.animal_food_id = f.animal_food_id
        JOIN
            veterinaryreports vr ON a.animal_id = vr.animal_id
        GROUP BY
            a.animal_id, a.name, a.nickname
        ORDER BY
            a.name
```

### Cost Analysis of Animal Food Data Report Query:

- This query calculates the total quantity and cost of food consumed by each animal, broken down by food name and type, while also determining the cumulative purchase cost for each type of food consumed.

```sql
SELECT
            a.name,
            SUM(afe.quantity) AS food_eaten,
            af.food_name,
            af.food_type,
            ROUND((SUM(afe.quantity) / SUM(afp.quantity)) * SUM(afp.quantity * afp.purchased_price), 2) AS food_eaten_cost,
            SUM(afp.quantity * afp.purchased_price) AS cumulative_purchase_cost
        FROM
            animals AS a
            JOIN animalfoodeaten AS afe ON a.animal_id = afe.animal_id
            JOIN animalfood AS af ON afe.animal_food_id = af.animal_food_id
            JOIN animalfoodpurchases AS afp ON af.animal_food_id = afp.animal_food_id
        WHERE afe.quantity IS NOT NULL AND afe.quantity > 0
        GROUP BY a.name, af.food_name, af.food_type
        ORDER BY a.name, af.food_name
```

### Exhibit Performance Report Query:

- This query retrieves a list of exhibits, showing their name, total tickets sold, total profit from ticket sales, and the number of complaints received, grouped by each exhibit and ordered by profit in descending order, with zero used for any missing data.

```sql
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
```

<a name="reports"></a>

## Reports

We have 3 data reports: Health Analysis, Cost Analysis of Animal Food Data, and Exhibit Performance.

### Health Analysis Report:

In this report, it combines data about animals in a zoo, calculating the statistics akin to total food consumed, types of food eaten, weight and height changes of the animal, and health statuses based on veterinary reports. It joins data from multiple tables such as animalfoodeaten, animals, animalfood, veterinaryreports.This allows it to be grouped by animal identifiers, and organizes the results by the animal's name.

### Cost Analysis of Animal Food Data Report:

In this report, it calculates the statistics on food consumption and cost per animal, including the total food eaten, the food type, and the food cost relative to purchase price. It combines data by joining multiple tables (animals, animalfoodeaten, animalfood, animalfoodpurchases), filtering for valid food quantities, grouping by animal name and food details, and ordering the results by animal name and food name.

### Exhibit Performance Report:

This query generates a performance report for exhibits, detailing their ticket sales, revenue, and customer complaints. It uses LEFT JOIN to include all exhibits, even those without ticket purchases or complaints, ensuring no exhibit is left out. The results are grouped by exhibit and sorted by total profit in descending order, providing a clear ranking of exhibit performance. It uses tables like (exhibits, ticketpurchases, and complaints) to make the data that its produced.
