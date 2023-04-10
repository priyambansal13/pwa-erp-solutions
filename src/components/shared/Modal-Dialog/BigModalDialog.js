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
            selectedDataForEdit={props.selectedDataForEdit || null}
            parentComponentData={props.parentComponentData || null}
            viewType={props.viewType || null}
            selectedDataForView={props.selectedDataForView || null}
            modalData={props.modalData}
          />
        }
      </Modal>
    </>
  );
};

export default BigModalDialog;
