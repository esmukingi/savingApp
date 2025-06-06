import mongoose from "mongoose";

const categoryEnum = [
  "Class Service",
  "Driving Licence",
  "Land",
  "Business Entrepreneur",
];

const MonthSavingSchema = new mongoose.Schema({
  month: { type: String, required: true },
  saved: { type: Number, required: true, default: 0 },
});

const CategoryYearlySavingSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  months: [MonthSavingSchema],
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, enum: categoryEnum, required: true },
  amount: { type: Number, required: true, default: 1000 },
  yearlySavings: [CategoryYearlySavingSchema],
});

const UserSavingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categories: [CategorySchema],
  createdAt: { type: Date, default: Date.now },
});

const UserSaving = mongoose.model("UserSaving", UserSavingsSchema);

export default UserSaving;
