import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import * as bcrypt from "bcrypt";

interface User {
  id: number | string;
  email: string;
}

interface RequestWithUser extends Request {
  user: User;
}

interface JwtPayloadWithUser extends JwtPayload {
  id: number | string;
  email: string;
}

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, firstName: user.email },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  console.log("jaja");
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as JwtPayloadWithUser;
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not valid token");
    return;
  }
};

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};
