import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserType } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  if (!username) {
    return next(errorHandler(500, "Username is required"));
  } else if (!email) {
    return next(errorHandler(500, "Email is required"));
  } else if (!password) {
    return next(errorHandler(500, "Password is required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(errorHandler(500, "User already exists"));
  }

  try {
    await newUser.save();
    const { password: pass, ...rest } = (newUser as any)._doc;
    res.status(201).json({ message: "User created successfully", user: rest });
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user: UserType | null = await User.findOne({ email });

    if (!email || !password) {
      return next(errorHandler(401, "All fields are required!"));
    }

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const isMatch = bcryptjs.compareSync(password, (user as any).password);
    if (!isMatch) {
      return next(errorHandler(401, "Wrong password!"));
    }

    const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET_KEY}`, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    const { password: pass, ...rest } = (user as any)._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
