import { Router } from 'express'
import { createBlog, getAllBlogs, getAllUserBlogs, deleteBlog, uploadImageToCloudinary } from '../controllers/blogController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { uploadImage } from '../middlewares/multer'

const router = Router()

router.post('/create', authMiddleware, createBlog)
router.get('/getAllBlogs', getAllBlogs)
router.get('/getAllUserBlogs', authMiddleware, getAllUserBlogs)
router.delete('/delete', authMiddleware, deleteBlog)

router.post('/upload-image', authMiddleware, uploadImage.single('image'), uploadImageToCloudinary)

export default router
