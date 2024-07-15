import { Router } from 'express';

import * as controller from '../controllers/client.controller';

const router = Router();

// @route   POST client/create
// @query   none
// @params  none
// @body    name, logoUrl, minSearchPercentage, maxInvestorLevels
router.post('/create', controller.createClientController);

// @route   GET client/get?id=client-id
// @query   id
// @params  none
// @body    none
router.get('/get', controller.getClientByIdController);

// @route   GET client/all
// @query   none
// @params  none
// @body    none
router.get('/all', controller.getClientsController);

// @route   PUT client/update?id=client-id
// @query   id
// @params  none
// @body    name, logoUrl, minSearchPercentage, maxInvestorLevels (all optional)
router.put('/update', controller.updateClientController);

// @route   DELETE client/delete?id=client-id
// @query   id
// @params  none
// @body    none
router.delete('/delete', controller.deleteClientController);

export default router;
