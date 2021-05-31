import Holding from "../models/holding";
import Stock from "../models/stock";
import User from "../models/user";

const controllers = {
  randomStocks: async () => {
    try {
      let stocks = await Stock.find({});
      for (let i = 0; i < stocks.length; i++) {
        let currVal = stocks[i].current;
        let newVal = (currVal + parseFloat((4 - (10 * Math.random())).toFixed(2))).toFixed(2);
        let st = await Stock.findById(stocks[i]._id);
        await st.update({
          prev: currVal,
          current: newVal
        });
        await st.save();
      }
    } catch (error) {
      console.log(error, " In randomizing !");
    }
  },
  getAllStocks: async (req, res) => {
    try {
      let stocks = await Stock.find({});
      return res.json(stocks);
    } catch (error) {
      console.log(error, " Error in fetching all Stocks !");
    }
  },
  getSingleStock: async (req, res) => {
    try {
      let stock = await Stock.findById(req.params.id);
      return res.json(stock);
    } catch (error) {
      console.log(error, " Error in fetching single Stock !");
    }
  },
  buyStock: async (req, res) => {
    try {
      let stockID = req.body.id;
      let stockQuanity = req.body.quantity;
      let stock = await Stock.findById(stockID);
      let user = await User.findById(req.user.id);
      if (stock.quantity < stockQuanity) return res.json(null);
      await stock.update({ quantity: stock.quantity - stockQuanity });
      await stock.save();
      let holding = await Holding.create({
        user: req.user.id,
        stock: stock._id,
        purchasedAt: stock.current,
        quantity: stockQuanity,
      });
      await user.currentHoldings.push(holding);
      await user.save();
      user = await User.findById(req.user.id);
      await user.update({ money: user.money - stockQuanity * stock.current });
      await user.save();
      const newUser = await User.findById(req.user.id);
      return res.json({ error: null , user : newUser});
    } catch (error) {
      console.log(error, " Error in buying Stock !");
    }
  },
  sellStock: async (req, res) => {
    try {
      let holding = await Holding.findById(req.body.id);
      if (holding.user != req.user.id) return;
      let stock = await Stock.findById(holding.stock);
      let user = await User.findById(req.user.id);
      await holding.update({ soldedAt: stock.current });
      await holding.save();
      holding.soledAt = stock.current;
      await stock.update({ quantity: stock.quantity + holding.quantity });
      await stock.save();
      await user.update({
        $pull: { currentHoldings: req.body.id },
      });
      await user.save();
      await user.previousPurchase.push(holding);
      await user.save();
      // user = await User.findById(req.user.id);
      await user.update({
        money: user.money + holding.quantity * stock.current,
      });
      await user.save();
      const newUser = await User.findById(req.user.id);
      return res.json({ error: null , user : newUser});
    } catch (error) {
      console.log(error, " Error in selling Stock !");
    }
  },
  getCurrentHoldings: async (req, res) => {
    try {
      let holdings = await Holding.find({ _id: { $in: req.body.ids } }).populate('stock');
      return res.json(holdings);
    } catch (error) {
      console.log(error);
    }
  }, getOldHoldings: async (req, res) => {
    try {
      let holdings = await Holding.find({ _id: { $in: req.body.ids } }).populate('stock');
      return res.json(holdings);
    } catch (error) {
      console.log(error);
    }
  },
  putDummyStocks: async () => {
    await Stock.create({
      name: "T-System",
      symbol: "TST",
      prev: 150,
      current: 155,
    });
    await Stock.create({
      name: "Apple Inc.",
      symbol: "AAPL",
      prev: 127,
      current: 129,
    });
    await Stock.create({
      name: "Airtel",
      symbol: "ARTL",
      prev: 140,
      current: 145,
    });
    await Stock.create({
      name: "Microsoft",
      symbol: "MICRO",
      prev: 100,
      current: 98,
    });
    await Stock.create({
      name: "Google",
      symbol: "GOGL",
      prev: 200,
      current: 197,
    });
  },
};

export default controllers;
