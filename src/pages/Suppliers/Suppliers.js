import React, { useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import PurchaseForm from "../../components/Forms/purchaseForm";

const Suppliers = () => {
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
        buttonTitle={"Add Suppliers"}
      />
      <BigModalDialog
        modalTitle={"Add Suppliers"}
        showModal={showModal}
        closeModal={closeModal}
        submitModal={submitModal}
        modalBody={PurchaseForm}
        width={400}
      />
    </>
  );
};
export default Suppliers;
