import { Response } from 'express';
import jwt from 'jsonwebtoken';

const authorize = (req: any, res: Response, next: Function) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    console.log(token);

    if (token == null) return res.status(401);

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

export default authorize;