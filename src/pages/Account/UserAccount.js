import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import { useDispatch, useSelector } from "react-redux";
import {
  setBanksListAction,
  setUserAccountListAction,
} from "../../store/reducers/organization-user.state";
import OrganizationUserApi from "../../services/organization-user-api";
import UserAccountForm from "../../components/Forms/userAccountForm";
import { maskAccountNumber } from "../../utils/common-utils";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { red, blue } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/Edit";

const UserAccount = () => {
  const dispatch = useDispatch();
  const userAccountsListState = useSelector(
    (state) => state?.organizationUserState?.userAccountList
  );
  const bankListState = useSelector(
    (state) => state?.organizationUserState?.bankList
  );
  const [showModal, setShowModal] = useState(false);
  const [userAccountList, setUserAccountList] = useState(null);

  useEffect(
    () => {
      console.log(userAccountList);
      if (userAccountsListState === null) getUserAccountsList();
      else setUserAccountList(userAccountsListState);
      if (bankListState === null) getBanksList();
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
    setUserAccountList(response.data);
    dispatch(setUserAccountListAction({ userAccountList: response.data }));
  };

  const getBanksList = async () => {
    const response = await OrganizationUserApi.getBankList();
    dispatch(setBanksListAction({ bankList: response.data }));
  };

  const addUserAccount = async (accountPayload) => {
    await OrganizationUserApi.addAccount(accountPayload);
    closeModal();
    getUserAccountsList();
  };

  const columns = [
    {
      title: "Stort Name",
      dataIndex: "alias",
      width: "10%",
      editable: true,
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      width: "10%",
      editable: true,
    },
    {
      title: "Account Type",
      dataIndex: "type",
      width: "10%",
      editable: true,
    },
    {
      title: "Opening Balance",
      dataIndex: "openingBalance",
      width: "10%",
      editable: true,
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      width: "15%",
      editable: true,
      render: (_, account) => {
        return <span> {maskAccountNumber(account.accountNumber)}</span>;
      },
    },

    {
      title: "Operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, account) => {
        return (
          <>
            <Tooltip title="Edit Account">
              <ModeEditIcon
                // onClick={() => getSelectedOrganizationForEdit(productStock)}
                color="primary"
                style={{ cursor: "pointer" }}
                sx={{ color: blue[500] }}
              />
            </Tooltip>
            <Tooltip title="Delete Account">
              <DeleteIcon
                // onClick={() => deleteOrganization(productStock)}
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
        buttonTitle={"User Accounts"}
        gridData={userAccountList || []}
        columnsList={columns}
      />
      <BigModalDialog
        modalTitle={"Add Account"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addUserAccount}
        modalBody={UserAccountForm}
        width={450}
      />
    </>
  );
};
export default UserAccount;
