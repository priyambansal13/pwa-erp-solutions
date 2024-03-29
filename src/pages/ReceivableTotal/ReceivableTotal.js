import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useDispatch, useSelector } from "react-redux";
import GridPreview from "../../components/previewgrids/grid";
import OrganizationUserApi from "../../services/organization-user-api";
import { setReceivableListAction } from "../../store/reducers/organization-user.state";
const ReceivableTotal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const receivableListState = useSelector(
    (state) => state?.organizationUserState?.receivableList
  );

  const [receivableList, setReceivableList] = useState(null);

  useEffect(
    () => {
      console.log(receivableListState);
      if (receivableListState === null) getReceivableList();
      else setReceivableList(receivableListState);
    }, // eslint-disable-next-line
    []
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  const openViewDetailPage = (customer) => {
    navigate(`/dashboard/receivableTotal/${customer?.partyId}`);
  };

  const getReceivableList = async () => {
    const response = await OrganizationUserApi.getReceiptsReceivable();
    setReceivableList(response.data);
    dispatch(setReceivableListAction({ receivableList: response.data }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "partyName",
      width: "20%",
      editable: true,
      render: (_, customer) => (
        <span
          style={{ color: "#007bff" }}
          onClick={() => {
            openViewDetailPage(customer);
          }}
        >
          <b>{customer.partyName}</b>
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
            buttonTitle={"Receivable List"}
            // onAddButtonClick={onAddButtonClick}

            gridData={receivableList || []}
            columnsList={columns}
            showButton={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ReceivableTotal;
