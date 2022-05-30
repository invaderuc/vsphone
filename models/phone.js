const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const phoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name requerid",
      minlength: [2, "Muy corto"],
      maxlength: [32, "Muy largo"],
    },
    description: {
      type: String,
      text: true,
      required: "Nombre requerido",
    },
    price: {
        type: Number,
        required: true,
    },
    battery: {
        type: Number,
        required: true,
    },
    storage: {
        type: Number,
        required: true,
    },
    ram: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    high: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
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
    images: {
      type: Array,
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
    processor: {
      type: ObjectId,
      ref: "Processor",
    },
    isps: [
      {
        type: ObjectId,
        ref: "Isp",
      },
    ],material: [
      {
        type: ObjectId,
        ref: "Material",
      },
    ],stores: [
      {
        type: ObjectId,
        ref: "Store",
      },
    ],features: [
      {
        type: ObjectId,
        ref: "Feature",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Phone", phoneSchema);
