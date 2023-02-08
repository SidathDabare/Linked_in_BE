/** @format */

import mongoose from "mongoose"

const { Schema, model } = mongoose

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, required: true },
    title: { type: String, required: true },
    area: { type: String, required: true },
    image: { type: String, required: true },
    username: { type: String, required: true },

    experiences: [
      {
        role: String,
        company: String,
        description: String,
        startDate: String,
        endDate: String,
        area: String,
        imageUrl: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default model("Users", usersSchema)
