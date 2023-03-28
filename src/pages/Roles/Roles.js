import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import RoleForm from "../../components/Forms/roleForm";
import AdminUserApi from "../../services/admin-user-api";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { blue, red } from "@mui/material/colors";
import { setRolesListAction } from "../../store/reducers/admin-user.state";
import { useDispatch, useSelector } from "react-redux";

const Roles = () => {
  const dispatch = useDispatch();
  const rolesListState = useSelector((state) => state?.adminState?.rolesList);
  const [showModal, setShowModal] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(
    () => {
      if (rolesListState === null) getRolesList();
      else {
        setRolesList(rolesListState);
      }
    }, // eslint-disable-next-line
    []
  );

  const getRolesList = async () => {
    const response = await AdminUserApi.getRoles();
    setRolesList(response.data);
    dispatch(setRolesListAction({ rolesList: response.data }));
  };

  const getSelectedRoleForEdit = (role) => {
    console.log("role", role);
    setSelectedRole(role);
    onAddButtonClick();
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRole(null);
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };

  const addRole = async (rolePayload) => {
    const response = await AdminUserApi.addRoles(rolePayload);
    if (response.status === 200) {
      closeModal();
      getRolesList();
    }
  };

  const deleteRole = async (rolePayload) => {
    const response = await AdminUserApi.deleteRole(rolePayload);
    if (response.status === 200) {
      closeModal();
      getRolesList();
    }
  };

  const updateRole = async (rolePayload) => {
    const response = await AdminUserApi.updateRoles(rolePayload);
    if (response.status === 200) {
      closeModal();
      getRolesList();
    }
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "50%",
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
              onClick={() => getSelectedRoleForEdit(role)}
              color="primary"
              style={{}}
              sx={{ color: blue[500] }}
            />

            <DeleteIcon
              onClick={() => deleteRole(role)}
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
      {rolesList.length > 0 && (
        <GridPreview
          showButton={true}
          onAddButtonClick={onAddButtonClick}
          buttonTitle={"Roles"}
          gridData={rolesList}
          columnsList={columns}
        />
      )}
      <BigModalDialog
        modalTitle={"Add Role"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addRole}
        updateData={updateRole}
        modalBody={RoleForm}
        width={400}
        selectedDataForEdit={selectedRole}
      />
    </>
  );
};
export default Roles;
