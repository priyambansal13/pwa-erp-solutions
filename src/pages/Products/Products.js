import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import ProductForm from "../../components/Forms/productForm";
import AdminUserApi from "../../services/admin-user-api";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { blue, red } from "@mui/material/colors";
import { useSelector } from "react-redux";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [productsList, setProductList] = useState(null);
  const productsListState = useSelector(
    (state) => state?.adminState?.productsList
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
  const addProduct = async (productPayload) => {
    console.log(productPayload);
    const response = await AdminUserApi.addProduct(productPayload);
    if (response.status === 200) {
      closeModal();
      getProductsList();
    }
  };

  const getProductsList = async () => {
    const response = await AdminUserApi.getProducts();
    setProductList(response.data);
    // dispatch(setOrganizationListAction({ organizationList: response.data }));
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
      title: "Organization Name",
      dataIndex: "",
      width: "20%",
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
      width: "10%",
      editable: true,
    },

    {
      title: "Operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, organization) => {
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
                // onClick={() => deleteOrganization(organization)}
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
      <GridPreview
        showButton={true}
        onAddButtonClick={onAddButtonClick}
        buttonTitle={"Products"}
        gridData={productsList}
        columnsList={columns}
      />
      <BigModalDialog
        modalTitle={"Add Product"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addProduct}
        width={400}
        modalBody={ProductForm}
      />
    </>
  );
};
export default Products;
