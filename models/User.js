import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // Add roles: 'user', 'admin'
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
