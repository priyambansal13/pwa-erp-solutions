import React, { useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import SalesForm from "../../components/Forms/salesForm";

const Sales = () => {
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
        buttonTitle={"Add Sale"}
      />
      <BigModalDialog
        modalTitle={"Add Sale"}
        showModal={showModal}
        closeModal={closeModal}
        submitModal={submitModal}
        modalBody={SalesForm}
        width={400}
      />
    </>
  );
};
export default Sales;
