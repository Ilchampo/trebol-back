import express from 'express';

import {
    createClientController,
    updateClientController,
    getClientByIdController,
    getClientsController,
    deleteClientController,
} from '../controllers/client.controller';

const router = express.Router();

// @route   POST /clients
// @desc    Create a new client
// @access  Public
router.post('/', createClientController);

// @route   PUT /clients/:id
// @desc    Update a client
// @access  Public
router.put('/:id', updateClientController);

// @route   GET /clients/:id
// @desc    Get a client by ID
// @access  Public
router.get('/:id', getClientByIdController);

// @route   GET /clients
// @desc    Get all clients
// @access  Public
router.get('/', getClientsController);

// @route   DELETE /clients/:id
// @desc    Delete a client
// @access  Public
router.delete('/:id', deleteClientController);

export default router;
