const events = [
  {
    id: "ExINV001",
    name: "Field trip",
    startTime: "09:00",
    endTime: "10:00",
    eventDate: "2022-12-12",
    category: "School Event",
    description: "School field trip",
    memberExclusive: false,
  },
  // Add more events as needed
];

// GET all events
const getAllEvents = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(events));
};

// POST create a new event
const createEvent = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newEvent = JSON.parse(body);
    newEvent.id = `ExINV${events.length + 1}`; // Generate a new event ID
    events.push(newEvent);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newEvent));
  });
};

// PUT update an event by ID
const updateEvent = (req, res) => {
  const eventId = req.url.split("/")[3];
  const eventIndex = events.findIndex((event) => event.id === eventId);
  if (eventIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Event not found" }));
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const updatedEvent = JSON.parse(body);
    events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(events[eventIndex]));
  });
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
};
