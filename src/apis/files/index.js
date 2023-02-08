/** @format */

import express from "express"
import multer from "multer"

import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

import { pipeline } from "stream"
import { getPDFReadableStream } from "../../lib/pdf-tools.js"
import UserModel from "../users/models.js"

import json2csv from "json2csv"
import fs from "fs-extra"
import { createReadStream } from "fs"
import path from "path"

export const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary, // this searches in your process.env for something called CLOUDINARY_URL which contains your cloudinary api key and secret
    params: {
      folder: "linkedIn-images",
    },
  }),
  limits: { fileSize: 1024 * 1024 },
}).single("image")

const filesRouter = express.Router()

//http://localhost:3001/files/cloudinary
filesRouter.post("/cloudinary", cloudinaryUploader, async (req, res, next) => {
  try {
    console.log("REQ FILE: ", req.file)

    // 1. upload on Cloudinary happens automatically
    // 2. req.file contains the path which is the url where to find that picture
    // 3. update the resource by adding the path to it
    //res.send("UPLOADED")
    res.status(201).send({ url: req.file.path })
  } catch (error) {
    next(error)
  }
})

// http://localhost:3003/api/files/PDF/:userId
filesRouter.get("/PDF/:userId", async (req, res, next) => {
  try {
    const users = await UserModel.findById(req.params.userId)
    res.setHeader("Content-Disposition", "attachment; filename=users.pdf")

    const source = getPDFReadableStream(users)
    const destination = res
    pipeline(source, destination, (err) => {
      if (err) console.log(err)
    })
    //res.send(users)
  } catch (error) {
    next(error)
  }
})

filesRouter.get("/CSV/:userId", async (req, res, next) => {
  try {
    res.setHeader(
      "Content-Disposition",
      "attachments; filename=experiences.csv"
    )
    const user = await UserModel.findById(req.params.userId).lean()
    console.log(user)
    const exp = user.experiences
    exp.createdAt = user.createdAt
    const sourse = exp
    const destination = res
    const data = await json2csv.parseAsync(exp, {
      fields: [
        "_id",
        "role",
        "company",
        "description",
        "startDate",
        "endDate",
        "area",
        " imageUrl",
      ],
    })
    fs.writeFileSync("Experiences.csv", data)
    res.sendFile(path.join(process.cwd(), "test.csv"))
    // const transform = new json2csv.Transform({fields: ["_id","createdAt"]})
    // pipeline(sourse,transform,destination,err => {
    //     if(err) console.log(err);
    // })
  } catch (error) {
    next(error)
  }
})

export default filesRouter
