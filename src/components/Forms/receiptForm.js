import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import isEmpty from "lodash/isEmpty";
import { Button, Space } from "antd";
import { useSelector } from "react-redux";
import { checkNullValues } from "../../utils/common-utils";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

const ReceiptForm = (props) => {
  const DEFAULT_RECEIPT_STATE = {
    partyId: null,
    amount: null,
    date: null,
    mode: null,
    bankAccountId: null,
    note: null,
    type: "",
  };
  const userAccountListState = useSelector(
    (state) => state.organizationUserState.userAccountList
  );

  const customerListState = useSelector(
    (state) => state?.organizationUserState?.customersList
  );
  const [formState, setFormState] = useState(DEFAULT_RECEIPT_STATE);

  useEffect(() => {
    console.log("selectedDataForEdit", props.selectedDataForEdit);
    if (!isEmpty(props.selectedDataForEdit)) {
      setFormState(props.selectedDataForEdit);
    }
  }, [props]);

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const resetFormState = () => {
    setFormState(DEFAULT_RECEIPT_STATE);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const getCustomerMenuItem = () => {
    return customerListState?.length > 0 ? (
      customerListState.map((customer) => {
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
  };
  const formatDateString = (dateString) => {
    console.log(dateString);
    const dateObj = dayjs(dateString);

    // Format the date object in a way that the MUI DateTimePicker can understand
    const formattedDate = dateObj.format("YYYY-MM-DDTHH:mm:ss");
    console.log(formattedDate);
    return dayjs(formattedDate);
  };

  const handleChangeDate = (date) => {
    setFormState({ ...formState, date: new Date(date.$d).getTime() });
  };

  const getUserAccountListItem = () => {
    return userAccountListState?.length > 0 ? (
      userAccountListState.map((account) => {
        return (
          <MenuItem key={account.id} value={account.id}>
            <em>{account.alias}</em>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem key={1} value="">
        NONE
      </MenuItem>
    );
  };

  return (
    <>
      <form style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row" justifyContent="space-between">
              <FormControl sx={{ width: "50%" }} className="mt-2">
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  select
                  label="Customer"
                  disabled={props?.viewType === "View"}
                  name="partyId"
                  required
                  value={formState.partyId !== null ? formState?.partyId : ""}
                >
                  {getCustomerMenuItem()}
                </TextField>
              </FormControl>
              <FormControl sx={{ width: "50%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DemoItem>
                      <DateTimePicker
                        label="Date"
                        name="date"
                        disabled={props?.viewType === "View"}
                        value={
                          formState.date !== null
                            ? formatDateString(formState?.date)
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
            <Stack spacing={1}>
              <FormControl sx={{ width: "100%" }} className="mt-2">
                <TextField
                  id="outlined-multiline-static"
                  label="Amount"
                  required
                  name="amount"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  value={formState?.amount !== null ? formState?.amount : ""}
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} className="mt-0" direction={"row"}>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{ width: "40%", marginTop: "10px", marginLeft: "7px" }}
              >
                <b>Payment Mode *</b>
              </FormLabel>
              <FormControl sx={{ width: "60%" }} direction="row">
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="mode"
                  onChange={handleChange}
                  value={formState.mode}
                >
                  <FormControlLabel
                    value="CASH"
                    control={<Radio />}
                    label="Cash"
                  />
                  <FormControlLabel
                    value="ONLINE"
                    control={<Radio />}
                    label="Online"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Grid>
          {formState.mode !== null && (
            <Grid item xs={12}>
              <Stack spacing={1}>
                {formState?.mode === "ONLINE" ? (
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      id="outlined-required"
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      select
                      label="Account"
                      disabled={props?.viewType === "View"}
                      name="bankAccountId"
                      required
                      value={
                        formState?.bankAccountId !== null
                          ? formState?.bankAccountId
                          : ""
                      }
                    >
                      {getUserAccountListItem()}
                    </TextField>
                  </FormControl>
                ) : (
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Note"
                      required
                      multiline
                      rows={2}
                      name="note"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                      value={formState?.note !== null ? formState?.note : ""}
                    />
                  </FormControl>
                )}
              </Stack>
            </Grid>
          )}

          {/* <FormControl sx={{ width: "100%" }}> */}
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
          {/* </FormControl> */}
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
                      disabled={checkNullValues(formState, [
                        "bankAccountId",
                        "note",
                        "type",
                      ])}
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
    </>
  );
};
export default ReceiptForm;
