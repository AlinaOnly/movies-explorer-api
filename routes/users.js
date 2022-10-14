const router = require('express').Router();
const { userValidation } = require('../middlewares/validation');

const { getUserId, changeUserInformation } = require('../controllers/users');

router.get('/me', getUserId);
router.patch('/me', userValidation, changeUserInformation);

module.exports = router;
