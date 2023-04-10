import React, { useEffect, useState } from "react";
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

const StockForm = (props) => {
  const [formState, setFormState] = useState(null);
  const productListState = useSelector(
    (state) => state?.organizationUserState?.productsList
  );
  const handleChange = (e) => {
    if (e.target.name === "product") {
      let selectedProduct = productListState.find(
        (product) => product.id === e.target.value
      );
      setFormState({
        ...formState,
        product: selectedProduct,
      });
    } else
      setFormState({ ...formState, [e.target.name]: parseInt(e.target.value) });
  };

  const getProductMenuItem = () => {
    return productListState?.length > 0 ? (
      productListState.map((product) => {
        return (
          product.id !== "1" && (
            <MenuItem key={product.id} value={product.id}>
              <em>{product.name}</em>
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

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const resetFormState = () => {
    setFormState(null);
  };
  return (
    <>
      <form style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  select
                  label="Product"
                  name="product"
                  required
                  value={formState !== null ? formState?.product?.id : ""}
                >
                  {getProductMenuItem()}
                </TextField>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  type={"number"}
                  InputLabelProps={{ shrink: true }}
                  label="Quantity"
                  name="quantity"
                  required
                  value={formState !== null ? formState.quantity : ""}
                ></TextField>
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
                    onClick={() => {
                      resetFormState();
                      props.submitData(formState);
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
                )}
              </Space>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default StockForm;
