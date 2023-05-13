import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import ProductForm from "../../components/Forms/productForm";
import AdminUserApi from "../../services/admin-user-api";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { blue, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN } from "../../constants/constants";
import OrganizationUserApi from "../../services/organization-user-api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setProductsListAction } from "../../store/reducers/organization-user.state";
import { setOrganizationProductListAction } from "../../store/reducers/admin-user.state";

const Products = () => {
  const dispatch = useDispatch();
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);
  const [productsList, setProductList] = useState(null);
  const productsListState = useSelector((state) =>
    userRole === ADMIN
      ? state?.adminState?.productsList
      : state?.organizationUserState?.productsList
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
  const addProductForUser = async (productPayload) => {
    console.log(productPayload);
    if (userRole !== ADMIN) productPayload.ownerId = userId;
    productPayload.userOwned = true;
    const response = await AdminUserApi.addProductUser(productPayload);
    if (response.status === 200) {
      closeModal();
      getProductsList();
    }
  };

  const importProducts = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await OrganizationUserApi.importProductsUserSpecific(
        formData
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
      toast.success("All Products Imported Successfully!");
      closeModal();
    }
  };
  const getProductsList = async () => {
    if (userRole === ADMIN) {
      const response = await AdminUserApi.getProducts();
      setProductList(response.data);
      dispatch(
        setOrganizationProductListAction({ productsList: response.data })
      );
    } else {
      const response = await OrganizationUserApi.getProducts();
      setProductList(response.data);
      dispatch(setProductsListAction({ productsList: response.data }));
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

    // {
    //   title: "Organization Name",
    //   dataIndex: "",
    //   width: "20%",
    //   editable: true,
    // },
    {
      title: "Tax Percent(%)",
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

    {
      title: "Operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, product) => {
        return (
          <>
            <Tooltip title="Edit Organization">
              <ModeEditIcon
                // onClick={() => getSelectedOrganizationForEdit(organization)}
                color="primary"
                style={{ cursor: "pointer" }}
                sx={{ color: blue[500] }}
              />
            </Tooltip>
            <Tooltip title="Delete Organization">
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
        modalBody={ProductForm}
        handleFileSelect={importProducts}
      />
    </>
  );
};
export default Products;
