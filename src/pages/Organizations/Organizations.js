import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import OrganizationForm from "../../components/Forms/organizationForm";
import api from "../../services/api";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { blue, red } from "@mui/material/colors";

const Organizations = () => {
  const [showModal, setShowModal] = useState(false);
  const [organizationList, setOrganizationList] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(() => {
    getOrganizationList();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };

  const getOrganizationList = async () => {
    const response = await api.getOrganizations();
    setOrganizationList(response.data);
  };

  const addOrganization = async (organizationPayload) => {
    const response = await api.addOrganization(organizationPayload);
    if (response.status === 200) {
      closeModal();
      const resp = await api.getOrganizations();
      setOrganizationList(resp.data);
    }
  };

  const deleteOrganization = async (organizationPayload) => {
    const response = await api.deleteOrganization(organizationPayload);
    if (response.status === 200) {
      closeModal();
      const resp = await api.getOrganizations();
      setOrganizationList(resp.data);
    }
  };

  const getSelectedOrganizationForEdit = (role) => {
    console.log("role", role);
    setSelectedOrganization(role);
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
      render: (_, role) => {
        return (
          <>
            <ModeEditIcon
              onClick={() => getSelectedOrganizationForEdit(role)}
              color="primary"
              style={{}}
              sx={{ color: blue[500] }}
            />

            <DeleteIcon
              onClick={() => deleteOrganization(role)}
              style={{
                marginLeft: 15,
              }}
              sx={{ color: red[400] }}
            />
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
