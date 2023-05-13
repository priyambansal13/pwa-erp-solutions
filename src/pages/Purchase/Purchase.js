import React, { useState, useEffect } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import PurchaseForm from "../../components/Forms/purchaseForm";
import { useDispatch, useSelector } from "react-redux";

import {
  setProductsListAction,
  setPurchaseListAction,
  setStockListAction,
  setSuppliersListAction,
} from "../../store/reducers/organization-user.state";

import OrganizationUserApi from "../../services/organization-user-api";
import {
  formatStockData,
  getFormatedPurchasePayload,
  getFormattedPurchaseList,
} from "../../utils/user-utils";
import { Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/Edit";
import { red, blue } from "@mui/material/colors";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const dispatch = useDispatch();
  const organizationId = localStorage.getItem("organizationId");
  const purchaseListState = useSelector(
    (state) => state?.organizationUserState?.purchaseList
  );
  const suppliersListState = useSelector(
    (state) => state?.organizationUserState?.suppliersList
  );
  const productListState = useSelector(
    (state) => state?.organizationUserState?.productsList
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(false);
  const [viewType, setViewType] = useState(false);
  const [purchaseList, setPurchaseList] = useState(null);
  // const [selectedOrganization, setSelectedOrganization] = useState(null);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(
    () => {
      console.log(purchaseList);
      if (purchaseListState === null) getPurchaseList();
      else setPurchaseList(purchaseListState);
      if (suppliersListState === null) getSuppliersList();
      if (productListState === null) getProductList();
    }, // eslint-disable-next-line
    []
  );
  const closeModal = () => {
    setShowModal(false);
    setSelectedSale(null);
    setViewType(null);
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };

  const getSuppliersList = async () => {
    const response = await OrganizationUserApi.getSuppliers();

    dispatch(setSuppliersListAction({ suppliersList: response.data }));
  };

  const getProductList = async () => {
    const response = await OrganizationUserApi.getProducts(organizationId);
    // const stockData = formatStockData(response.data);

    dispatch(setProductsListAction({ productsList: response.data }));
  };
  const getPurchaseList = async () => {
    const response = await OrganizationUserApi.getPurchases();
    const formattedSalesList = getFormattedPurchaseList(response.data);
    setPurchaseList(formattedSalesList);
    dispatch(setPurchaseListAction({ purchaseList: formattedSalesList }));
  };

  const addPurchase = async (purchasePayload) => {
    console.log(purchasePayload);
    const formatedPayload = getFormatedPurchasePayload(purchasePayload);
    await OrganizationUserApi.addPurchase(formatedPayload);
    getPurchaseList();
    getProductList();
    getStocksList();
    closeModal();
  };
  const getStocksList = async () => {
    const response = await OrganizationUserApi.getStockList(organizationId);
    const stockData = formatStockData(response.data);
    // setStocksList(stockData);
    dispatch(setStockListAction({ stocksList: stockData }));
  };

  const openViewDetailModal = (item) => {
    setSelectedSale(item);
    setViewType("View");
    setShowModal(true);
  };

  const deletePurchase = async (purchase) => {
    const response = await OrganizationUserApi.deletePurchase(purchase);
    if (response.status === 200) {
      closeModal();
      getPurchaseList();
      getStocksList();
    }
  };

  const columns = [
    {
      title: "Invoice No.",
      dataIndex: "invoiceNumber",
      render: (_, sale) => (
        <span
          style={{ color: "#007bff" }}
          onClick={() => {
            openViewDetailModal(sale);
          }}
        >
          <b>{sale.invoiceNumber}</b>
        </span>
      ),
      width: "5%",
      editable: true,
      // key: "invoiceNumber",
    },
    {
      title: "Supplier Name",
      dataIndex: "name",
      width: "10%",
      editable: true,
    },
    {
      title: "Items",
      dataIndex: "itemsCount",
      width: "5%",
      editable: true,
      // responsive: ["md"],
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      width: "5%",
      editable: true,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Date",
      dataIndex: "timestamp",
      width: "10%",
      editable: true,
      // sorter: true,
      //responsive: ["md"],
    },

    {
      title: "Operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, purchase) => {
        return (
          <>
            <Tooltip title="Edit Purchase">
              <ModeEditIcon
                // onClick={() => getSelectedOrganizationForEdit(purchase)}
                color="primary"
                style={{ cursor: "pointer" }}
                sx={{ color: blue[500] }}
              />
            </Tooltip>
            <Tooltip title="Delete Purchase">
              <DeleteIcon
                onClick={() => deletePurchase(purchase)}
                style={{
                  marginLeft: 20,
                  cursor: "pointer",
                }}
                sx={{ color: red[400] }}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Stack direction={"row"}>
            <IconButton
              aria-label="arrowBack"
              onClick={handleGoBack}
              className="mr-2"
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <Typography variant="h5" className="mt-1">
              Dashboard
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <GridPreview
            showButton={true}
            onAddButtonClick={onAddButtonClick}
            buttonTitle={"Add Purchase"}
            gridData={purchaseList || []}
            columnsList={columns}
          />
        </Grid>
        {/* <ListView buttonTitle={"Purchases"} /> */}
        <BigModalDialog
          modalTitle={"Purchase List"}
          showModal={showModal}
          closeModal={closeModal}
          submitData={addPurchase}
          modalBody={PurchaseForm}
          selectedDataForView={selectedSale}
          viewType={viewType}
          width={500}
        />
      </Grid>
    </>
  );
};
export default Purchase;
