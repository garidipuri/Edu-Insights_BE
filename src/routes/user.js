const express = require('express');
// assign routing
const userRouter = express.Router();

// user Controller
const userController =  require('../controllers/user.controller');

userRouter.route('/api/start_test').post(userController.start_test);
userRouter.route('/api/end_test').post(userController.end_test);
userRouter.route('/api/add_answers').post(userController.save_answers);

module.exports =  userRouter;