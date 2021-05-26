import express from 'express'
const router = express.Router();
import stockController from '../controllers/stockController'

router.get('/', stockController.getAllStocks);
router.post('/buy-stocks', stockController.buyStock);
router.post('/sell-stocks', stockController.sellStock);
router.post('/myholdings', stockController.getCurrentHoldings);
router.post('/myoldholdings', stockController.getOldHoldings);
router.get('/:id',stockController.getSingleStock);

export default router;