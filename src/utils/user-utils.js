import { convertToDateTime } from "./common-utils";

export const formatStockData = (data) => {
  console.log(data, "stockData");
  const stockData = [];
  // eslint-disable-next-line
  data.map((stock) => {
    const stockObject = {};
    stockObject.productId = stock.product.id;
    stockObject.stockId = stock.id;

    stockObject.name = stock.product.name;
    stockObject.unit = stock.product.unit;
    stockObject.taxPercent = stock.product.taxPercent;
    stockObject.quantity = stock.quantity;

    stockData.push(stockObject);
  });
  return stockData;
};

export const getFormattedSalesList = (data) => {
  const salesData = [];
  // eslint-disable-next-line
  data.map((sales) => {
    const saleObject = {};
    saleObject.invoiceNumber = sales.invoiceNumber;
    saleObject.totalAmount = sales.totalAmount;
    saleObject.name = sales.partyName;
    saleObject.tax = sales.tax;
    saleObject.customerId = sales.partyId;
    saleObject.itemsCount = sales.salePurchaseItems.length;
    saleObject.salePurchaseItems = sales.salePurchaseItems;
    saleObject.timestamp =
      sales.timestamp && convertToDateTime(sales.timestamp);
    salesData.push(saleObject);
  });
  return salesData;
};
export const getFormattedPurchaseList = (data) => {
  const purchaseData = [];
  // eslint-disable-next-line
  data.map((purchase) => {
    const purchaseObject = {};
    purchaseObject.invoiceNumber = purchase.invoiceNumber;
    purchaseObject.totalAmount = purchase.totalAmount;
    purchaseObject.tax = purchase.tax;
    purchaseObject.name = purchase.partyName;
    purchaseObject.supplierId = purchase.partyId;
    purchaseObject.itemsCount = purchase.salePurchaseItems.length;
    purchaseObject.salePurchaseItems = purchase.salePurchaseItems;
    purchaseObject.timestamp =
      purchase.timestamp && convertToDateTime(purchase.timestamp);
    purchaseData.push(purchaseObject);
  });
  return purchaseData;
};

// function for converting sale payload to required form for post api addsale call
export const getFormatedSalePayload = (data) => {
  const salesPayload = {};
  salesPayload.customerId = data.customerId;
  salesPayload.totalAmount = data.totalAmount;
  salesPayload.tax = data.tax;
  salesPayload.discount = data.discount;
  salesPayload.timestamp = data.timestamp;
  salesPayload.invoiceNumber = data.invoiceNumber;
  salesPayload.salePurchaseItems = [];
  // eslint-disable-next-line
  data.salePurchaseItems.map((item) => {
    const itemObject = {};
    // itemObject.id = item.product.stockId;
    itemObject.product = { id: item.product.productId };
    itemObject.quantity = item.quantity;
    itemObject.price = item.price;
    salesPayload.salePurchaseItems.push(itemObject);
  });

  return salesPayload;
};

// function for converting purchase payload to required form for post api addpurchase call
export const getFormatedPurchasePayload = (data) => {
  const salesPayload = {};
  salesPayload.supplierId = data.supplierId;
  salesPayload.totalAmount = data.totalAmount;
  salesPayload.tax = data.tax;
  salesPayload.discount = data.discount;
  salesPayload.timestamp = data.timestamp;
  salesPayload.invoiceNumber = data.invoiceNumber;
  salesPayload.salePurchaseItems = [];
  // eslint-disable-next-line
  data.salePurchaseItems.map((item) => {
    const itemObject = {};
    // itemObject.id = item.product.stockId;
    itemObject.product = { id: item.product.id };
    itemObject.quantity = item.quantity;
    itemObject.price = item.price;
    salesPayload.salePurchaseItems.push(itemObject);
  });

  return salesPayload;
};
