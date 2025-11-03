import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectDB();
  if (req.method === "POST") {
    try {
      const { name, email } = req.body;
      const newUser = new User({ name, email });
      await newUser.save();
      return res.status(201).json({ message: "User saved", user: newUser });
    } catch (error) {
      return res.status(500).json({ message: "Error saving user", error });
    }
  } else if (req.method === "GET") {
    const users = await User.find();
    return res.status(200).json(users);
  }
}
