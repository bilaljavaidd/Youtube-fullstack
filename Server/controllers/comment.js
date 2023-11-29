import Video from "../models/video.js"
import Comment from "../models/comment.js"
import { createError } from "../error.js"


export const addComments = async (req,res,next)=>{
    const newComment = new Comment ({...req.body, userId:req.user.id})
    try {
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
    } catch (err) {
        next(err);
    }
}
export const deleteComments = async (req,res,next)=>{
    try {
        const comment = await Comment.findById(res.params.id)
        const video = await Video.findById(res.params.id)
        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("the Comment hs been deleted")
        }else{
            return next(createError(403, "you can delete only your ow comment"))
        }
    } catch (err) {
        next(err);
    }
}
export const getComments = async (req,res,next)=>{
    try {
        const Comments = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(Comments)
    } catch (err) {
        next(err);
    }
}