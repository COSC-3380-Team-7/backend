let tickets = [
  { id: 0, category: "Veteran", price: 5.0 },
  { id: 1, category: "Senior", price: 5.0 },
  { id: 2, category: "Adult", price: 7.5 },
  { id: 3, category: "Child", price: 3.5 },
];

// GET /admin/ticket - Retrieve all tickets
const getAllTickets = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tickets));
};

// POST /admin/ticket/create - Create a new ticket
const createTicket = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const { category, price } = JSON.parse(body);
    const newTicket = {
      id: tickets.length,
      category,
      price: parseFloat(price),
    };
    tickets.push(newTicket);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newTicket));
  });
};

// PUT /admin/ticket/:id/edit - Update a specific ticket by ID
const updateTicket = (req, res) => {
  const id = parseInt(req.url.split("/")[3]);
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Ticket not found");
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const { category, price } = JSON.parse(body);
    ticket.category = category || ticket.category;
    ticket.price = price !== undefined ? parseFloat(price) : ticket.price;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(ticket));
  });
};

module.exports = {
  getAllTickets,
  createTicket,
  updateTicket,
};
