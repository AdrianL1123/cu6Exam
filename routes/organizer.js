const express = require("express");
const router = express.Router();

// instruction: import all the necessary functions from controllers/organizer.js
const {
  getOrganizer,
  getOrganizers,
  AddNewOrganizer,
  updateOrganizer,
  deleteOrganizer,
} = require("../controllers/organizer");

// instruction: `GET /organizers`: List all organizers
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const organizers = await getOrganizers(name);
    res.status(200).send(organizers);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});
// instruction: `GET /organizers/:id`: Get a specific organizer by its id
router.get("/:id", async (req, res) => {
  try {
    const organizer = await getOrganizer(req.params.id);
    if (organizer) {
      res.status(200).send(organizer);
    } else {
      res.status(404).send({ message: "Organizer not found!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// instruction: `POST /organizers`: Add a new organizer
router.post("/", async (req, res) => {
  try {
    const { name, bio, contact, eventsOrganized } = req.body;
    const newOrganizer = await AddNewOrganizer(
      name,
      bio,
      contact,
      eventsOrganized
    );
    res.status(200).send(newOrganizer);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});
// instruction: `PUT /organizers/:id`: Update an organizer
router.put("/:id", async (req, res) => {
  try {
    const { name, bio, contact, eventsOrganized } = req.body;
    const id = req.params.id;
    const updatedOrganizer = await updateOrganizer(
      id,
      name,
      bio,
      contact,
      eventsOrganized
    );
    res.status(200).send(updatedOrganizer);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});
// instruction: `DELETE /organizers/:id`: Delete an organizer
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrganizer = await deleteOrganizer(req.params.id);
    res.status(200).send(deletedOrganizer);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});
module.exports = router;
