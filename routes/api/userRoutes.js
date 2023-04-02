const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// Route to get all users and create a new user
router.route('/users')
    .get(getUsers)
    .post(createUser);

// Route to get, update, or delete a single user by ID
router.route('/users/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// Route to add or remove a friend to a user by ID
router.route('/users/:userId/friends/:friendId')
    .put(addFriend)
    .delete(removeFriend);

module.exports = router;
