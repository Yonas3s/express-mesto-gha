const router = require('express').Router();
const {
  getUsers, getUserById, addUser, editUserInfo, editUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', addUser);
router.patch('/me', editUserInfo);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
