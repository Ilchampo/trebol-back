import { Router } from 'express';

import * as controller from '../controllers/document.controller';

const router = Router();

// @route   POST document/create
// @query   none
// @params  none
// @body    shareId, fileName, fileType, fileData
router.post('/create', controller.createDocumentController);

// @route   GET document/get?id=document-id
// @query   id
// @params  none
// @body    none
router.get('/get', controller.getDocumentByIdController);

// @route   GET document/all
// @query   none
// @params  none
// @body    none
router.get('/all', controller.getDocumentsController);

// @route   PUT document/update?id=document-id
// @query   id
// @params  none
// @body    shareId, fileName, fileType, fileData (all optional)
router.put('/update', controller.updateDocumentController);

// @route   DELETE document/delete?id=document-id
// @query   id
// @params  none
// @body    none
router.delete('/delete', controller.deleteDocumentController);

export default router;
