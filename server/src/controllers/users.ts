import { Request, Response } from "express";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import validator from 'validator';
import User from '../models/user';

const generateAccessToken = (username: string) => {
    return jwt.sign({ username }, process.env.TOKEN_SECRET as string, { expiresIn: 1800 });
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const body = req.body;
    const { displayName, email, password } = body;
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }
    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const username = displayName.toLowerCase();
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username is already taken" });
        }
        const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
        const newUser = new User({ ...body, username: username, password: passwordHash });
        await newUser.save();
        const token = generateAccessToken(username);
        res.status(201).json({ newUser, token });
    } catch (error: any) {
        res.status(409).json({ message: error.name });
        console.log(error.message);

    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
        if (!user) {
            return res.status(200).json({ "message": "Login details incorrect" });
        }
        const isPasswordValid = await argon2.verify(password, user.password);
        if (!isPasswordValid) {
            return res.status(200).json({ "message": "Login details incorrect" });
        }
        const token = generateAccessToken(user.username);
        res.status(200).json({ user: user, token });

    } catch (error: any) {
        res.status(500).json({ message: error.name });
    }
};