import React, { useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import ProductForm from "../../components/Forms/productForm";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const submitModal = () => {
    setShowModal(false);
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <GridPreview
        showButton={true}
        onAddButtonClick={onAddButtonClick}
        buttonTitle={"Add Product"}
      />
      <BigModalDialog
        modalTitle={"Add Product"}
        showModal={showModal}
        closeModal={closeModal}
        submitModal={submitModal}
        width={400}
        modalBody={ProductForm}
      />
    </>
  );
};
export default Products;
