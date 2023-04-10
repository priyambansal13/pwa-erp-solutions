import React, { useState, useEffect } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import PurchaseForm from "../../components/Forms/purchaseForm";
import { useDispatch, useSelector } from "react-redux";

import {
  setProductsForOrganizationListAction,
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
    const response = await OrganizationUserApi.getProductsForOrganization(
      organizationId
    );
    // const stockData = formatStockData(response.data);

    dispatch(
      setProductsForOrganizationListAction({ productsList: response.data })
    );
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
      title: "Customer Name",
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

    // {
    //   title: "Operation",
    //   dataIndex: "operation",
    //   width: "10%",
    //   render: (_, organization) => {
    //     return (
    //       <>
    //         <Tooltip title="Edit Sales">
    //           <ModeEditIcon
    //             // onClick={() => getSelectedOrganizationForEdit(organization)}
    //             color="primary"
    //             style={{ cursor: "pointer" }}
    //             sx={{ color: blue[500] }}
    //           />
    //         </Tooltip>
    //         <Tooltip title="Delete Sales">
    //           <DeleteIcon
    //             // onClick={() => deleteOrganization(organization)}
    //             style={{
    //               marginLeft: 20,
    //               cursor: "pointer",
    //             }}
    //             sx={{ color: red[400] }}
    //           />
    //         </Tooltip>
    //       </>
    //     );
    //   },
    // },
  ];
  return (
    <>
      <GridPreview
        showButton={true}
        onAddButtonClick={onAddButtonClick}
        buttonTitle={"Add Purchase"}
        gridData={purchaseList || []}
        columnsList={columns}
      />
      {/* <ListView buttonTitle={"Purchases"} /> */}
      <BigModalDialog
        modalTitle={"Add Purchase"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addPurchase}
        modalBody={PurchaseForm}
        selectedDataForView={selectedSale}
        viewType={viewType}
        width={500}
      />
    </>
  );
};
export default Purchase;
