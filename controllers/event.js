// instruction: import the event model
const Event = require("../models/event");

const getEvents = async (category, title) => {
  // instruction: write the codes to retrieve all events (use `populate()` to get organizer details)
  let filters = {};
  if (category) {
    filters.category = category;
  }
  if (title) {
    filters.title = title;
  }
  try {
    const events = await Event.find(filters).populate("organizer");
    return events;
  } catch (e) {
    throw new Error(e);
  }
};

const getEvent = async (id) => {
  // instruction: write the codes to retrieve a specific event (use `populate()` to get organizer details)
  try {
    return await Event.findById(id).populate("organizer");
  } catch (e) {
    throw new Error(e);
  }
};

const AddNewEvent = async (
  title,
  organizer,
  date,
  location,
  category,
  description,
  attendeeCount
) => {
  // instruction: write the codes to add a new event
  const newEvent = new Event({
    title,
    organizer,
    date,
    location,
    category,
    description,
    attendeeCount,
  });
  await newEvent.save();
  return newEvent;
};

const updateEvent = async (
  id,
  title,
  organizer,
  date,
  location,
  category,
  description,
  attendeeCount
) => {
  // instruction: write the codes to update an event
  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    {
      title,
      organizer,
      date,
      location,
      category,
      description,
      attendeeCount,
    },
    { new: true }
  );
  return updatedEvent;
};

const deleteEvent = async (id) => {
  // instruction: Write the codes to delete an event
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    return deletedEvent;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getEvents,
  getEvent,
  AddNewEvent,
  updateEvent,
  deleteEvent,
};
