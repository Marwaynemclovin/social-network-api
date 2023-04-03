// Require the models for Thought and User
const { User, Thought } = require("../models");

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a Thought from an ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No Thought found with this ID" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new Thought
  createThought(req, res) {
    // Use object destructuring to extract the userId and thoughtText from the request body
    const { userId, thoughtText } = req.body;

    Thought.create({ thoughtText })
      .then((dbThoughtData) => {
        // Use the User model to push the new thought's _id to the associated user's thoughts array
        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No Thought with this ID" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No Thought with this ID" });
          return;
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No User found with this thought" });
          return;
        }
        res.json({
          message: `Successfully deleted the thought from user id ${user._id}`,
        });
      })
      .catch((err) => res.status(500).json(err));
  },
   //create reaction
   createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought frind with ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
    //delete reaction
    deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
        )
        .then((thought) => {
            if (!thought) {
            return res.status(404).json({ message: "No thought find with this ID!" });
            }
            const reaction = thought.reactions.find(
            (reaction) => reaction.reactionId === req.params.reactionId
            );
            if (!reaction) {
            return res.status(404).json({ message: "No reaction find with this ID!" });
            }
            res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },
    
};