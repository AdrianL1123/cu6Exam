const express = require("express");
const router = express.Router();

// instruction: import all the necessary functions from controllers/event.js
const {
  getEvent,
  getEvents,
  AddNewEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");

const Event = require("../models/event");

// instruction: import all the necessary functions from controllers/feedback.js
const {
  getFeedbacksByEvent,
  AddNewFeedback,
} = require("../controllers/feedback");

// instruction: `GET /events`: List all events
router.get("/", async (req, res) => {
  try {
    const { category, title } = req.query;
    const events = await getEvents(category, title);
    res.status(200).send(events);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

// instruction: `GET /events/:id`: Get a specific event by its id
router.get("/:id", async (req, res) => {
  try {
    const event = await getEvent(req.params.id);
    if (event) {
      res.status(200).send(event);
    } else {
      res.status(404).send({ message: "Event not found!" });
    }
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

// instruction: `POST /events`: Add a new event
router.post("/", async (req, res) => {
  try {
    const {
      title,
      organizer,
      date,
      location,
      category,
      description,
      attendeeCount,
    } = req.body;
    const newEvent = await AddNewEvent(
      title,
      organizer,
      date,
      location,
      category,
      description,
      attendeeCount
    );
    res.status(200).send(newEvent);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});
// instruction: `PUT /events/:id`: Update an event
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      organizer,
      date,
      location,
      category,
      description,
      attendeeCount,
    } = req.body;
    const id = req.params.id;
    const updatedEvent = await updateEvent(
      id,
      title,
      organizer,
      date,
      location,
      category,
      description,
      attendeeCount
    );
    res.status(200).send(updatedEvent);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});
// instruction: `DELETE /events/:id`: Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await deleteEvent(req.params.id);
    res.status(200).send(deletedEvent);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});
// instruction: `GET /events/:id/feedback`: Get all feedback for a specific event by its id
router.get("/:id/feedback", async (req, res) => {
  try {
    const { eventId } = req.params.id;
    const feedback = await getFeedbacksByEvent(eventId);
    if (feedback) {
      res.status(200).send(feedback);
    } else {
      res.status(404).send({ message: "No Feedbacks yet" });
    }
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

// instruction: `POST /events/:id/feedback`: Add feedback for a specific event by its id
router.post("/:id/feedback", async (req, res) => {
  try {
    const { event, attendeeName, comment } = req.body;
    const newFeedback = await AddNewFeedback(event, attendeeName, comment);
    res.status(200).send(newFeedback);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

module.exports = router;
