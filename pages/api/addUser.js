import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { name, email } = req.body;
    if (!name || !email)
      return res.status(400).json({ error: "Missing name or email" });

    const user = await User.create({ name, email });
    return res.status(200).json({ message: "User added", user });
  }

  res.status(405).json({ error: "Method not allowed" });
}
