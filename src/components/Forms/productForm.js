import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  Box,
} from "@mui/material";
import { Button, Space } from "antd";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";
import { ADMIN } from "../../constants/constants";
import OrDivider from "../shared/Or.component";

const ProductForm = (props) => {
  const DEFAULT_PRODUCT_STATE = {
    name: null,
    taxPercent: 0,
    unit: null,
    hsnCode: null,
    description: null,
    ownerId: null,
  };
  const userRole = localStorage.getItem("userRole");
  const [formState, setFormState] = useState(null);
  const organizationListState = useSelector(
    (state) => state?.adminState?.organizationList
  );
  const handleChange = (e) => {
    if (e.target.name === "organization") {
      let selectedOrganization = organizationListState.find(
        (organization) => organization.id === e.target.value
      );
      setFormState({ ...formState, ownerId: selectedOrganization.id });
    } else setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const getOrganizationMenuItem = () => {
    return organizationListState?.length > 0 ? (
      organizationListState.map((organization) => {
        return (
          organization.id !== "1" && (
            <MenuItem key={organization.id} value={organization.id}>
              <em>{organization.name}</em>
            </MenuItem>
          )
        );
      })
    ) : (
      <MenuItem key={1} value="">
        NONE
      </MenuItem>
    );
  };

  const fileInputRef = useRef();

  const handleReset = () => {
    fileInputRef.current.value = "";
    setFormState(DEFAULT_PRODUCT_STATE);
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const resetFormState = () => {
    setFormState(DEFAULT_PRODUCT_STATE);
    handleReset();
  };

  const uploadProductFile = (e) => {
    if (formState?.ownerId) {
      props.handleFileSelect(e, formState?.ownerId);
      handleReset();
    }
  };
  return (
    <>
      <form style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Grid container spacing={3} className="mb-2">
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                id="outlined-required"
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                select
                label="Organization"
                name="organization"
                required
                value={formState?.ownerId !== null ? formState?.ownerId : ""}
              >
                {getOrganizationMenuItem()}
              </TextField>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                type="file"
                inputRef={fileInputRef}
                onChange={uploadProductFile}
                InputLabelProps={{ shrink: true }}
                label="Import Products"
                variant="outlined"
                margin="normal"
              />
            </FormControl>
          </Grid>
        </Grid>
        <OrDivider />
        <Grid container spacing={3} className="mt-1">
          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <FormControl sx={{ width: userRole === ADMIN ? "100%" : "100%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Product Name"
                  InputProps={{
                    readOnly: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={false}
                  name="name"
                  value={formState?.name !== null ? formState?.name : ""}
                  onChange={handleChange}
                />
              </FormControl>
              {/* {userRole === ADMIN && (
                <FormControl sx={{ width: "50%" }}>
                  <TextField
                    id="outlined-required"
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    select
                    label="Organization"
                    name="organization"
                    required
                    value={
                      formState?.ownerId !== null ? formState?.ownerId : ""
                    }
                  >
                    {getOrganizationMenuItem()}
                  </TextField>
                </FormControl>
              )} */}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="HSN Code"
                  InputProps={{
                    readOnly: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={false}
                  name="hsnCode"
                  value={formState?.hsnCode !== null ? formState?.hsnCode : ""}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "25%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  select // tell TextField to render select
                  label="Unit"
                  name="unit"
                  required
                  value={formState?.unit !== null ? formState?.unit : ""}
                >
                  <MenuItem key={1} value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem key={2} value="kg">
                    Kg
                  </MenuItem>
                  <MenuItem key={3} value="l">
                    L
                  </MenuItem>
                  <MenuItem key={4} value="gm">
                    Gm
                  </MenuItem>
                  <MenuItem key={5} value="ml">
                    Ml
                  </MenuItem>
                </TextField>
              </FormControl>
              <FormControl sx={{ width: "25%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  select
                  label="Tax"
                  name="taxPercent"
                  required
                  value={
                    formState?.taxPercent !== null ? formState?.taxPercent : ""
                  }
                >
                  <MenuItem key={1} value={0}>
                    <em>0%</em>
                  </MenuItem>
                  <MenuItem key={2} value={5}>
                    5%
                  </MenuItem>
                  <MenuItem key={3} value={10}>
                    10%
                  </MenuItem>
                  <MenuItem key={4} value={15}>
                    15%
                  </MenuItem>
                  <MenuItem key={5} value={30}>
                    30%
                  </MenuItem>
                </TextField>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                required
                multiline
                rows={4}
                name="description"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                value={
                  formState?.description !== null ? formState?.description : ""
                }
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
                )}
              </Space>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default ProductForm;
