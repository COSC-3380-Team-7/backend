const { dbConnection } = require("../db.js");

/**
 * Vet Report Schema
 * vet_report_id: int
 * title: string
 * measured_weight: float
 * diagnosis: string
 * symptoms: string
 * animal_id: int
 * veterinarian_id: int
 * treatment: string
 * checkup_date: date
 * health_status: string = ["Healthy", "Sick", "Injured"]
 * created_at: date
 * updated_at: date
 **/

const getSingleVetReport = (req, res, vet_report_id) => {
  dbConnection.query(
    "SELECT * FROM veterinaryreports WHERE vet_report_id = ?",
    [vet_report_id],
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

      if (result.length === 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Vet report does not exist",
          })
        );
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: result[0],
        })
      );
    }
  );
};

const getAllVetReports = (req, res) => {
  dbConnection.query("SELECT * FROM veterinaryreports", (err, result) => {
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
  });
};

const updateVetReport = (req, res, vet_report_id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      title,
      measured_weight,
      diagnosis,
      symptoms,
      animal_id,
      veterinarian_id,
      treatment,
      checkup_date,
      health_status,
    } = JSON.parse(body);

    dbConnection.query(
      "UPDATE veterinaryreports SET title = ?, measured_weight = ?, diagnosis = ?, symptoms = ?, animal_id = ?, veterinarian_id = ?, treatment = ?, checkup_date = ?, health_status = ? WHERE vet_report_id = ?",
      [
        title,
        measured_weight,
        diagnosis,
        symptoms,
        animal_id,
        veterinarian_id,
        treatment,
        checkup_date,
        health_status,
        vet_report_id,
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
            message: "Vet report has been updated successfully",
          })
        );
      }
    );
  });
};

const createVetReport = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const {
      title,
      measured_weight,
      diagnosis,
      symptoms,
      animal_id,
      veterinarian_id,
      treatment,
      checkup_date,
      health_status,
    } = JSON.parse(body);

    dbConnection.query(
      "INSERT INTO veterinaryreports (title, measured_weight, diagnosis, symptoms, animal_id, veterinarian_id, treatment, checkup_date, health_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        measured_weight,
        diagnosis,
        symptoms,
        animal_id,
        veterinarian_id,
        treatment,
        checkup_date,
        health_status,
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

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Vet report has been created successfully",
            vet_report_id: result.insertId,
          })
        );
      }
    );
  });
};

module.exports = {
  getSingleVetReport,
  getAllVetReports,
  updateVetReport,
  createVetReport,
};
