import { Router } from 'express';

import * as controller from '../controllers/investor.controller';

const router = Router();

// @route   POST investor/create
// @query   none
// @params  none
// @body    name, type, code
router.post('/create', controller.createInvestorController);

// @route   GET investor/get?id=investor-id
// @query   id
// @params  none
// @body    none
router.get('/get', controller.getInvestorByIdController);

// @route   GET investor/all
// @query   none
// @params  none
// @body    none
router.get('/all', controller.getInvestorsController);

// @route   PUT investor/update?id=investor-id
// @query   id
// @params  none
// @body    name, type, code (all optional)
router.put('/update', controller.updateInvestorController);

// @route   DELETE investor/delete?id=investor-id
// @query   id
// @params  none
// @body    none
router.delete('/delete', controller.deleteInvestorController);

export default router;
