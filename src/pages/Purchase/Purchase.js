import React, { useState, useEffect } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import PurchaseForm from "../../components/Forms/purchaseForm";
import { useDispatch, useSelector } from "react-redux";
import { getPurchase } from "../users-dashboard/service";
import { setPurchaseListAction } from "../../store/reducers/organization-user.state";

const Purchase = () => {
  const dispatch = useDispatch();
  const purchaseListState = useSelector(
    (state) => state?.organizationUserState?.purchaseList
  );
  const [showModal, setShowModal] = useState(false);
  const [purchaseList, setPurchaseList] = useState(null);
  // const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(
    () => {
      console.log(purchaseList);
      if (purchaseListState === null)
        dispatch(setPurchaseListAction(getPurchase()));
      else setPurchaseList(purchaseListState);
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
        buttonTitle={"Add Purchase"}
        gridData={purchaseList || []}
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
