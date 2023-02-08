
import PostModel from "../apis/posts/model.js"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import createHttpError from "http-errors"

export const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "linkedInBE22",
    },
  }),
  limits: { fileSize: 1024 * 1024 },
}).single("post")


export const postPost = async (req, res, next) => {
  try {
    const newPost = new PostModel(req.body)

    const { _id } = await newPost.save()

    res.status(201).send({ id: _id })
  } catch (error) {
    next(error)
  }
}


export const postImg = async (req, res, next) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.postId,
      { image: req.file.path },
      { new: true, runValidators: true }
    )

    if (!post) {
      return next(
        createHttpError(404, `Post with id: ${req.params.postId} not found`)
      )  
    }

    res.send(post)

  } catch (error) {
    next(error)
  }
}

export const getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find().populate("user")

    res.send(posts.reverse())
  } catch (error) {

    next(error)
  }
}

export const getPostById = async (req, res, next) => {
  try {

    const post = await PostModel.findById(req.params.postId).populate("user")


    if (!post) {
      return next(
        createHttpError(404, `Post with id: ${req.params.postId} not found`)
      )
    }

    res.send(post)
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req, res, next) => {
  try {
    const newPost = await PostModel.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true, runValidators: true }
    )

    if (!newPost) {
      next(
        createHttpError(404, `Post with id ${req.params.postId} was not found!`)
      )
    }

    res.send(newPost)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const postToDelete = await PostModel.findByIdAndDelete(
      req.params.postId
    )

    if (!postToDelete) {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      )
    }

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

