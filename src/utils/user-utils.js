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
    saleObject.id = sales.id;
    saleObject.invoiceNumber = sales.invoiceNumber;
    saleObject.totalAmount = sales.amount;
    saleObject.tax = sales.tax;
    saleObject.customerId = sales.customer.id;
    saleObject.customerName = sales.customer.name;
    saleObject.itemsCount = sales.items.length;
    saleObject.salePurchaseItems = [];
    // eslint-disable-next-line
    sales?.items?.map((item) => {
      const itemObject = {};
      itemObject.product = {
        id: item.productId,
        taxPercent: item.taxPercent,
        unit: item.unit,
        name: item.name,
        hsnCode: item.hsnCode,
      };
      itemObject.price = item.price;
      itemObject.quantity = item.quantity;
      saleObject.salePurchaseItems.push(itemObject);
    });
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
    purchaseObject.id = purchase.id;
    purchaseObject.invoiceNumber = purchase.invoiceNumber;
    purchaseObject.totalAmount = purchase.amount;
    purchaseObject.tax = purchase.tax;
    purchaseObject.name = purchase.supplier.name;
    purchaseObject.supplierId = purchase.supplier.id;
    purchaseObject.itemsCount = purchase.items.length;
    purchaseObject.salePurchaseItems = [];
    // eslint-disable-next-line
    purchase?.items?.map((item) => {
      const itemObject = {};
      itemObject.product = {
        id: item.productId,
        taxPercent: item.taxPercent,
        unit: item.unit,
        name: item.name,
        hsnCode: item.hsnCode,
      };
      itemObject.price = item.price;
      itemObject.quantity = item.quantity;
      purchaseObject.salePurchaseItems.push(itemObject);
    });
    purchaseObject.timestamp =
      purchase.timestamp && convertToDateTime(purchase.timestamp);
    purchaseData.push(purchaseObject);
  });
  return purchaseData;
};

// function for converting sale payload to required form for post api addsale call
export const getFormatedSalePayload = (data) => {
  const salesPayload = {};
  salesPayload.partyId = data.customerId;
  salesPayload.amount = data.totalAmount;
  salesPayload.tax = data.tax;
  salesPayload.discount = data.discount;
  salesPayload.timestamp = data.timestamp;
  salesPayload.invoiceNumber = data.invoiceNumber;
  salesPayload.items = [];
  // eslint-disable-next-line
  data.salePurchaseItems.map((item) => {
    const itemObject = {};
    // itemObject.id = item.product.stockId;
    itemObject.productId = item.product.productId;
    itemObject.quantity = item.quantity;
    itemObject.price = item.price;
    salesPayload.items.push(itemObject);
  });

  return salesPayload;
};

// function for converting purchase payload to required form for post api addpurchase call
export const getFormatedPurchasePayload = (data) => {
  const salesPayload = {};
  salesPayload.partyId = data.supplierId;
  salesPayload.amount = data.totalAmount;
  salesPayload.tax = data.tax;
  salesPayload.discount = data.discount;
  salesPayload.timestamp = data.timestamp;
  salesPayload.invoiceNumber = data.invoiceNumber;
  salesPayload.items = [];
  // eslint-disable-next-line
  data.salePurchaseItems.map((item) => {
    const itemObject = {};
    // itemObject.id = item.product.stockId;
    itemObject.productId = item.product.id;
    itemObject.quantity = item.quantity;
    itemObject.price = item.price;
    salesPayload.items.push(itemObject);
  });

  return salesPayload;
};

export const getFormattedPaymentList = (data) => {
  const paymentData = [];
  // eslint-disable-next-line
  data.map((payment) => {
    const paymentObject = {};
    paymentObject.id = payment.id;
    paymentObject.amount = payment.amount;
    paymentObject.partyId = payment.supplier;
    paymentObject.name = payment.supplier?.name;
    paymentObject.mode = payment.paymentMode;
    paymentObject.note = payment.note;
    paymentObject.type = payment.type;
    paymentObject.bankAccountId = payment.bankAccount && payment.bankAccount.id;
    paymentObject.accountName =
      payment.bankAccount && payment.bankAccount.alias;
    paymentObject.date = payment.date && convertToDateTime(payment.date);
    paymentObject.category = payment.category;
    paymentData.push(paymentObject);
  });
  return paymentData;
};

export const getFormattedReceiptList = (data) => {
  const receiptData = [];
  // eslint-disable-next-line
  data.map((receipt) => {
    const receiptObject = {};
    receiptObject.id = receipt.id;
    receiptObject.amount = receipt.amount;
    receiptObject.partyId = receipt.customer.id;
    receiptObject.name = receipt.customer.name;
    receiptObject.mode = receipt.paymentMode;
    receiptObject.note = receipt.note;
    receiptObject.type = receipt.type;
    receiptObject.bankAccountId = receipt.bankAccount && receipt.bankAccount.id;
    receiptObject.accountName =
      receipt.bankAccount && receipt.bankAccount.alias;
    receiptObject.date = receipt.date && convertToDateTime(receipt.date);
    receiptData.push(receiptObject);
  });
  return receiptData;
};
