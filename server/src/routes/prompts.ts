import express from 'express';

import { getPrompts, createPrompt } from '../controllers/prompts';
import authorize from '../middleware/authorization';

const router: express.Router = express.Router();

// routes for /prompts/..
router.get('/', getPrompts);
router.post('/create', createPrompt);

export default router;