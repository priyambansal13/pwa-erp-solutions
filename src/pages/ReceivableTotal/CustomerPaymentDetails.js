import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useSelector } from "react-redux";
import GridPreview from "../../components/previewgrids/grid";
import OrganizationUserApi from "../../services/organization-user-api";
import { useParams } from "react-router-dom";
import { getFormattedReceiptList } from "../../utils/user-utils";
import "./receivable.scss";
import { DatePicker } from "antd";
import moment from "moment";

const CustomerPaymentDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [detailsList, setDetailsList] = useState([]);
  // const payableListState = useSelector(
  //   (state) => state?.organizationUserState?.payableList
  // );

  const customerListState = useSelector(
    (state) => state?.organizationUserState?.customersList
  );
  const [customerDetail, setCustomerDetail] = useState(null);
  // const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(
    () => {
      console.log(params);
      if (params.id) {
        const customer = customerListState?.find(
          (customer) => customer.id === params.id
        );
        console.log("Customer", customer);
        setCustomerDetail(customer);
        getCustomerPaymentList(null, null);
      }
    },
    // eslint-disable-next-line
    []
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  const getCustomerPaymentList = async (from, to) => {
    const response = await OrganizationUserApi.getAllReceiptsForCustomer({
      id: params.id,
      from: from,
      to: to,
    });
    const formattedDetailsList = getFormattedReceiptList(response.data);
    setDetailsList(formattedDetailsList);
  };

  const disabledDate = (current) => {
    // Disable dates after today
    return current && current > moment().endOf("day");
  };

  const handleDateChange = (e) => {
    const timestamps = [];
    if (e.length === 2) {
      // eslint-disable-next-line
      e?.map((date) => {
        timestamps.push(new Date(date.$d).getTime());
      });
    }
    console.log(timestamps, "timestamps");
    if (timestamps.length === 2) {
      getCustomerPaymentList(timestamps[0], timestamps[1]);
    }
  };

  const columns = [
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   width: "10%",
    //   editable: true,
    // },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "10%",
      editable: true,
    },

    // {
    //   title: "Payment Type",
    //   dataIndex: "type",
    //   width: "10%",
    //   editable: true,
    // },
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
    // {
    //   title: "Operation",
    //   dataIndex: "operation",
    //   width: "10%",
    //   render: (_, payment) => {
    //     return (
    //       <>
    //         <Tooltip title="Edit Payment">
    //           <ModeEditIcon
    //             // onClick={() => getSelectedOrganizationForEdit(productStock)}
    //             color="primary"
    //             style={{ cursor: "pointer" }}
    //             sx={{ color: blue[500] }}
    //           />
    //         </Tooltip>
    //         <Tooltip title="Delete Payment">
    //           <DeleteIcon
    //             onClick={() => deletePayment(payment)}
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
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} sx={{ mr: 2.25 }}>
              <IconButton
                aria-label="arrowBack"
                onClick={handleGoBack}
                className="mr-2"
              >
                <ArrowBackRoundedIcon />
              </IconButton>
              <Typography variant="h5" className="mt-1">
                Back
              </Typography>
            </Stack>
            <Stack>
              <DatePicker.RangePicker
                placement={"bottomRight"}
                dropdownClassName="responsive-range-picker"
                picker="date"
                onChange={handleDateChange}
                format="YYYY-MM-DD"
                placeholder={["Start Date", "End Date"]}
                style={{ width: "100%" }}
                getPopupContainer={(trigger) => trigger.parentNode}
                disabledDate={disabledDate}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <GridPreview
            buttonTitle={`${customerDetail?.name} Payment Details`}
            // onAddButtonClick={onAddButtonClick}

            gridData={detailsList || []}
            columnsList={columns}
            showButton={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomerPaymentDetails;
