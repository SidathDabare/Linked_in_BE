
import express from 'express'
import { 
    postImg, 
    postPost,
    cloudinaryUploader,
    getPosts,
    getPostById,
    updatePost,
    deletePost } from '../../lib/postUtilities.js'
const postsRouter = express.Router()

postsRouter.post("/", postPost)

postsRouter.post("/:postId", cloudinaryUploader, postImg)

postsRouter.get("/", getPosts)

postsRouter.get("/:postId", getPostById)

postsRouter.put("/:postId", updatePost)

postsRouter.delete("/:postId", deletePost)

export default postsRouter

