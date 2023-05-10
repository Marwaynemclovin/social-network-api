const { User, Thought } = require('../models');

async function getUsers(req, res) {
    try {
        const users = await User.find();
        
        res.status(200).json(users);

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
};

async function getUserById(req, res) {
    try {
        const user = await User.findOne({_id: req.params.userId});

        if(!user) {
            return res.status(404).json({message: 'User was not found'});
        };

        res.status(200).json(user);

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
};

async function createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: err.message});
    }
};


async function updateUser(req, res) {
    try {
        const updateUser = await User.updateOne(
            { _id: req.params.userId }, 
            { $set: req.body },
            { runValidators: true, new: true }
        )
        res.status(200).json(updateUser)
    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findById(req.params.userId);
        const username = user.username;
        console.log('username -> ', username);
        const delThought = await Thought.deleteMany({username: username})
        console.log('delThought -> ', delThought)
        const delUser = await User.deleteOne({ _id: req.params.userId });

        if(!delUser) {
            return res.status(404).json({ message: 'No user was found'})
        }

        res.status(200).json({ message: "The user has been deleted."})

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
};


async function addFriend(req, res) { 
    const { userId, friendId } = req.params;
    try {
        const user = await User.findById(userId);

        if(!user) {
            res.status(404).json('User was not found');
        };

        user.friends.push(friendId);

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }   
}

async function deleteFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: {friends: friendId} },
            { new: true } 
        );

        if(!user) {
            return res.status(404).json({message: 'User not found'});
        };

        res.status(200).json(user);

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
}