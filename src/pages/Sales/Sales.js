import React, { useState, useEffect } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import SalesForm from "../../components/Forms/salesForm";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../users-dashboard/service";
import { setSalesListAction } from "../../store/reducers/organization-user.state";

const Sales = () => {
  const dispatch = useDispatch();
  const salesListState = useSelector(
    (state) => state?.organizationUserState?.salesList
  );
  const [showModal, setShowModal] = useState(false);
  const [salesList, setSalesList] = useState(null);
  // const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(
    () => {
      console.log(salesList);
      if (salesListState === null) dispatch(setSalesListAction(getSales()));
      else setSalesList(salesListState);
    }, // eslint-disable-next-line
    []
  );
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
        buttonTitle={"Sales"}
        gridData={salesList || []}
      />
      <BigModalDialog
        modalTitle={"Add Sale"}
        showModal={showModal}
        closeModal={closeModal}
        submitModal={submitModal}
        modalBody={SalesForm}
        width={600}
      />
    </>
  );
};
export default Sales;
