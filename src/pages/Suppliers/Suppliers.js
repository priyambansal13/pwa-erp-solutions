import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import SupplierForm from "../../components/Forms/supplierForm";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliers } from "../users-dashboard/service";
import { setSuppliersListAction } from "../../store/reducers/organization-user.state";

const Suppliers = () => {
  const dispatch = useDispatch();
  const suppliersListState = useSelector(
    (state) => state?.organizationUserState?.suppliersList
  );
  const [showModal, setShowModal] = useState(false);
  const [suppliersList, setSuppliersList] = useState(null);
  // const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(
    () => {
      console.log(suppliersList);
      if (suppliersListState === null)
        dispatch(setSuppliersListAction(getSuppliers()));
      else setSuppliersList(suppliersListState);
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
        buttonTitle={"Suppliers"}
        gridData={suppliersList || []}
      />
      <BigModalDialog
        modalTitle={"Add Suppliers"}
        showModal={showModal}
        closeModal={closeModal}
        submitModal={submitModal}
        modalBody={SupplierForm}
        width={600}
      />
    </>
  );
};
export default Suppliers;
