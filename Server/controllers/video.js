import User from "../models/user.js"
import Video from "../models/video.js"
import { createError } from "../error.js"


export const addVideo = async (req,res,next) => {
const newVideo = new Video ({userId: req.user.id, ...req.body})
try {
    const savedVideo = await newVideo.save()
    res.status(200).json(savedVideo)
} catch (err) {
    next (err)
}
}

 export const updateVideo = async (req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404,"video not found"))
        if(req.user.id === video.userId){
            const updateVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },
            {
                new: true
            })

            res.status(200).json(updateVideo);
        } else{
            return next (createError(403, "you can update only your video "))
        }
    } catch (error) {
        next (error)
    }
 }



export const deleteVideo = async (req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404,"video not found"))
        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id)

            res.status(200).json("video has been deleted");
        } else{
            return next (createError(403, "you can only delete your video"))
        }
    } catch (error) {
        next (error)
    }
}
export const getVideo = async (req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error);
    }
}
export const addView = async (req,res,next)=>{
    try {
         await Video.findByIdAndUpdate(req.params.id,{
          $inc:{views:1}
         });
        res.status(200).json("the view has been increased")
    } catch (error) {
        next(error);
    }
}
export const random = async (req,res,next)=>{
    try {
        const videos  = await Video.aggregate([{$sample:{size: 3}}]);
        res.status(200).json(videos)
    } catch (error) {
        next(error);
    }
}
export const trend = async (req,res,next)=>{
    try {
        const videos = await Video.find().sort({views:-1})
        res.status(200).json(videos)
    } catch (error) {
        next(error);
    }
}
export const sub = async (req,res,next)=>{
    try {
       const user = await User.findById(req.user.id);
       const subscribedChannels = user.subscribedUsers;

       const list = await Promise.all(
        subscribedChannels.map((channelId)=>{
            return Video.find({userId: channelId})
        })
        );
       res.status(200).json(list)
    } catch (err) {
        next(err);
    }
}

export const getByTags = async (req,res,next)=>{
    const tags = req.query.tags.split(",")
    console.log(tags);
    try {
        const videos = await Video.find({tags:{$in: tags}}).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error);
    }
}

export const search = async (req,res,next)=>{
    const query = req.query.q
    try {
        const videos = await Video.find({title: {$regex: query, $options: "i"}}).limit(40)
        res.status(200).json(videos)
    } catch (error) {
        next(error);
    }
}
