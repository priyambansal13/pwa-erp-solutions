import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenseCategoryListAction,
  setPaymentListAction,
  setSuppliersListAction,
  setUserAccountListAction,
} from "../../store/reducers/organization-user.state";
import OrganizationUserApi from "../../services/organization-user-api";
// import { maskAccountNumber } from "../../utils/common-utils";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { red, blue } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/Edit";
import PaymentForm from "../../components/Forms/paymentForm";
import { getFormattedPaymentList } from "../../utils/user-utils";

const Payment = () => {
  const dispatch = useDispatch();
  const userAccountListState = useSelector(
    (state) => state?.organizationUserState?.userAccountList
  );
  const supplierListState = useSelector(
    (state) => state?.organizationUserState?.suppliersList
  );
  const paymentsListState = useSelector(
    (state) => state?.organizationUserState?.paymentList
  );
  const [showModal, setShowModal] = useState(false);
  const [paymentList, setPaymentList] = useState(null);

  useEffect(
    () => {
      console.log(paymentsListState);
      if (paymentsListState === null) getPaymentsList();
      else setPaymentList(paymentsListState);
      if (userAccountListState === null) getUserAccountsList();
      if (supplierListState === null) getSuppliersList();
      getExpenseCategoryList();
    }, // eslint-disable-next-line
    []
  );

  const closeModal = () => {
    setShowModal(false);
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };

  const getUserAccountsList = async () => {
    const response = await OrganizationUserApi.getUserAccounts();
    dispatch(setUserAccountListAction({ userAccountList: response.data }));
  };

  const getPaymentsList = async () => {
    const response = await OrganizationUserApi.getAllPayments();

    const formattedResult = getFormattedPaymentList(response.data);
    console.log(formattedResult);
    setPaymentList(formattedResult);
    dispatch(setPaymentListAction({ paymentList: formattedResult }));
  };

  const getSuppliersList = async () => {
    const response = await OrganizationUserApi.getSuppliers();

    dispatch(setSuppliersListAction({ suppliersList: response.data }));
  };

  const getExpenseCategoryList = async () => {
    const response = await OrganizationUserApi.getExpenseCategory();

    dispatch(
      setExpenseCategoryListAction({ expenseCategoryList: response.data })
    );
  };

  const addPayment = async (paymentPayload) => {
    await OrganizationUserApi.addPayment(paymentPayload);
    closeModal();
    getPaymentsList();
  };

  const deletePayment = async (payment) => {
    const response = await OrganizationUserApi.deletePayment(payment);
    if (response.status === 200) {
      closeModal();
      getPaymentsList();
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "10%",
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "10%",
      editable: true,
    },

    {
      title: "Payment Type",
      dataIndex: "type",
      width: "10%",
      editable: true,
    },
    {
      title: "Payment Mode",
      dataIndex: "mode",
      width: "10%",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "10%",
      editable: true,
    },

    //   {
    //     title: "Account Number",
    //     dataIndex: "accountNumber",
    //     width: "15%",
    //     editable: true,
    //     render: (_, account) => {
    //       return <span> {maskAccountNumber(account.accountNumber)}</span>;
    //     },
    //   },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, payment) => {
        return (
          <>
            <Tooltip title="Edit Payment">
              <ModeEditIcon
                // onClick={() => getSelectedOrganizationForEdit(productStock)}
                color="primary"
                style={{ cursor: "pointer" }}
                sx={{ color: blue[500] }}
              />
            </Tooltip>
            <Tooltip title="Delete Payment">
              <DeleteIcon
                onClick={() => deletePayment(payment)}
                style={{
                  marginLeft: 20,
                  cursor: "pointer",
                }}
                sx={{ color: red[400] }}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <GridPreview
        showButton={true}
        onAddButtonClick={onAddButtonClick}
        buttonTitle={"Payments"}
        gridData={paymentList || []}
        columnsList={columns}
      />
      <BigModalDialog
        modalTitle={"Add Payment"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addPayment}
        modalBody={PaymentForm}
        width={450}
      />
    </>
  );
};
export default Payment;
