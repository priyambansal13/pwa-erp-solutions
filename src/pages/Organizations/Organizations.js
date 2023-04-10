import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import OrganizationForm from "../../components/Forms/organizationForm";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { blue, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { setOrganizationListAction } from "../../store/reducers/admin-user.state";
import AdminUserApi from "../../services/admin-user-api";
import { Tooltip } from "@mui/material";

const Organizations = () => {
  const dispatch = useDispatch();
  const organizationListState = useSelector(
    (state) => state?.adminState?.organizationList
  );
  const [showModal, setShowModal] = useState(false);
  const [organizationList, setOrganizationList] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(
    () => {
      if (organizationListState === null) getOrganizationList();
      else setOrganizationList(organizationListState);
    }, // eslint-disable-next-line
    []
  );

  const closeModal = () => {
    setSelectedOrganization(null);
    setShowModal(false);
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };

  const getOrganizationList = async () => {
    const response = await AdminUserApi.getOrganizations();
    setOrganizationList(response.data);
    dispatch(setOrganizationListAction({ organizationList: response.data }));
  };

  const addOrganization = async (organizationPayload) => {
    const response = await AdminUserApi.addOrganization(organizationPayload);
    if (response.status === 200) {
      closeModal();
      getOrganizationList();
    }
  };

  const deleteOrganization = async (organizationPayload) => {
    const response = await AdminUserApi.deleteOrganization(organizationPayload);
    if (response.status === 200) {
      closeModal();
      getOrganizationList();
    }
  };

  const getSelectedOrganizationForEdit = (organization) => {
    console.log("organization", organization);
    setSelectedOrganization(organization);
    onAddButtonClick();
  };

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "name",
      width: "10%",
      editable: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: "10%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      editable: true,
    },
    {
      title: "GST Number",
      dataIndex: "gstNumber",
      width: "15%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "25%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, organization) => {
        return (
          <>
            <Tooltip title="Edit Organization">
              <ModeEditIcon
                onClick={() => getSelectedOrganizationForEdit(organization)}
                color="primary"
                style={{ cursor: "pointer" }}
                sx={{ color: blue[500] }}
              />
            </Tooltip>
            <Tooltip title="Delete Organization">
              <DeleteIcon
                onClick={() => deleteOrganization(organization)}
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
        buttonTitle={"Organizations"}
        gridData={organizationList}
        columnsList={columns}
      />
      <BigModalDialog
        modalTitle={"Add Organization"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addOrganization}
        updateData={() => {}}
        modalBody={OrganizationForm}
        width={500}
        selectedDataForEdit={selectedOrganization}
      />
    </>
  );
};
export default Organizations;
