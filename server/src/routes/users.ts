import express from 'express';

import { getUsers, createUser, loginUser } from '../controllers/users';

const router: express.Router = express.Router();

// routes for /users/..
router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', loginUser);

export default router;