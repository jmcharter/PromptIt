import { Request, Response } from "express";
import Prompt from "../models/prompt";
import User from "../models/user";


export const getPrompts = async (req: Request, res: Response) => {
    try {
        const prompts = await Prompt.find().populate('createdBy', 'username displayName');
        res.status(200).json(prompts);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const createPrompt = async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const { title, text, id } = body;
        const existingTitle = await Prompt.findOne({ title });
        if (existingTitle) {
            return res.status(400).json({ message: "This title has already been used. Please choose another one." });
        }
        const user: any = await User.findById(id);
        console.log(user);
        const newPrompt = new Prompt({
            title: title,
            text: text,
            createdBy: user,
        });
        newPrompt.save();
        user.prompts.push(newPrompt._id);
        user.save();
        console.log(user);
        res.status(201).json({ message: "Prompt posted successfully", prompt: { title, text, id } });

    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getNonRemovedPrompts = async () => {

};