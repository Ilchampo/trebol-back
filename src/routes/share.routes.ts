import { Router } from 'express';

import * as controller from '../controllers/share.controller';

const router = Router();

// @route   POST share/create
// @query   none
// @params  none
// @body    companyId, investorId, sharePercentage, level
router.post('/create', controller.createShareController);

// @route   GET share/get?id=share-id
// @query   id
// @params  none
// @body    none
router.get('/get', controller.getShareByIdController);

// @route   GET share/all
// @query   none
// @params  none
// @body    none
router.get('/all', controller.getSharesController);

// @route   PUT share/update?id=share-id
// @query   id
// @params  none
// @body    companyId, investorId, sharePercentage, level (all optional)
router.put('/update', controller.updateShareController);

// @route   DELETE share/delete?id=share-id
// @query   id
// @params  none
// @body    none
router.delete('/delete', controller.deleteShareController);

export default router;
