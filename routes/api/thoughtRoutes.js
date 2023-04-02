const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// Route to get all thoughts and create a new thought
router.route('/')
    .get(getThoughts)
    .post(createThought);

// Route to get, update, or delete a single thought by its ID
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// Route to create a new reaction for a single thought by its ID
router.route('/:thoughtId/reactions')
    .post(createReaction);

// Route to delete a single reaction for a single thought by its ID and reaction ID
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
