export default (eth,address) =>
  new Promise (function (resolve, reject) {
    eth.getBalance(address, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
    }
  })
})