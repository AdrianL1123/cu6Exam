// instruction: import the organizer model
const Organizer = require("../models/organizer");

const getOrganizers = async (name) => {
  // instruction: Write the codes to retrieve all organizers
  let filters = {};
  if (name) {
    filters.name = name;
  }
  try {
    const organizers = await Organizer.find(filters);
    return organizers;
  } catch (e) {
    throw new Error(e);
  }
};

const getOrganizer = async (id) => {
  // instruction: write the codes to retrieve a specific organizer
  try {
    return await Organizer.findById(id);
  } catch (e) {
    throw new Error(e);
  }
};

const AddNewOrganizer = async (name, bio, contact, eventsOrganized) => {
  // instruction: write the codes to add an organizer
  const newOrganizer = new Organizer({
    name,
    bio,
    contact,
    eventsOrganized,
  });
  await newOrganizer.save();
  return newOrganizer;
};

const updateOrganizer = async (id, name, bio, contact, eventsOrganized) => {
  // instruction: write the codes to update an organizer
  const updatedOrganizer = await Organizer.findByIdAndUpdate(
    id,
    {
      name,
      bio,
      contact,
      eventsOrganized,
    },
    { new: true }
  );
  return updatedOrganizer;
};

const deleteOrganizer = async (id) => {
  // instruction: write the codes to delete an organizer
  try {
    const deletedOrganizer = await Organizer.findByIdAndDelete(id);
    return deletedOrganizer;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getOrganizers,
  getOrganizer,
  AddNewOrganizer,
  updateOrganizer,
  deleteOrganizer,
};
