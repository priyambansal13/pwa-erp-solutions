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

const UserAccountForm = (props) => {
  const DEFAULT_USER_ACCOUNT_STATE = {
    bankName: null,
    alias: null,
    accountNumber: null,
    ifsc: null,
    openingBalance: 0,
    type: null,
  };
  const bankListState = useSelector(
    (state) => state.organizationUserState.bankList
  );
  const [formState, setFormState] = useState(DEFAULT_USER_ACCOUNT_STATE);

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
    setFormState(DEFAULT_USER_ACCOUNT_STATE);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const getBankListItem = () => {
    return bankListState?.length > 0 ? (
      bankListState.map((bank) => {
        return (
          <MenuItem key={bank} value={bank}>
            <em>{bank}</em>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem key={1} value="">
        NONE
      </MenuItem>
    );
  };
  const getAccountType = () => {
    const item1 = (
      <MenuItem key="normal" value="normal">
        <em>Normal</em>
      </MenuItem>
    );
    const item2 = (
      <MenuItem key="expense" value="expense">
        <em>Expense</em>
      </MenuItem>
    );
    const menuItem = [item1, item2];
    return menuItem;
  };
  return (
    <>
      <form style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  select
                  label="Account Type"
                  name="type"
                  required
                  value={formState?.type === null ? "" : formState.type}
                >
                  {getAccountType()}
                </TextField>
              </FormControl>
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  select
                  label="Bank Name"
                  name="bankName"
                  required
                  value={formState?.bankName === null ? "" : formState.bankName}
                >
                  {getBankListItem()}
                </TextField>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  required
                  type={"number"}
                  id="outlined-required"
                  label="Account Number"
                  name="accountNumber"
                  InputProps={{
                    readOnly: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={false}
                  onChange={handleChange}
                  value={
                    formState.accountNumber === null
                      ? ""
                      : formState.accountNumber
                  }
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="IFSC Code"
                  name="ifsc"
                  InputProps={{
                    readOnly: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={false}
                  onChange={handleChange}
                  value={formState.ifsc === null ? "" : formState.ifsc}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "50%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  label="Short Name"
                  name="alias"
                  value={formState.alias !== null ? formState.alias : ""}
                  required
                ></TextField>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  required
                  type={"number"}
                  id="outlined-required"
                  label="Opening Balance"
                  name="openingBalance"
                  InputProps={{
                    readOnly: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={false}
                  onChange={handleChange}
                  value={
                    formState.openingBalance === null
                      ? ""
                      : formState.openingBalance
                  }
                />
              </FormControl>
            </Stack>
          </Grid>
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

                {isEmpty(props.selectedDataForEdit) ? (
                  <Button
                    onClick={() => props.submitData(formState)}
                    ghost
                    type="primary"
                    disabled={checkNullValues(formState, [])}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      props.updateData(formState);
                    }}
                    ghost
                    type="primary"
                  >
                    Update
                  </Button>
                )}
              </Space>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default UserAccountForm;
