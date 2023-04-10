import React, { useEffect, useState } from "react";
import BigModalDialog from "../../components/shared/Modal-Dialog/BigModalDialog";
import GridPreview from "../../components/previewgrids/grid";
import CustomerForm from "../../components/Forms/customerForm";
import { useDispatch, useSelector } from "react-redux";
import { setCustomersListAction } from "../../store/reducers/organization-user.state";
import OrganizationUserApi from "../../services/organization-user-api";

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
      if (customersListState === null) getCustomerList();
      else setCustomersList(customersListState);
    }, // eslint-disable-next-line
    []
  );

  const closeModal = () => {
    setShowModal(false);
  };

  const onAddButtonClick = () => {
    setShowModal(true);
  };

  const getCustomerList = async () => {
    const response = await OrganizationUserApi.getCustomers();
    setCustomersList(response.data);
    dispatch(setCustomersListAction({ customersList: response.data }));
  };

  const addCustomer = async (customerPayload) => {
    await OrganizationUserApi.addCustomer(customerPayload);
    closeModal();
    getCustomerList();
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
      editable: true,
      responsive: ["md"],
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
        buttonTitle={"Customers"}
        gridData={customersList || []}
        columnsList={columns}
      />
      <BigModalDialog
        modalTitle={"Add Customer"}
        showModal={showModal}
        closeModal={closeModal}
        submitData={addCustomer}
        modalBody={CustomerForm}
        width={350}
      />
    </>
  );
};
export default Customers;
