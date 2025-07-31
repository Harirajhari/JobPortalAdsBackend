import express from 'express';
import {
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage,
} from '../controllers/pageController.js';

const router = express.Router();

router.post('/', createPage);
router.get('/', getPages);
router.get('/:id', getPageById);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);

export default router;
