import React, { useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import PurchaseForm from "../../components/Forms/purchaseForm";

const Purchase = () => {
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
        buttonTitle={"Add Purchase"}
      />
      <BigModalDialog
        modalTitle={"Add Purchase"}
        showModal={showModal}
        closeModal={closeModal}
        submitModal={submitModal}
        modalBody={PurchaseForm}
        width={400}
      />
    </>
  );
};
export default Purchase;
