import express from 'express'
import {addComments,deleteComments,getComments} from "../controllers/comment.js"
import { verifyToken } from '../verifyToken.js';

const router = express.Router()


router.post("/", verifyToken, addComments)
router.delete("/:id", verifyToken, deleteComments)
router.get("/:videoId", getComments)

export default router;