import express from 'express'
import { addVideo, updateVideo, deleteVideo, getVideo, addView, random, sub,trend,getByTags,search} from "../controllers/video.js"
import { verifyToken } from '../verifyToken.js'

const router = express.Router()


router.post("/" ,  verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo )
router.delete("/:id" , verifyToken,deleteVideo)
router.get("/find/:id" , verifyToken, getVideo)
router.get("/view/:id" , verifyToken, addView)
router.get("/trend" , verifyToken, trend)
router.get("/random" , random)
router.get("/sub" , verifyToken, sub)
router.get("/tags" , getByTags)
router.get("/search" , search )



export default router;