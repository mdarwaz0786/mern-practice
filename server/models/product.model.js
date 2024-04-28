import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);  