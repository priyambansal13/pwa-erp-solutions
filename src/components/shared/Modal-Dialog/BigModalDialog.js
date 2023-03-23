import React from "react";
import { Modal } from "antd";

const BigModalDialog = (props) => {
  return (
    <>
      <Modal
        title={props.modalTitle}
        open={props.showModal}
        footer={null}
        closable={false}
        width={props.width}
        maskClosable={false}
      >
        {
          <props.modalBody
            closeModal={props.closeModal}
            submitData={props.submitData}
            updateData={props.updateData}
            selectedDataForEdit={props.selectedDataForEdit}
          />
        }
      </Modal>
    </>
  );
};

export default BigModalDialog;
