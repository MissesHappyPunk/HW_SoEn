import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"
import openDb from '../db/db';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const newUser: PlatformUser = {
      id: null,
      email,
      password
    };
    const createdUser = await createUser(newUser);
    res.status(201).json({id: createdUser.id, email: createdUser.email});
  } catch (err){
    console.error(err);
    res.status(400).send(err.message);
  }
};