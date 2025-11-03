import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    age: {
      type: Number,
      min: 0,
      max: 120,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },

    medicalHistory: [
      {
        condition: String,
        diagnosisDate: Date,
        medication: String,
        doctor: String,
      },
    ],

    appointments: [
      {
        doctorName: String,
        date: Date,
        reason: String,
        status: {
          type: String,
          enum: ["pending", "confirmed", "cancelled"],
          default: "pending",
        },
      },
    ],

    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },

    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
