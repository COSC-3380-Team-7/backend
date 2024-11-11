const URL = require("url");
const animalController = require("../controllers/animalController");
const exhibitController = require("../controllers/exhibitController");
const habitatController = require("../controllers/habitatController");
const eventController = require("../controllers/eventController");
const profileController = require("../controllers/profileController");
const visitorController = require("../controllers/visitorController");

function router(req, res) {
  const url = req.url;
  const parsedUrl = URL.parse(req.url, true);
  const method = req.method;

  // Handling /public/exhibit route
  if (url.startsWith("/public/exhibit") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");
    if (parts.length >= 4) {
      const exhibit_id = parts[3].slice(1);
      exhibitController.getSingleExhibit(req, res, exhibit_id.slice(1));
    } else {
      exhibitController.getAllExhibits(req, res);
    }
  }

  // Handling /public/habitat route
  else if (url.startsWith("/public/habitat") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");
    if (parts.length >= 4) {
      const habitat_id = parts[3].slice(1);
      habitatController.getSingleHabitat(req, res, habitat_id);
    } else {
      habitatController.getAllHabitats(req, res);
    }
  }

  // Handling /public/animal route
  else if (url.startsWith("/public/animal") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");
    if (parts.length >= 4) {
      const animal_id = parts[3].slice(1);
      animalController.getSingleAnimal(req, res, animal_id);
    } else {
      animalController.getAllAnimals(req, res);
    }
  }

  // Handling /public/event route
  else if (url.startsWith("/public/event") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");
    if (parts.length >= 4) {
      const event_id = parts[3].slice(1);
      eventController.getSingleEvent(req, res, event_id);
    } else {
      eventController.getTodaysEvents(req, res);
    }
  }

  // Handling /public/profile route (with visitorId)
  else if (url.startsWith("/public/profile") && method === "GET") {
    const parts = parsedUrl.pathname.split("/");

    if (parts.length >= 4) {
      const visitorId = parts[3].slice(1); // Extract visitorId from URL
      profileController.getProfileAndPurchases(req, res, visitorId);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid visitor ID" }));
    }
  }

  //Sign up Page
  else if (url.startsWith("/public/signup") && method === "POST") {
    visitorController.createVisitor(req, res);
  }
}

module.exports = router;
