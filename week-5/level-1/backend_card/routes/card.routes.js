import { Router } from 'express'
import { cardDetails, getCards } from '../controllers/cardController.js';

const router = Router();

router.post("/cardDetails", cardDetails)
router.get("/getCards", getCards)

export default router