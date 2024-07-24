import express from 'express';

import {
    createCompanyController,
    updateCompanyController,
    getCompanyByIdController,
    getCompaniesController,
    getCompaniesByClientIdController,
    deleteCompanyController,
} from '../controllers/company.controller';

const router = express.Router();

// @route   POST /companies
// @desc    Create a new company
// @access  Public
router.post('/', createCompanyController);

// @route   PUT /companies/:id
// @desc    Update a company
// @access  Public
router.put('/:id', updateCompanyController);

// @route   GET /companies/:id
// @desc    Get a company by ID
// @access  Public
router.get('/:id', getCompanyByIdController);

// @route   GET /companies
// @desc    Get all companies
// @access  Public
router.get('/', getCompaniesController);

// @route   GET /companies/client
// @desc    Get all companies by client id
// @access  Public
router.get('/client/:id', getCompaniesByClientIdController);

// @route   DELETE /companies/:id
// @desc    Delete a company
// @access  Public
router.delete('/:id', deleteCompanyController);

export default router;
