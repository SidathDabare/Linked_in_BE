/** @format */
import * as dotenv from "dotenv"
import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import cors from "cors"
import postsRouter from "./src/apis/posts/index.js"
import usersRouter from "./src/apis/users/index.js"
import filesRouter from "./src/apis/files/index.js"
import {
  badRequestHandler,
  genericErrorHandler,
  notFoundHandler,
} from "./src/errorHandlers.js"

dotenv.config()
const port = process.env.PORT
const server = express()

// const whitelist = ["http://localhost:3000"]

// server.use(
//   cors({
//     origin: (origin, corsNext) => {
//       console.log("ORIGIN:", origin)

//       if (!origin || whitelist.indexOf(origin) !== -1) {
//         corsNext(null, true)
//       } else {
//         corsNext(
//           createHttpError(
//             400,
//             "Cors Error! Your origin " + origin + "is not in the list"
//           )
//         )
//       }
//     },
//   })
// )
server.use(cors())
server.use(express.json())

mongoose.connect(process.env.MONGO_CON_URL)
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB!")

  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log("Server is running on port:", port)
  })
})

server.use("/api/posts", postsRouter)
server.use("/api/users", usersRouter)
server.use("/api/files", filesRouter)

// ********************************* ERROR HANDLERS **************************************
server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)
