import express from 'express';

import {
    createInvestorController,
    updateInvestorController,
    getInvestorByIdController,
    getInvestorsController,
    deleteInvestorController,
    saveCompanyInvestorsController,
    getCompanyRealOwnersController,
} from '../controllers/investor.controller';

const router = express.Router();

// @route   POST /investors
// @desc    Create a new investor
// @access  Public
router.post('/', createInvestorController);

// @route   PUT /investors/:id
// @desc    Update an investor
// @access  Public
router.put('/:id', updateInvestorController);

// @route   GET /investors/:id
// @desc    Get an investor by ID
// @access  Public
router.get('/:id', getInvestorByIdController);

// @route   GET /investors
// @desc    Get all investors
// @access  Public
router.get('/', getInvestorsController);

// @route   DELETE /investors/:id
// @desc    Delete an investor
// @access  Public
router.delete('/:id', deleteInvestorController);

// @route   POST /investors/company/:companyId
// @desc    Save investors for a company
// @access  Public
router.post('/company/:clientId', saveCompanyInvestorsController);

// @route   GET /investors/company/:companyId/real-owners
// @desc    Get real owners of a company
// @access  Public
router.get('/company/:companyId/real-owners', getCompanyRealOwnersController);

export default router;
