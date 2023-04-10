import React, { useState, useEffect } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import SalesForm from "../../components/Forms/salesForm";
import { useDispatch, useSelector } from "react-redux";

import {
  setCustomersListAction,
  setSalesListAction,
  setStockListAction,
} from "../../store/reducers/organization-user.state";
import OrganizationUserApi from "../../services/organization-user-api";
import {
  formatStockData,
  getFormatedSalePayload,
  getFormattedSalesList,
} from "../../utils/user-utils";
import AlertMessage from "../../components/shared/Modal-Dialog/Alert";

const Sales = () => {
  const dispatch = useDispatch();
  const organizationId = localStorage.getItem("organizationId");
  // eslint-disable-next-line
  const [openAlertState, setOpenAlertState] = useState({
    openAlert: false,
    message: "",
    severity: "",
  });
  const salesListState = useSelector(
    (state) => state?.organizationUserState?.salesList
  );
  const customerListState = useSelector(
    (state) => state?.organizationUserState?.customersList
  );
  const stockListState = useSelector(
    (state) => state?.organizationUserState?.stockList
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(false);
  const [viewType, setViewType] = useState(false);
  const [salesList, setSalesList] = useState(null);
  // const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(
    () => {
      console.log(salesList);
      if (salesListState === null) getSalesList();
      else setSalesList(salesListState);
      if (customerListState === null) getCustomerList();
      if (stockListState === null) getStockList();
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

  const getCustomerList = async () => {
    const response = await OrganizationUserApi.getCustomers();

    dispatch(setCustomersListAction({ customersList: response.data }));
  };

  const getStockList = async () => {
    const response = await OrganizationUserApi.getStockList(organizationId);
    const stockData = formatStockData(response.data);

    dispatch(setStockListAction({ stocksList: stockData }));
  };
  const getSalesList = async () => {
    const response = await OrganizationUserApi.getSales();
    const formattedSalesList = getFormattedSalesList(response.data);
    setSalesList(formattedSalesList);
    dispatch(setSalesListAction({ salesList: formattedSalesList }));
  };

  const addSale = async (salePayload) => {
    console.log(salePayload);
    const formatedPayload = getFormatedSalePayload(salePayload);
    try {
      await OrganizationUserApi.addSale(formatedPayload);
      // if (response.status !== 200 || response.status !== 201) {
      //   setOpenAlertState({ openAlert: true, severity: "error" });
      // } else {
      getSalesList();
      getStockList();
    } catch (error) {
      console.log(error);
      // setOpenAlertState({
      //   openAlert: true,
      //   severity: "error",
      //   message: error?.response.data.error,
      // });
    }
    // }
    closeModal();
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
      <AlertMessage
        openAlert={openAlertState.openAlert}
        severity={openAlertState.severity}
        message={openAlertState.message}
      />
      <GridPreview
        showButton={true}
        onAddButtonClick={onAddButtonClick}
        buttonTitle={"Sales"}
        gridData={salesList || []}
        columnsList={columns}
      />
      {/* <ListView buttonTitle={"Sales"} data={salesList || []} /> */}
      <BigModalDialog
        modalTitle={"Add Sale"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addSale}
        modalBody={SalesForm}
        selectedDataForView={selectedSale}
        viewType={viewType}
        width={500}
      />
    </>
  );
};
export default Sales;
