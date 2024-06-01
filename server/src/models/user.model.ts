import bcrypt from "bcrypt";
import mongoose from "mongoose";
import pkg from "validator";
const { isEmail } = pkg;

export type UserType = {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
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
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
