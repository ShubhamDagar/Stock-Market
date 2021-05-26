import stockController from '../controllers/stockController';
const stocksRandom = () => {
  let rn = new Date();
  let pm5 = new Date();
  pm5.setHours(12, 0, 0, 0);
  let timeRemaining = pm5 - new Date();
    if (timeRemaining < 0) timeRemaining = 24 * 60 * 60 * 1000 + timeRemaining;
    setTimeout(() => {
        setInterval(() => {
            stockController.randomStocks();
        },24*60*60*1000)
    }, timeRemaining)
};

export default stocksRandom;