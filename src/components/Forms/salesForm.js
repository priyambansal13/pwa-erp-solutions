import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  Box,
} from "@mui/material";
import { Badge, Button, Space } from "antd";
import isEmpty from "lodash/isEmpty";
import "./salesForm.scss";

import { Typography } from "@mui/material";
import BigModalDialog from "../shared/Modal-Dialog/BigModalDialog";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { List } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
import SaleProductItemForm from "./saleProductItemForm";
import { checkNullValues } from "../../utils/common-utils";
import CustomerForm from "./customerForm";

import OrganizationUserApi from "../../services/organization-user-api";

const SalesForm = (props) => {
  const DEFAULT_SALES_STATE = {
    timestamp: null,
    invoiceNumber: null,
    salePurchaseItems: null,
    discount: null,
    tax: null,
    totalAmount: null,
    customerId: null,
  };
  const [formState, setFormState] = useState(DEFAULT_SALES_STATE);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItemEdit, setSelectedItemEdit] = useState(null);
  const { Panel } = Collapse;

  useEffect(
    () => {
      if (props.viewType === "View") {
        setFormState(props.selectedDataForView);
      }
      if (
        props.selectedDataForEdit === null &&
        props.selectedDataForView === null
      ) {
        getSaleInvoiceNumber();
      }
    },
    // eslint-disable-next-line
    [props]
  );

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const customersListState = useSelector(
    (state) => state?.organizationUserState?.customersList
  );

  // const filterOptions = createFilterOptions({
  //   matchFrom: "any",
  //   stringify: (option) => option,
  // });
  const getCustomerMenuItem = () => {
    const customerListMenu =
      customersListState?.length > 0 ? (
        customersListState.map((customer) => {
          return (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          );
        })
      ) : (
        <MenuItem key={1} value="--">
          NONE
        </MenuItem>
      );

    customerListMenu !== null &&
      customerListMenu.unshift(
        <MenuItem key={1} value="add">
          <em>
            <b>Add Customer</b>
          </em>
        </MenuItem>
      );

    return customerListMenu;
  };

  const getSaleInvoiceNumber = async () => {
    const response = await OrganizationUserApi.getNewSaleInvoiceNumber();
    setFormState({ ...formState, invoiceNumber: response.data });
    console.log(response);
    // const stockData = formatStockData(response.data);
  };

  const handleChange = (e) => {
    if (e.target.name === "customer") {
      if (e.target.value === "add") {
        setShowAddModal(true);
      } else {
        let selectedCustomer = customersListState.find(
          (customer) => customer.id === e.target.value
        );
        setFormState({
          ...formState,
          customerId: selectedCustomer.id,
          discount: 0,
          tax: 0,
          totalAmount: 0,
          salePurchaseItems: [],
        });
      }
    } else setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setSelectedItemEdit(null);
  };

  const onAddButtonClick = () => {
    setShowAddModal(true);
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const resetFormState = () => {
    setFormState(DEFAULT_SALES_STATE);
  };

  const onAddItems = (itemPayload) => {
    const salesPayload = cloneDeep(formState);
    let totalAmount = 0;
    let tax = 0;
    if (salesPayload.salePurchaseItems === null) {
      salesPayload.salePurchaseItems = [];
    }
    salesPayload.salePurchaseItems.push(itemPayload);
    // eslint-disable-next-line
    salesPayload.salePurchaseItems.map((item) => {
      totalAmount += item.itemTotalAmount;
      tax += item.taxAmount;
    });
    setFormState({ ...salesPayload, totalAmount: totalAmount, tax: tax });
    closeAddModal();
  };

  const onUpdateItem = (updatedItem) => {
    const salesPayload = cloneDeep(formState);
    let totalAmount = 0;
    let tax = 0;

    const itemIndex = salesPayload.salePurchaseItems.findIndex(
      (item) => item.product.stockId === updatedItem.product.stockId
    );
    if (updatedItem.quantity === 0) {
      salesPayload.salePurchaseItems.splice(itemIndex, 1);
    } else {
      salesPayload.salePurchaseItems[itemIndex] = updatedItem;
    }
    // eslint-disable-next-line
    salesPayload.salePurchaseItems.map((item) => {
      totalAmount += item.itemTotalAmount;
      tax += item.taxAmount;
    });

    setFormState({ ...salesPayload, totalAmount: totalAmount, tax: tax });
    setSelectedItemEdit(null);
    closeAddModal();
  };

  const handleChangeDate = (date) => {
    setFormState({ ...formState, timestamp: new Date(date.$d).getTime() });
  };

  const openEditModal = (item) => {
    if (props?.viewType !== "View") {
      setSelectedItemEdit(item);
      setShowAddModal(true);
    }
  };

  const formatDateString = (dateString) => {
    console.log(dateString);
    const dateObj = dayjs(dateString);

    // Format the date object in a way that the MUI DateTimePicker can understand
    const formattedDate = dateObj.format("YYYY-MM-DDTHH:mm:ss");
    console.log(formattedDate);
    return dayjs(formattedDate);
  };
  return (
    <>
      <form style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row" justifyContent="space-between">
              <FormControl sx={{ width: "35%" }} className="mt-2">
                <TextField
                  required
                  id="outlined-required"
                  label="Invoice No."
                  name="invoiceNumber"
                  InputLabelProps={{ shrink: true }}
                  // disabled={props?.viewType === "View"}
                  disabled
                  InputProps={{
                    readOnly: false,
                  }}
                  error={false}
                  onChange={handleChange}
                  value={formState !== null ? formState.invoiceNumber : ""}
                />
              </FormControl>
              <FormControl sx={{ width: "65%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DemoItem>
                      <DateTimePicker
                        label="Date"
                        name="timestamp"
                        disabled={props?.viewType === "View"}
                        value={
                          formState.timestamp !== null
                            ? formatDateString(formState?.timestamp)
                            : null
                        }
                        onChange={(newValue) => handleChangeDate(newValue)}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              spacing={1}
              direction="row"
              justifyContent="space-between"
              className="mt-0"
            >
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  select
                  label="Customer"
                  disabled={props?.viewType === "View"}
                  name="customer"
                  required
                  value={formState !== null ? formState?.customerId : ""}
                >
                  {getCustomerMenuItem()}
                </TextField>
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={getCustomerMenuItem()}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Movie" />
                  )}
                  InputProps={{
                    endAdornment: (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {/* {options.indexOf(inputValue.trim()) === -1 && ( 
                        <span
                          style={{ cursor: "pointer", color: "#1976d2" }}
                          // onClick={handleAddCustomer}
                        >
                          Add Customer
                        </span>
                      </div>
                    ),
                  }}
                /> */}
                {/* <SearchTextField /> */}
              </FormControl>
            </Stack>
          </Grid>
          {formState?.customerId !== null ? (
            <>
              <Grid item xs={12}>
                <Collapse
                  bordered={false}
                  collapsible={formState?.customerId === null ? "disabled" : ""}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  style={{
                    background: token.colorBgContainer,
                  }}
                >
                  <Panel
                    header={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          ITEMS ({formState?.salePurchaseItems?.length || 0})
                        </span>
                        <Button
                          type="link"
                          style={{
                            color: "purple",
                            fontWeight: "500",
                            marginTop: "-7px",
                          }}
                          disabled={
                            formState?.customerId === null ||
                            props?.viewType === "View"
                          }
                          onClick={() => {
                            onAddButtonClick();
                          }}
                        >
                          + Items
                        </Button>{" "}
                      </div>
                    }
                    key="1"
                    style={panelStyle}
                  >
                    <List
                      dataSource={formState?.salePurchaseItems}
                      className={"mr-4 mt-0 pt-0"}
                      renderItem={(item) =>
                        item.quantity !== 0 && (
                          <List.Item key={item?.product?.id}>
                            <List.Item.Meta
                              title={
                                <b
                                  style={{
                                    color: "black",
                                    fontWeight: 800,
                                  }}
                                >
                                  {item?.product?.name}
                                </b>
                              }
                              description={
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginRight: "-20px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    }}
                                  >
                                    <p
                                      style={{
                                        marginTop: "-5px",
                                        fontSize: "12px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <span>Qty x Price</span>
                                      {item.quantity} x {item.price}
                                      <b
                                        style={{
                                          marginTop: "-15px",
                                          color: "black",
                                          fontWeight: 800,
                                        }}
                                      >
                                        Rs.
                                        {item.quantity * item.price +
                                          (item.quantity *
                                            item.price *
                                            item?.product?.taxPercent) /
                                            100}
                                      </b>
                                    </p>
                                    <p
                                      style={{
                                        marginTop: "-15px",
                                        fontSize: "12px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <span style={{ marginRight: "40px" }}>
                                        Tax
                                      </span>
                                      {item?.product?.taxPercent}% ={" "}
                                      {(item.quantity *
                                        item.price *
                                        item?.product?.taxPercent) /
                                        100}
                                      <Badge
                                        count={"Edit"}
                                        style={{
                                          backgroundColor: "rgb(246 228 228)",
                                          color: "purple",
                                          marginTop: "-10px",
                                          visibility:
                                            props?.viewType === "View"
                                              ? "hidden"
                                              : "",
                                        }}
                                        title={"Edit Item"}
                                        onClick={() => {
                                          openEditModal(item);
                                        }}
                                      ></Badge>
                                    </p>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      marginTop: "-25px",
                                    }}
                                  ></div>
                                </div>
                              }
                            />
                          </List.Item>
                        )
                      }
                    />
                  </Panel>
                </Collapse>
              </Grid>

              <Grid item xs={12} className={"sales-Item-Box-amount"}>
                <Stack spacing={1} alignItems="flex-end" className="mr-4 mb-2">
                  <Typography variant="h6" component="h4">
                    <span>SubTotal : </span>
                    Rs{" "}
                    {formState?.totalAmount?.toFixed(2) -
                      formState?.tax?.toFixed(2)}
                  </Typography>
                  <Typography variant="h6">
                    <span>Tax :</span> Rs {formState?.tax?.toFixed(2)}
                  </Typography>
                  <Typography variant="h5">
                    <span>Total Amount : </span>
                    Rs {formState?.totalAmount?.toFixed(2)}
                  </Typography>
                </Stack>
              </Grid>
            </>
          ) : (
            ""
          )}

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Space wrap>
                <Button
                  type="primary"
                  onClick={() => {
                    resetFormState();
                    props.closeModal();
                  }}
                >
                  Cancel
                </Button>

                {props?.viewType !== "View" &&
                  (isEmpty(props.selectedDataForEdit) ? (
                    <Button
                      onClick={() => {
                        props.submitData(formState);
                        resetFormState(null);
                      }}
                      ghost
                      type="primary"
                      disabled={checkNullValues(formState, [])}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        // props.updateData(formState);
                      }}
                      ghost
                      type="primary"
                    >
                      Update
                    </Button>
                  ))}
              </Space>
            </Box>
          </Grid>
        </Grid>
      </form>
      <BigModalDialog
        modalTitle={"Add Item"}
        showModal={showAddModal}
        closeModal={closeAddModal}
        submitData={onAddItems}
        updateData={onUpdateItem}
        modalBody={SaleProductItemForm}
        parentComponentData={formState}
        selectedDataForEdit={selectedItemEdit}
        width={400}
      />
      <BigModalDialog
        modalTitle={"Add Customer"}
        showModal={false}
        closeModal={closeAddModal}
        submitData={onAddItems}
        updateData={onUpdateItem}
        modalBody={CustomerForm}
        parentComponentData={formState}
        selectedDataForEdit={selectedItemEdit}
        width={400}
      />
    </>
  );
};
export default SalesForm;
