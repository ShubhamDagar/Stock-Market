const stocksRandom = () => {
  let rn = new Date();
  let pm5 = new Date();
  pm5.setHours(19, 0, 0, 0);
  let timeRemaining = pm5 - new Date();
    if (timeRemaining < 0) timeRemaining = 24 * 60 * 60 * 1000 + timeRemaining;
    setTimeout(() => {
        setInterval(() => {
            console.log("Random Here");
        },5000)
    }, timeRemaining)
};

export default stocksRandom;