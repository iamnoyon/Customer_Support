const commonRouter = require('express').Router();
const {AuthChecker} = require('../middlewares/authMiddleware');
const {getSectorList} = require('../controllers/common.controller');

// Define common routes here (if any)
commonRouter.get('/get-sectors', AuthChecker, getSectorList);

// export default commonRouter;
module.exports = commonRouter;