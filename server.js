const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Contact = require("./models/Contact");
const Registration = require("./models/Registration");
const Event = require("./models/Event");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Direct MongoDB Atlas connection (for submission)
mongoose.connect("mongodb+srv://harshinivemula164:Harshinii@cluster0.pzflbtt.mongodb.net/msd_project?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ===================== CONTACT ROUTES =====================
app.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save contact" });
  }
});

app.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// ===================== REGISTRATION ROUTES =====================
app.post("/register", async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ message: "Registration saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save registration" });
  }
});

app.get("/register", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

// ===================== EVENT ROUTES =====================
app.post("/event", async (req, res) => {
  try {
    console.log("Event received:", req.body);
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save event" });
  }
});

app.get("/event", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// ===================== START SERVER =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
