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

const OrganizationForm = (props) => {
  const rolesListState = useSelector((state) => state.adminState.rolesList);
  const [formState, setFormState] = useState(null);

  const getRolesMenuItem = () => {
    return rolesListState?.length > 0 ? (
      rolesListState.map((role) => {
        return (
          <MenuItem key={role.id} value={role.id}>
            {role.name}
          </MenuItem>
        );
      })
    ) : (
      <MenuItem key={1} value="">
        NONE
      </MenuItem>
    );
  };

  useEffect(() => {
    console.log("selectedDataForEdit", props.selectedDataForEdit);
    if (!isEmpty(props.selectedDataForEdit)) {
      setFormState(props.selectedDataForEdit);
    }
  }, [props.selectedDataForEdit]);

  const resetFormState = () => {
    setFormState(null);
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
            <Stack spacing={1} direction="row">
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Organization Name"
                  name="name"
                  InputProps={{
                    readOnly: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={false}
                  onChange={handleChange}
                  value={formState !== null ? formState.name : ""}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "50%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  select
                  label="Role"
                  name="role"
                  value={
                    formState !== null
                      ? formState?.roles?.length > 0
                        ? formState?.roles[0].id
                        : ""
                      : ""
                  }
                  required
                >
                  {getRolesMenuItem()}
                </TextField>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <FormControl sx={{ width: "50%" }}>
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
                  value={formState !== null ? formState.phoneNumber : ""}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "50%" }}>
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
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <FormControl sx={{ width: "50%" }}>
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
                  value={formState !== null ? formState.gstNumber : ""}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "50%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  label="Address"
                  name="address"
                  value={formState !== null ? formState.address : ""}
                  required
                ></TextField>
              </FormControl>
            </Stack>
          </Grid>
          {/* <Grid item xs={12}>
            <Stack spacing={1}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                required
                multiline
                rows={4}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Stack>
          </Grid> */}
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
export default OrganizationForm;
