/** @format */

import mongoose from "mongoose"

const { Schema, model } = mongoose

const experienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true, min: 10 },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    area: { type: String, required: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
)

export default model("Experience", experienceSchema)
