// instruction: import the feedback model
const Feedback = require("../models/feedback");

const getFeedbacksByEvent = async (eventId) => {
  // instruction: write the codes to retrieve all feedbacks by eventId
  try {
    let filters = {};
    if (eventId) {
      filters.eventId = eventId;
    }
    const feedbacks = await Feedback.find(filters);
    return feedbacks;
  } catch (e) {
    throw new Error(e);
  }
};

const AddNewFeedback = async (event, attendeeName, comment) => {
  // instruction: write the codes to add new feedback for an event
  const newFeedback = new Feedback({
    event,
    attendeeName,
    comment,
  });
  await newFeedback.save();
  return newFeedback;
};

module.exports = {
  getFeedbacksByEvent,
  AddNewFeedback,
};
