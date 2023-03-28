import React, { useState, useEffect } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import PurchaseForm from "../../components/Forms/purchaseForm";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../users-dashboard/service";
import { setProductsListAction } from "../../store/reducers/organization-user.state";

const Stock = () => {
  const dispatch = useDispatch();
  const productsListState = useSelector(
    (state) => state?.organizationUserState?.productsList
  );
  const [showModal, setShowModal] = useState(false);
  const [productsList, setProductsList] = useState(null);
  // const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(
    () => {
      console.log(productsList);
      if (productsListState === null)
        dispatch(setProductsListAction(getProducts()));
      else setProductsList(productsListState);
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
        buttonTitle={"Products"}
        gridData={productsList || []}
      />
      <BigModalDialog
        modalTitle={"Add Stock For Product"}
        showModal={showModal}
        closeModal={closeModal}
        submitModal={submitModal}
        modalBody={PurchaseForm}
        width={400}
      />
    </>
  );
};
export default Stock;
