import React, { useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";

const Customers = () => {
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
        buttonTitle={"Add Customer"}
      />
      <BigModalDialog
        modalTitle={"Add Customer"}
        showModal={showModal}
        closeModal={closeModal}
        submitModal={submitModal}
        width={800}
      />
    </>
  );
};
export default Customers;
