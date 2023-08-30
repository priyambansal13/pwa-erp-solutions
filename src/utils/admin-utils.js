export const formatOrganizationProductData = (data) => {
  console.log(data, "stockData");
  const stockData = [];
  // eslint-disable-next-line
  data.map((stock) => {
    const stockObject = {};
    stockObject.productId = stock.id;
    stockObject.stockId = stock.id;
    stockObject.hsnCode = stock?.hsnCode;
    stockObject.name = stock.name;
    stockObject.unit = stock.unit;
    stockObject.ownerId = stock.ownerId;
    stockObject.taxPercent = stock.taxPercent;
    // stockObject.quantity = stock.quantity;
    if (!stock.userOwned) stockData.push(stockObject);
  });
  return stockData;
};
