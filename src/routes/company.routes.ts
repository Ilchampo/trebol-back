import { Router } from 'express';

import * as controller from '../controllers/company.controller';

const router = Router();

// @route   POST company/create
// @query   none
// @params  none
// @body    clientId, name, code
router.post('/create', controller.createCompanyController);

// @route   GET company/get?id=company-id
// @query   id
// @params  none
// @body    none
router.get('/get', controller.getCompanyByIdController);

// @route   GET company/all
// @query   none
// @params  none
// @body    none
router.get('/all', controller.getCompaniesController);

// @route   PUT company/update?id=company-id
// @query   id
// @params  none
// @body    clientId, name, code (all optional)
router.put('/update', controller.updateCompanyController);

// @route   DELETE company/delete?id=company-id
// @query   id
// @params  none
// @body    none
router.delete('/delete', controller.deleteCompanyController);

export default router;
