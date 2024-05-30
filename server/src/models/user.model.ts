import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from "validator";
const { isEmail } = pkg;

export type UserType = {
  _id: String,
  username: String,
  email: String,
  password: String,
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
