const { User, Thought } = require('../models');

async function getThoughtById(req, res) {
    try {
        const thought = await Thought.findById(req.params.thoughtId);

        if(!thought) {
            return res.status(404).json({message: 'Thought was not found'});
        }

        res.status(200).json(thought);

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }   
};

async function getThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }   
}

async function createThought(req, res) {
    try {
        const associatedUser = await User.findOne({ username: req.body.username });
        
        if(!associatedUser) {
            return res.status(404).json({message: 'User was not found'});
        }

        const newThought = await Thought.create(req.body);
        
        associatedUser.thoughts.push(newThought._id);

        await associatedUser.save();

        res.status(201).json(newThought);

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
};

async function updateThought(req, res) {
    try {
        const updateThought = await Thought.updateOne(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if(!updateThought) {
            return res.status(404).json({message: 'Thought was not found.'})
        };

        res.status(200).json(updateThought);

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }   
}

async function deleteThought(req, res) {
    try {
        const delThought = await Thought.deleteOne({_id: req.params.thoughtId});

        if(!delThought) {
            return res.status(404).json({message: 'Thought was not found.'});
        };

        res.status(200).json({message: 'Thought was successfully deleted.'});

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
}

async function createReaction(req, res) {
    const thoughtId = req.params.thoughtId;
    const { reactionBody, username } = req.body;

    try {
        const thought = await Thought.findById(thoughtId);

        if(!thought) {
            return res.status(404).json('No was thought found');
        };

        const found_username = await User.findOne({username: username});

        if(!found_username) {
            return res.status(404).json({message: 'User not found.'})
        }

        const newReaction = {
            reactionBody,
            username
        };
        
        thought.reactions.push(newReaction);
        const updatedThought = await thought.save(); 
        res.status(200).json(updatedThought);

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }   
};

async function deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;
    try {

        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: {reactions: {reactionId: reactionId}}},
            { new: true }
        );

        if(!thought) {
            return res.status(404).json({message: 'Thought was not found'});
        };

        if(!reactionId) {
            return res.status(404).json({message: 'Reaction was not found'});
        }

        res.status(200).json(thought);

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}
