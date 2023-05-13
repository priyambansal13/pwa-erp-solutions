import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomersListAction,
  setReceiptListAction,
  setUserAccountListAction,
} from "../../store/reducers/organization-user.state";
import OrganizationUserApi from "../../services/organization-user-api";

import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { red, blue } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/Edit";

import ReceiptForm from "../../components/Forms/receiptForm";
import { getFormattedReceiptList } from "../../utils/user-utils";

const Receipt = () => {
  const dispatch = useDispatch();
  const userAccountListState = useSelector(
    (state) => state?.organizationUserState?.userAccountList
  );
  const customerListState = useSelector(
    (state) => state?.organizationUserState?.customersList
  );
  const receiptsListState = useSelector(
    (state) => state?.organizationUserState?.receiptList
  );
  const [showModal, setShowModal] = useState(false);
  const [receiptsList, setReceiptsList] = useState(null);

  useEffect(
    () => {
      if (receiptsListState === null) getReceiptsList();
      else setReceiptsList(receiptsListState);
      if (userAccountListState === null) getUserAccountsList();
      if (customerListState === null) getCustomerList();
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

  const getReceiptsList = async () => {
    const response = await OrganizationUserApi.getAllReceipts();
    const formattedReceiptList = getFormattedReceiptList(response.data);
    console.log(formattedReceiptList);
    setReceiptsList(formattedReceiptList);
    dispatch(setReceiptListAction({ receiptList: formattedReceiptList }));
  };

  const getCustomerList = async () => {
    const response = await OrganizationUserApi.getCustomers();

    dispatch(setCustomersListAction({ customersList: response.data }));
  };

  const addReceipt = async (receiptPayload) => {
    await OrganizationUserApi.addReceipt(receiptPayload);
    closeModal();
    getReceiptsList();
  };

  const deleteReceipt = async (receipt) => {
    const response = await OrganizationUserApi.deleteReceipt(receipt);
    if (response.status === 200) {
      closeModal();
      getReceiptsList();
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
      render: (_, receipt) => {
        return (
          <>
            <Tooltip title="Edit Account">
              <ModeEditIcon
                // onClick={() => getSelectedOrganizationForEdit(receipt)}
                color="primary"
                style={{ cursor: "pointer" }}
                sx={{ color: blue[500] }}
              />
            </Tooltip>
            <Tooltip title="Delete Account">
              <DeleteIcon
                onClick={() => deleteReceipt(receipt)}
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
        buttonTitle={"Receipts"}
        gridData={receiptsList || []}
        columnsList={columns}
      />
      <BigModalDialog
        modalTitle={"Add Receipt"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addReceipt}
        modalBody={ReceiptForm}
        width={450}
      />
    </>
  );
};
export default Receipt;
