import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import RoleForm from "../../components/Forms/roleForm";
import api from "../../services/api";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { blue, red } from "@mui/material/colors";
import { setRolesListAction } from "../../store/reducers/admin-state";
import { useDispatch } from "react-redux";

const Roles = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    getRolesList();
  }, []);

  useEffect(
    () => {
      console.log("rolesList", rolesList);
      dispatch(setRolesListAction({ rolesList }));
    }, // eslint-disable-next-line
    [rolesList]
  );

  const getRolesList = async () => {
    const response = await api.getRoles();
    setRolesList(response.data);
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
    const response = await api.addRoles(rolePayload);
    if (response.status === 200) {
      closeModal();
      const resp = await api.getRoles();
      setRolesList(resp.data);
    }
  };

  const deleteRole = async (rolePayload) => {
    const response = await api.deleteRole(rolePayload);
    if (response.status === 200) {
      closeModal();
      const resp = await api.getRoles();
      setRolesList(resp.data);
    }
  };

  const updateRole = async (rolePayload) => {
    const response = await api.updateRoles(rolePayload);
    if (response.status === 200) {
      closeModal();
      const resp = await api.getRoles();
      setRolesList(resp.data);
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
