import expModel from "../apis/experiences/model.js"
import UserModel from "../apis/users/models.js"
import createHttpError from "http-errors"

export const postExp = async(req,res,next) => {
    try {
        const newExp = new expModel(req.body)
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.userId , {$push : {experiences : newExp}} , 
            {new:true , runValidators:true } )
            if(updatedUser) {
                res.send(updatedUser)
            } else{
                next(createHttpError(404,`user with this id ${req.params.userId} didn't found`))
            }
    } catch (error) {
        next(error)
    }
}

export const getAllExps = async(req,res,next) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        if(user){
            res.send(user.experiences)
        }else{
            next(createHttpError(404,`User with this id ${req.params.userId} didn't found`))
        }
    } catch (error) {
        next(error)
    }
}

export const getExp = async(req,res,next) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        if(user){
            const writtenExp = user.experiences.find(aExp => req.params.expId === aExp._id.toString())
            if(writtenExp){
                res.send(writtenExp)
            } else{
                next(createHttpError(404,`Experience with this id ${req.params.expId} didn't found`))
            }
        }else{
            next(createHttpError(404,`User with this id ${req.params.userId} didn't found`))
        }
        
    } catch (error) {
        next(error)
    }
}

export const editExp = async(req,res,next) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        if(user){
            const index = user.experiences.findIndex(aExp => aExp._id.toString() === req.params.expId)
            if(index !== -1){
                user.experiences[index] = {...user.experiences[index].toObject(),...req.body}
                await user.save()
                res.send(user)
            }else{
                next(createHttpError(404,`Experience with this id ${req.params.expId} didn't found`))
            }
        } else{
            next(createHttpError(404,`User with this id ${req.params.userId} didn't found`))
        }
        
    } catch (error) {
        next(error)
    }
}

export const deleteExp = async(req,res,next) => {
    try {
        const user = await UserModel.findByIdAndUpdate(
            req.params.userId,
            {$pull : {experiences : {_id: req.params.expId}}},
            {new:true , runValidators:true}
        )
        if(user){
            res.send(user)
        }else{
            next(createHttpError(404,`User with id ${req.params.userId} didn't found`))
        }
    } catch (error) {
        next(error)
    }
}

export const uploadExpPic = async(req,res,next) => {
    try {
        const user = await UserModel.findById(req.params.userId)
    
        if (!user) {
          return next(
            createHttpError(404, `User with id: ${req.params.postId} not found`)
          )  
        }
        const index = user.experiences.findIndex(aExp => aExp._id.toString() === req.params.expId)
        if(index !== -1){
            user.experiences[index].imageUrl = req.file.path
            user.save()
            res.send(user.exp)
        }else{
            next(createHttpError(404,`the experience with this id ${req.params.expId} doesn't exist`))
        }
    
      } catch (error) {
        next(error)
      }
}