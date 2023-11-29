import express from 'express'
import {update,deleteUser, getUser,subscribe ,unSubscribe, like, disLike} from "../controllers/users.js"
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

// UPDATE USER 
router.put("/:id" , verifyToken, update)


// DELETE USER 
router.delete("/:id" , verifyToken , deleteUser)


// GET A USER
router.get("/find/:id" , getUser)


// SUBSCRIBE A USER
router.put("/sub/:id" , verifyToken ,subscribe)


// UNSUBSCRBE A USER
router.put("/unsub/:id"  , verifyToken ,unSubscribe)


// LIKE A video
router.put("/like/:videoid"  , verifyToken , like) 


// DISLIKE A video
router.put("/dislike/:videoid" , verifyToken , disLike)


export default router;