import { createError } from "../error.js"
import User from "../models/user.js"
import Video from "../models/video.js"


export const update = async(req,res,next)=>{
   if(req.params.id === req.user.id){
try {
    const updateUser = await User.findByIdAndUpdate(req.params.id,{
      $set:req.body},
    {
        new:true}
)
    res.status(200).json(updateUser)
} catch (err) {
    next(err)
};
   }else{
    return  next(createError(403,"you can update only your account"))
   }
}


export const deleteUser = async(req,res,next)=>{

    if(req.params.id === req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id)

            res.status(200).json("user has been deleted")

        } catch (err) {
            next(err)
        };
           }else{
              return next (createError(403,"you can only delete your account"))
           }

}


export const getUser = async (req,res,next)=>{
   try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    
   } catch (error) {
    next(error);
   }
}


export const subscribe = async (req,res,next)=>{
   
     try {

        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id}
        })

        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscriber:1}
        });
        res.status(200).json("subscription successful")
        
     } catch (error) {
        next (error);
     }

}


export const unSubscribe = async (req,res,next)=>{
    try {

        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id}
        })

        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscriber: -1}
        });
        res.status(200).json("Unsubscription successful")
        
     } catch (error) {
        next (error);
     }
}



export const like = async (req,res,next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{disLikes:id}
        })
        res.status(200).json("the video has been liked")
    } catch (error) {
       next (error)
    }
}




export const disLike = async (req,res,next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{disLikes:id},
            $pull:{likes:id}
        })
        res.status(200).json("the video has been disliked")
    } catch (error) {
       next (error)
    }
}
