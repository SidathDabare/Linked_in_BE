/** @format */

import express from "express"

import { deleteExp, editExp, getAllExps, getExp, postExp, uploadExpPic } from "../../lib/expUtilities.js"


import {
  deleteUser,
  getAllUsers,
  getSingleUsers,
  postUser,
  updateUser,
} from "../../lib/userUtilities.js"
import { cloudinaryUploader } from "../files/index.js"

const usersRouter = express.Router()

usersRouter.post("/", postUser)

usersRouter.get("/", getAllUsers)

usersRouter.get("/:userId", getSingleUsers)

usersRouter.put("/:userId", updateUser)

usersRouter.delete("/:userId", deleteUser)


/* Experiences */

usersRouter.post('/:userId/experiences' , postExp)

usersRouter.post('/:userId/experiences/:expId', cloudinaryUploader , uploadExpPic)

usersRouter.get("/:userId/experiences" , getAllExps)

usersRouter.get("/:userId/experiences/:expId" , getExp)

usersRouter.put("/:userId/experiences/:expId" , editExp)

usersRouter.delete("/:userId/experiences/:expId" , deleteExp)

export default usersRouter
