import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import ProductForm from "../../components/Forms/productForm";
import AdminUserApi from "../../services/admin-user-api";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import AddIcon from "@mui/icons-material/Add";
import { blue, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN } from "../../constants/constants";
import OrganizationUserApi from "../../services/organization-user-api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setStockListAction } from "../../store/reducers/organization-user.state";
import { setOrganizationProductListAction } from "../../store/reducers/admin-user.state";
import StockForm from "../../components/Forms/stockForm";
import { formatStockData } from "../../utils/user-utils";
import { formatOrganizationProductData } from "../../utils/admin-utils";

const Products = () => {
  const dispatch = useDispatch();
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);

  const [showStockModal, setShowStockModal] = useState(false);
  const [productsList, setProductList] = useState(null);
  const productsListState = useSelector((state) =>
    userRole === ADMIN
      ? state?.adminState?.productsList
      : state?.organizationUserState?.stockList
  );

  useEffect(
    () => {
      if (productsListState === null) getProductsList();
      else setProductList(productsListState);
    }, // eslint-disable-next-line
    []
  );
  const closeModal = () => {
    setShowModal(false);
    setShowStockModal(false);
  };
  const addProductForOrganization = async (productPayload) => {
    console.log(productPayload);
    productPayload.userOwned = false;
    const response = await AdminUserApi.addProductOrganization(productPayload);
    if (response.status === 200) {
      closeModal();
      getProductsList();
    }
  };

  const addProductForUser = async (productPayload, selectedProductType) => {
    console.log(productPayload, selectedProductType);
    let response = null;
    if (selectedProductType === "new") {
      if (userRole !== ADMIN) productPayload.ownerId = userId;
      productPayload.userOwned = true;
      response = await OrganizationUserApi.addProductUser(productPayload);
    } else {
      response = await OrganizationUserApi.addStockForProduct(productPayload);
    }
    if (response?.status === 200) {
      closeModal();
      getProductsList();
    }
  };

  const importProducts = async (e, organizationId) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response =
        await OrganizationUserApi.importProductsOrganizationSpecific(
          formData,
          organizationId
        );
      console.log(response);
      if (response.status === 206) {
        console.log(response);
        const contentType = response.headers["content-type"];
        const fileName = "products_error.xlsx";
        // create a new Blob object with the binary data
        const blob = new Blob([response.data], { type: contentType });

        // create a temporary URL object to download the file
        const url = window.URL.createObjectURL(blob);

        // create a link element and click it to start the download
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();

        // revoke the URL object to free up memory
        window.URL.revokeObjectURL(url);
        toast.warning("Some Products Are Not Imported! Please check them.");
        closeModal();
        getProductsList();
      }
      if (response.status === 200) {
        closeModal();
        toast.success("All Products Imported Successfully!");
        getProductsList();
      }
    } catch (error) {
      console.log(error);
      toast.error("Products not imported! Please try again");
      closeModal();
    }
  };
  const getProductsList = async () => {
    if (userRole === ADMIN) {
      const response = await AdminUserApi.getProducts();
      const formattedData = formatOrganizationProductData(response.data);
      setProductList(formattedData);
      dispatch(
        setOrganizationProductListAction({ productsList: formattedData })
      );
    } else {
      const response = await OrganizationUserApi.getStockList();
      const stockData = formatStockData(response.data);
      console.log(stockData);
      setProductList(stockData);
      dispatch(setStockListAction({ stocksList: stockData }));
    }
  };

  const deleteProduct = async (product) => {
    const response = await OrganizationUserApi.deleteProduct(product);
    if (response.status === 200) {
      closeModal();
      getProductsList();
      // getStocksList();
    }
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      width: "10%",
      editable: true,
    },
    {
      title: "HSN Code",
      dataIndex: "hsnCode",
      width: "10%",
      editable: true,
    },

    {
      title: "Stock Quantity",
      dataIndex: "quantity",
      width: "10%",
      editable: true,
    },
    {
      title: "Tax Percent(%)",
      dataIndex: "taxPercent",
      width: "10%",
      editable: true,
    },

    {
      title: "Unit",
      dataIndex: "unit",
      width: "5%",
      editable: true,
    },

    {
      title: "Operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, product) => {
        return (
          <>
            <Tooltip title="Edit Product">
              <ModeEditIcon
                // onClick={() => getSelectedOrganizationForEdit(organization)}
                color="primary"
                style={{ cursor: "pointer", marginLeft: 20 }}
                sx={{ color: blue[500] }}
              />
            </Tooltip>
            <Tooltip title="Delete Product">
              <DeleteIcon
                onClick={() => deleteProduct(product)}
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
      <ToastContainer />
      <GridPreview
        showButton={true}
        onAddButtonClick={onAddButtonClick}
        buttonTitle={"Products"}
        gridData={productsList}
        columnsList={columns}
        upload={true}
      />
      <BigModalDialog
        modalTitle={"Add Product"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={
          userRole === ADMIN ? addProductForOrganization : addProductForUser
        }
        width={400}
        modalBody={userRole === ADMIN ? ProductForm : StockForm}
        handleFileSelect={importProducts}
      />
      <BigModalDialog
        modalTitle={"Add Stock"}
        showModal={showStockModal}
        closeModal={closeModal}
        submitData={
          userRole === ADMIN ? addProductForOrganization : addProductForUser
        }
        width={400}
        modalBody={StockForm}
        // handleFileSelect={importProducts}
      />
    </>
  );
};
export default Products;
