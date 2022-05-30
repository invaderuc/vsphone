const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Nombre requerido",
      minlength: [2, "Too short"],
      maxlength: [32, "Muy largo"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
