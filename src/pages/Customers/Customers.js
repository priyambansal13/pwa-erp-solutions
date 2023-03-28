import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import CustomerForm from "../../components/Forms/customerForm";
import { useDispatch, useSelector } from "react-redux";
import { setCustomersListAction } from "../../store/reducers/organization-user.state";
import { getCustomers } from "../users-dashboard/service";

const Customers = () => {
  const dispatch = useDispatch();
  const customersListState = useSelector(
    (state) => state?.organizationUserState?.customersList
  );
  const [showModal, setShowModal] = useState(false);
  const [customersList, setCustomersList] = useState(null);
  // const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(
    () => {
      console.log(customersList);
      if (customersListState === null)
        dispatch(setCustomersListAction(getCustomers()));
      else setCustomersList(customersListState);
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
        buttonTitle={"Customers"}
        gridData={customersList || []}
      />
      <BigModalDialog
        modalTitle={"Add Customer"}
        showModal={showModal}
        closeModal={closeModal}
        submitModal={submitModal}
        modalBody={CustomerForm}
        width={600}
      />
    </>
  );
};
export default Customers;
