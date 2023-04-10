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
import PurchaseProductItemForm from "./purchaseProductItemForm";

const PurchaseForm = (props) => {
  const [formState, setFormState] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItemEdit, setSelectedItemEdit] = useState(null);
  const { Panel } = Collapse;

  useEffect(() => {
    if (props.viewType === "View") {
      setFormState(props.selectedDataForView);
    }
  }, [props]);

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const suppliersListState = useSelector(
    (state) => state?.organizationUserState?.suppliersList
  );

  const getSupplierMenuItem = () => {
    return suppliersListState?.length > 0 ? (
      suppliersListState.map((supplier) => {
        return (
          <MenuItem key={supplier.id} value={supplier.id}>
            {supplier.name}
          </MenuItem>
        );
      })
    ) : (
      <MenuItem key={1} value="--">
        NONE
      </MenuItem>
    );
  };
  const handleChange = (e) => {
    if (e.target.name === "supplier") {
      let selectedCustomer = suppliersListState.find(
        (supplier) => supplier.id === e.target.value
      );
      setFormState({
        ...formState,
        supplierId: selectedCustomer.id,
        discount: 0,
        tax: 0,
        totalAmount: 0,
        salePurchaseItems: [],
      });
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
    setFormState(null);
  };

  const onAddItems = (itemPayload) => {
    const salesPayload = cloneDeep(formState);
    let totalAmount = 0;
    let tax = 0;

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
                  disabled={props?.viewType === "View"}
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
                          formState !== null
                            ? formatDateString(formState?.timestamp)
                            : // formState.timestamp
                              null
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
                  name="supplier"
                  required
                  value={formState !== null ? formState?.supplierId : ""}
                >
                  {getSupplierMenuItem()}
                </TextField>
              </FormControl>
            </Stack>
          </Grid>
          {formState?.supplierId !== undefined ? (
            <>
              <Grid item xs={12}>
                <Collapse
                  bordered={false}
                  collapsible={
                    formState?.supplierId === undefined ? "disabled" : ""
                  }
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
                            formState?.supplierId === undefined ||
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
                          <List.Item key={item.product.id}>
                            <List.Item.Meta
                              title={
                                <b
                                  style={{
                                    color: "black",
                                    fontWeight: 800,
                                  }}
                                >
                                  {item.product.name}
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
                                            item.product.taxPercent) /
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
                                      {item.product.taxPercent}% ={" "}
                                      {(item.quantity *
                                        item.price *
                                        item.product.taxPercent) /
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
                    Rs {formState?.totalAmount - formState?.tax}
                  </Typography>
                  <Typography variant="h6">
                    <span>Tax :</span> Rs {formState?.tax}
                  </Typography>
                  <Typography variant="h5">
                    <span>Total Amount : </span>
                    Rs {formState?.totalAmount}
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
        modalBody={PurchaseProductItemForm}
        parentComponentData={formState}
        selectedDataForEdit={selectedItemEdit}
        width={400}
      />
    </>
  );
};
export default PurchaseForm;
