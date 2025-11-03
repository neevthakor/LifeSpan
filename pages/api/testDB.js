import connectDB from "@/lib/mongodb";
import User from "@/lib/models/userModel";

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all users from the User collection
    const users = await User.find();

    res.status(200).json({
      connected: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      connected: false,
      error: error.message,
    });
  }
}
