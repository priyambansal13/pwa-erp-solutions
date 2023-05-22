import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useDispatch, useSelector } from "react-redux";
import GridPreview from "../../components/previewgrids/grid";
import { setPayableListAction } from "../../store/reducers/organization-user.state";
import OrganizationUserApi from "../../services/organization-user-api";
const PayableTotal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payableListState = useSelector(
    (state) => state?.organizationUserState?.payableList
  );
  const [payableList, setPayableList] = useState(null);

  useEffect(
    () => {
      console.log(payableListState);
      if (payableListState === null) getPayableList();
      else setPayableList(payableListState);
    }, // eslint-disable-next-line
    []
  );
  const handleGoBack = () => {
    navigate(-1);
  };

  const openViewDetailPage = (supplier) => {
    console.log("supplier", supplier);
    navigate(`/dashboard/payableTotal/${supplier?.partyId}`);
  };

  const getPayableList = async () => {
    const response = await OrganizationUserApi.getPaymentsPayable();
    setPayableList(response.data);
    dispatch(setPayableListAction({ payableList: response.data }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "partyName",
      width: "20%",
      editable: true,
      render: (_, supplier) => (
        <span
          style={{ color: "#007bff" }}
          onClick={() => {
            openViewDetailPage(supplier);
          }}
        >
          <b>{supplier.partyName}</b>
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "20%",
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
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Stack direction={"row"}>
            <IconButton
              aria-label="arrowBack"
              onClick={handleGoBack}
              className="mr-2"
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <Typography variant="h5" className="mt-1">
              Dashboard
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <GridPreview
            buttonTitle={"Payable List"}
            // onAddButtonClick={onAddButtonClick}

            gridData={payableList || []}
            columnsList={columns}
            showButton={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PayableTotal;
