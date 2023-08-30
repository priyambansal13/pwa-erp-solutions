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
import SearchableDropDownWithModal from "./searchableDropDownWithModal";

const StockForm = (props) => {
  const [formState, setFormState] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState("old");

  const productListState = useSelector(
    (state) => state?.organizationUserState?.productsList
  );
  const handleChange = (e) => {
    if (e.target.name === "quantity" || e.target.name === "taxPercent") {
      setFormState({ ...formState, [e.target.name]: parseInt(e.target.value) });
    } else setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // const getProductMenuItem = () => {
  //   return productListState?.length > 0 ? (
  //     productListState.map((product) => {
  //       return (
  //         product.id !== "1" && (
  //           <MenuItem key={product.id} value={product.id}>
  //             <em>{product.name}</em>
  //           </MenuItem>
  //         )
  //       );
  //     })
  //   ) : (
  //     <MenuItem key={1} value="">
  //       NONE
  //     </MenuItem>
  //   );
  // };

  useEffect(() => {
    console.log(formState, "formState");
  }, [formState]);

  const resetFormState = () => {
    setFormState(null);
  };

  const getSelectedItemDetails = (params) => {
    if (params.type === "new") {
      setFormState({ name: params.dialogValue, quantity: "" });
    } else if (params.type === "old" && params.dialogValue !== null) {
      setFormState({ productId: params?.dialogValue?.id, quantity: "" });
    }
    setSelectedProductType(params.type);
  };
  return (
    <>
      <form style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormControl sx={{ width: "100%" }}>
                {/* <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  select
                  label="Product"
                  name="product"
                  required
                  value={
                    formState?.product?.id !== null
                      ? formState?.product?.id
                      : ""
                  }
                >
                  {getProductMenuItem()}
                </TextField> */}
                <SearchableDropDownWithModal
                  data={productListState}
                  getSelectedItemDetails={getSelectedItemDetails}
                />
              </FormControl>
            </Stack>
          </Grid>
          {selectedProductType === "new" && (
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
                    value={
                      formState?.hsnCode !== null ? formState?.hsnCode : ""
                    }
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
                      formState?.taxPercent !== null
                        ? formState?.taxPercent
                        : ""
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
          )}
          {selectedProductType === "new" && (
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
                    formState?.description !== null
                      ? formState?.description
                      : ""
                  }
                />
              </Stack>
            </Grid>
          )}
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
                      props.submitData(formState, selectedProductType);
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
