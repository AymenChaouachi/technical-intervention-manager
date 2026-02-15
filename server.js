const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let interventions = [];
let idCounter = 1;

// Admin: Create intervention
app.post("/interventions", (req, res) => {
    const { title, technician } = req.body;

    const intervention = {
        id: idCounter++,
        title,
        technician,
        status: "To Do"
    };

    interventions.push(intervention);
    res.json(intervention);
});

// Technician: View assigned interventions
app.get("/interventions/:technician", (req, res) => {
    const tech = req.params.technician;
    const assigned = interventions.filter(i => i.technician === tech);
    res.json(assigned);
});

// Technician: Update status
app.put("/interventions/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const intervention = interventions.find(i => i.id === id);
    if (!intervention) return res.status(404).json({ error: "Not found" });

    intervention.status = status;
    res.json(intervention);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
