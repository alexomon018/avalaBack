import prisma from "../db";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";
import { Request, Response } from "express";

export const createNewUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      password: await hashPassword(req.body.password),
      email: req.body.email,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = createJWT(user);
  res.json({ token });
};
