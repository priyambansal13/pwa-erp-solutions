import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, TextField } from "@mui/material";
import isEmpty from "lodash/isEmpty";
import { Button, Space } from "antd";

const RoleForm = (props) => {
  const [formState, setFormState] = useState(null);

  const resetFormState = () => {
    setFormState(null);
  };

  useEffect(() => {
    console.log("selectedDataForEdit", props.selectedDataForEdit);
    if (!isEmpty(props.selectedDataForEdit)) {
      setFormState(props.selectedDataForEdit);
    }
  }, [props.selectedDataForEdit]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <TextField
                required
                id="outlined-required"
                label="Role Name"
                name="name"
                InputProps={{
                  readOnly: false,
                }}
                value={formState !== null ? formState.name : ""}
                error={false}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                name="description"
                required
                value={formState !== null ? formState.description : ""}
                multiline={true}
                InputLabelProps={{ shrink: true }}
                rows={6}
                onChange={handleChange}
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
export default RoleForm;
