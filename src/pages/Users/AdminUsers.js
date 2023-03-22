import React, { useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";

const AdminUsers = () => {
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
        showButton={false}
        onAddButtonClick={onAddButtonClick}
        buttonTitle={"Add User"}
      />
      <BigModalDialog
        modalTitle={"Add User"}
        showModal={showModal}
        closeModal={closeModal}
        submitModal={submitModal}
        width={800}
      />
    </>
  );
};
export default AdminUsers;
