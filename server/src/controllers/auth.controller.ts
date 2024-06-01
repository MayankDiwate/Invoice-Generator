import bcrypt from "bcrypt";
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
config();

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(500).json({ message: "Username is required" });
  } else if (!email) {
    return res.status(500).json({ message: "Email is required" });
  } else if (!password) {
    return res.status(500).json({ message: "Password is required" });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const newUser = new User({
      username,
      email,
      password,
    });

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

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
    const user = await User.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    const token = jwt.sign(
      { id: user._id },
      "NkCHChjrYthCqco4OWBtIgD0YhKP9Okr",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password: pass, ...rest } = (user as any)._doc;
    res
      .status(200)
      .json({ message: "User signed in successfully", user: rest });
  } catch (error: any) {
    console.log(error.message);
    next(new Error(error.message));
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
