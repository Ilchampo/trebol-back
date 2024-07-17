import express from 'express';

import {
    createFileController,
    updateFileController,
    getFileByIdController,
    getFilesController,
    deleteFileController,
} from '../controllers/file.controller';

const router = express.Router();

// @route   POST /files
// @desc    Create a new file
// @access  Public
router.post('/', createFileController);

// @route   PUT /files/:id
// @desc    Update a file
// @access  Public
router.put('/:id', updateFileController);

// @route   GET /files/:id
// @desc    Get a file by ID
// @access  Public
router.get('/:id', getFileByIdController);

// @route   GET /files
// @desc    Get all files
// @access  Public
router.get('/', getFilesController);

// @route   DELETE /files/:id
// @desc    Delete a file
// @access  Public
router.delete('/:id', deleteFileController);

export default router;
