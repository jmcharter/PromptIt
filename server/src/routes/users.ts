import express from 'express';

import { getUsers, createUser, loginUser, getUser, validateUserToken, getUserPrompts } from '../controllers/users';
import authorize from '../middleware/authorization';

const router: express.Router = express.Router();

// routes for /users/..
router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/profile', authorize, getUser);
router.post('/validateusertoken', validateUserToken);
router.get('/:id/prompts', getUserPrompts);

export default router;