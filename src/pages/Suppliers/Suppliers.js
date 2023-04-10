import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import SupplierForm from "../../components/Forms/supplierForm";
import { useDispatch, useSelector } from "react-redux";
import { setSuppliersListAction } from "../../store/reducers/organization-user.state";
import OrganizationUserApi from "../../services/organization-user-api";

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
      if (suppliersListState === null) getSupplierList();
      else setSuppliersList(suppliersListState);
    }, // eslint-disable-next-line
    []
  );

  const closeModal = () => {
    setShowModal(false);
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };

  const getSupplierList = async () => {
    const response = await OrganizationUserApi.getSuppliers();
    setSuppliersList(response.data);
    dispatch(setSuppliersListAction({ suppliersList: response.data }));
  };

  const addSupplier = async (supplierPayload) => {
    await OrganizationUserApi.addSupplier(supplierPayload);
    closeModal();
    getSupplierList();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      editable: true,
    },
    {
      title: "Mobile No",
      dataIndex: "phoneNumber",
      width: "20%",
      editable: true,
    },
    {
      title: "Gst Number",
      dataIndex: "gstNumber",
      width: "20%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "20%",
      // responsive: ["md"],
      editable: true,
    },

    // {
    //   title: "Operation",
    //   dataIndex: "operation",
    //   width: "10%",
    //   render: (_, productStock) => {
    //     return (
    //       <>
    //         <Tooltip title="Edit Stock">
    //           <ModeEditIcon
    //             // onClick={() => getSelectedOrganizationForEdit(productStock)}
    //             color="primary"
    //             style={{ cursor: "pointer" }}
    //             sx={{ color: blue[500] }}
    //           />
    //         </Tooltip>
    //         <Tooltip title="Delete Organization">
    //           <DeleteIcon
    //             // onClick={() => deleteOrganization(productStock)}
    //             style={{
    //               marginLeft: 20,
    //               cursor: "pointer",
    //             }}
    //             sx={{ color: red[400] }}
    //           />
    //         </Tooltip>
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <GridPreview
        showButton={true}
        onAddButtonClick={onAddButtonClick}
        buttonTitle={"Suppliers"}
        gridData={suppliersList || []}
        columnsList={columns}
      />
      <BigModalDialog
        modalTitle={"Add Suppliers"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addSupplier}
        modalBody={SupplierForm}
        width={350}
      />
    </>
  );
};
export default Suppliers;
