import React, { useEffect, useState } from "react";
import { Box, FormControl, Grid, Stack, TextField } from "@mui/material";
import isEmpty from "lodash/isEmpty";
import { Button, Space } from "antd";
import { useSelector } from "react-redux";
import { checkNullValues } from "../../utils/common-utils";

const CustomerForm = (props) => {
  const DEFAULT_CUSTOMER_STATE = {
    name: null,
    gstNumber: null,
    address: null,
    phoneNumber: null,
  };
  const rolesListState = useSelector((state) => state.adminState.rolesList);
  const [formState, setFormState] = useState(DEFAULT_CUSTOMER_STATE);

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
    setFormState(DEFAULT_CUSTOMER_STATE);
  };
  const handleChange = (e) => {
    if (e.target.name === "role") {
      let selectedRole = rolesListState.find(
        (role) => role.id === e.target.value
      );
      setFormState({ ...formState, roles: [selectedRole] });
    } else setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  name="name"
                  InputProps={{
                    readOnly: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={false}
                  onChange={handleChange}
                  value={formState.name === null ? "" : formState.name}
                />
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
                  label="Mobile Number"
                  name="phoneNumber"
                  InputProps={{
                    readOnly: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={false}
                  onChange={handleChange}
                  value={
                    formState.phoneNumber === null ? "" : formState.phoneNumber
                  }
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="GST Number"
                  name="gstNumber"
                  InputProps={{
                    readOnly: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={false}
                  onChange={handleChange}
                  value={
                    formState.gstNumber === null ? "" : formState.gstNumber
                  }
                />
              </FormControl>
              {/* <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  type={"email"}
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  label="Email"
                  name="email"
                  value={formState !== null ? formState.email : ""}
                  required
                ></TextField>
              </FormControl> */}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2}>
              <TextField
                id="outlined-multiline-static"
                label="Address"
                required
                multiline
                rows={4}
                name="address"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                value={formState.address === null ? "" : formState.address}
              />
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
export default CustomerForm;
