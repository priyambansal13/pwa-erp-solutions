import React, { useState, useEffect } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import StockForm from "../../components/Forms/stockForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductsForOrganizationListAction,
  setStockListAction,
} from "../../store/reducers/organization-user.state";
import OrganizationUserApi from "../../services/organization-user-api";

import { formatStockData } from "../../utils/user-utils";

const Stock = () => {
  const dispatch = useDispatch();
  const organizationId = localStorage.getItem("organizationId");
  const productsListState = useSelector(
    (state) => state?.organizationUserState?.productsList
  );
  const stocksListState = useSelector(
    (state) => state?.organizationUserState?.stockList
  );
  const [showModal, setShowModal] = useState(false);
  const [stocksList, setStocksList] = useState(null);
  // const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(
    () => {
      if (organizationId) {
        if (stocksListState === null) getStocksList();
        else setStocksList(stocksListState);
        if (productsListState === null) getProductsForOrganization();
      }

      // else setProductsList(productsListState);
    }, // eslint-disable-next-line
    []
  );

  const getProductsForOrganization = async () => {
    const response = await OrganizationUserApi.getProductsForOrganization(
      organizationId
    );
    dispatch(
      setProductsForOrganizationListAction({ productsList: response.data })
    );
  };

  const getStocksList = async () => {
    const response = await OrganizationUserApi.getStockList(organizationId);
    const stockData = formatStockData(response.data);
    setStocksList(stockData);
    dispatch(setStockListAction({ stocksList: stockData }));
  };

  const addStockToProduct = async (stockPayload) => {
    await OrganizationUserApi.addStockForProduct(stockPayload);
    closeModal();
    getStocksList();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      width: "20%",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "20%",
      editable: true,
    },
    {
      title: "Tax (%)",
      dataIndex: "taxPercent",
      width: "10%",
      editable: true,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      width: "10%",
      editable: true,
    },

    // {
    //   title: "Operation",
    //   dataIndex: "operation",
    //   width: "10%",
    //   render: (_, productStock) => {
    //     return (
    //       <>
    //         <Tooltip title="Edit Stock">
    //           <ModeEditIcon
    //             // onClick={() => getSelectedOrganizationForEdit(productStock)}
    //             color="primary"
    //             style={{ cursor: "pointer" }}
    //             sx={{ color: blue[500] }}
    //           />
    //         </Tooltip>
    //         <Tooltip title="Delete Organization">
    //           <DeleteIcon
    //             // onClick={() => deleteOrganization(productStock)}
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
        buttonTitle={"Products"}
        gridData={stocksList || []}
        columnsList={columns}
      />
      <BigModalDialog
        modalTitle={"Add Stock For Product"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addStockToProduct}
        modalBody={StockForm}
        width={350}
      />
    </>
  );
};
export default Stock;
