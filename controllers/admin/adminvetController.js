const testReports = [
  {
    vet_report_id: 1,
    pet_name: "Max",
    species: "Canine",
    breed: "German Shepherd",
    age: 6,
    owner_name: "Sarah Johnson",
    visit_date: "2024-03-15",
    chief_complaint: "Acute lameness in right hind leg",
    temperature: 102.1,
    weight: 75.5,
    heart_rate: 95,
    respiratory_rate: 24,
    diagnosis: "Cranial cruciate ligament rupture",
    treatment_plan: "1. Surgical intervention recommended - TPLO procedure\n2. Carprofen 75mg BID for pain/inflammation\n3. Strict rest for 2 weeks\n4. Post-op rehabilitation plan",
    medications_prescribed: [
      {
        name: "Carprofen",
        dosage: "75mg",
        frequency: "Twice daily",
        duration: "14 days"
      }
    ],
    follow_up_date: "2024-03-29",
    lab_results: {
      complete_blood_count: {
        wbc: 10.5,
        rbc: 6.8,
        platelets: 300,
        hematocrit: 45
      },
      chemistry_panel: {
        alt: 45,
        bun: 18,
        creatinine: 1.1
      }
    },
    notes: "Patient is otherwise healthy. Owner agreed to surgery scheduled for next week."
  },
  {
    vet_report_id: 2,
    pet_name: "Luna",
    species: "Feline",
    breed: "Maine Coon",
    age: 12,
    owner_name: "Michael Chang",
    visit_date: "2024-03-16",
    chief_complaint: "Decreased appetite, lethargy, increased thirst",
    temperature: 101.8,
    weight: 12.3,
    heart_rate: 160,
    respiratory_rate: 32,
    diagnosis: "Chronic Kidney Disease Stage 2, Hyperthyroidism",
    treatment_plan: "1. Subcutaneous fluids 100ml daily\n2. Transition to renal diet\n3. Methimazole 2.5mg BID\n4. Monthly blood work monitoring",
    medications_prescribed: [
      {
        name: "Methimazole",
        dosage: "2.5mg",
        frequency: "Twice daily",
        duration: "30 days"
      }
    ],
    follow_up_date: "2024-04-16",
    lab_results: {
      complete_blood_count: {
        wbc: 8.2,
        rbc: 5.9,
        platelets: 250,
        hematocrit: 32
      },
      chemistry_panel: {
        alt: 62,
        bun: 45,
        creatinine: 2.8,
        t4: 4.8
      },
      urinalysis: {
        specific_gravity: 1.035,
        protein: "2+",
        ph: 6.5
      }
    },
    notes: "Previously diagnosed with CKD, now showing signs of hyperthyroidism. Discussed treatment options and prognosis with owner."
  }
];

// Helper function to read request body as JSON
const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', (error) => reject(error));
  });
};

// Get all reports
const getAllReports = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(testReports));
};

// Get a report by ID
const getReportById = (req, res) => {
  const reportId = parseInt(req.url.split("/").pop());
  const report = testReports.find((r) => r.vet_report_id === reportId);
  if (report) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(report));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Report not found" }));
  }
};

// Create a new report
const createReport = (req, res) => {
  getRequestBody(req)
    .then((data) => {
      const newReport = { ...data, vet_report_id: testReports.length + 1 };
      testReports.push(newReport);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newReport));
    })
    .catch((error) => {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    });
};

// Update an existing report
const updateReport = (req, res) => {
  const reportId = parseInt(req.url.split("/").pop());
  const reportIndex = testReports.findIndex((r) => r.vet_report_id === reportId);
  if (reportIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Report not found" }));
    return;
  }

  getRequestBody(req)
    .then((data) => {
      testReports[reportIndex] = { ...testReports[reportIndex], ...data };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(testReports[reportIndex]));
    })
    .catch((error) => {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    });
};

// Delete a report
const deleteReport = (req, res) => {
  const reportId = parseInt(req.url.split("/").pop());
  const reportIndex = testReports.findIndex((r) => r.vet_report_id === reportId);
  if (reportIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Report not found" }));
  } else {
    testReports.splice(reportIndex, 1);
    res.writeHead(204);
    res.end();
  }
};

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
