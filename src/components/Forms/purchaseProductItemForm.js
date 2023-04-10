import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  Box,
  Typography,
} from "@mui/material";

import { Badge, Button, Space } from "antd";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "react-redux";

const PurchaseProductItemForm = (props) => {
  // let selectedItem = props.selectedDataForEdit;
  const [formPayload, setFormPayload] = useState(props.selectedDataForEdit);

  const stocksList = useSelector(
    (state) => state?.organizationUserState?.productsList
  );

  useEffect(() => {
    console.log("selectedDataForEdit", props.selectedDataForEdit);
    // if (!props.selectedDataForEdit) {
    setFormPayload(props.selectedDataForEdit);
    // }
  }, [props]);

  const handleChange = (e) => {
    if (e.target.name === "product") {
      let selectedStock = stocksList.find(
        (stock) => stock.id === e.target.value
      );
      setFormPayload({
        ...formPayload,
        product: selectedStock,
        quantity: 0,
        price: 0,
        itemAmount: 0,
        taxAmount: 0,
        itemTotalAmount: 0,
      });
    }
    if (e.target.name === "quantity") {
      const amount = formPayload?.price * parseInt(e.target.value);
      const taxAmount = (amount * formPayload?.product?.taxPercent) / 100;
      const itemTotalAmount = amount + taxAmount;
      setFormPayload({
        ...formPayload,
        [e.target.name]: e.target.value === "" ? 0 : parseInt(e.target.value),
        itemAmount: amount,
        taxAmount: taxAmount,
        itemTotalAmount: itemTotalAmount,
      });
    }
    if (e.target.name === "price") {
      const amount = formPayload?.quantity * parseInt(e.target.value) || 0;
      const taxAmount = (amount * formPayload?.product?.taxPercent) / 100;
      const itemTotalAmount = amount + taxAmount;
      setFormPayload({
        ...formPayload,
        [e.target.name]: e.target.value === "" ? 0 : parseInt(e.target.value),
        itemAmount: amount,
        taxAmount: taxAmount,
        itemTotalAmount: itemTotalAmount,
      });
    }
  };

  const getProductMenuItem = () => {
    return stocksList?.length > 0 ? (
      stocksList.map((stock) => {
        return props?.parentComponentData?.salePurchaseItems.findIndex(
          (item) => item.product.id === stock.id
        ) === -1 ? (
          <MenuItem key={stock.id} value={stock.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>{stock.name}</span>
              {/* <Badge
                className="site-badge-count-109"
                overflowCount={999}
                count={stock.quantity}
                style={{ backgroundColor: "#52c41a" }}
              /> */}
            </div>
          </MenuItem>
        ) : (
          ""
        );
      })
    ) : (
      <MenuItem key={1} value="--">
        NONE
      </MenuItem>
    );
  };

  useEffect(() => {
    console.log(formPayload);
  }, [formPayload]);

  const resetFormState = () => {
    setFormPayload(null);
  };

  return (
    <>
      <form style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {!props.selectedDataForEdit ? (
              <Stack spacing={1}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    id="outlined-required"
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    select // tell TextField to render select
                    label="Product"
                    name="product"
                    required
                    value={formPayload !== null ? formPayload?.product?.id : ""}
                  >
                    {getProductMenuItem()}
                  </TextField>
                </FormControl>
              </Stack>
            ) : (
              <Stack spacing={1} direction="row">
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  {/* <Badge.Ribbon
                    text={`In Stock-${formPayload?.product?.quantity}`}
                    color="purple"
                  > */}
                  <TextField
                    id="outlined-required"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    label="Product"
                    name="product"
                    disabled
                    required
                    value={formPayload?.product?.name}
                  ></TextField>
                  {/* </Badge.Ribbon> */}
                </Space>
              </Stack>
            )}
          </Grid>
          {formPayload !== null ? (
            <>
              <Grid item xs={12}>
                <Stack
                  spacing={1}
                  direction="row"
                  justifyContent="space-between"
                >
                  <FormControl sx={{ width: "80%" }}>
                    <TextField
                      id="outlined-required"
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      label="Quantity"
                      name="quantity"
                      required
                      // helperText={
                      //   formPayload?.quantity > formPayload?.product?.quantity
                      //     ? "Quantity can not be greater than stock available !"
                      //     : ""
                      // }
                      value={formPayload !== null ? formPayload?.quantity : ""}
                      // error={
                      //   formPayload?.quantity > formPayload?.product?.quantity
                      // }
                    ></TextField>
                  </FormControl>

                  <Typography className="mr-3 mt-2">
                    {formPayload?.product?.unit}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      id="outlined-required"
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      label="Price"
                      name="price"
                      required
                      value={formPayload !== null ? formPayload?.price : ""}
                    ></TextField>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1} alignItems="flex-end" className="m-lg-1">
                  <Typography variant="h6">
                    <span>SubTotal :</span> {formPayload?.itemAmount}
                  </Typography>
                  <Typography variant="h6">
                    <span>Tax :</span> {formPayload?.product?.taxPercent}%
                  </Typography>
                  <Typography variant="h6">
                    <span>Tax Amount :</span> {formPayload?.taxAmount}
                  </Typography>
                  <Typography variant="h5">
                    <span>Total Amount :</span> {formPayload?.itemTotalAmount}
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
                    props.closeModal();
                    resetFormState();
                  }}
                >
                  Cancel
                </Button>

                {isEmpty(props.selectedDataForEdit) ? (
                  <Button
                    onClick={() => {
                      props.submitData(formPayload);
                      resetFormState();
                    }}
                    ghost
                    type="primary"
                  >
                    Add
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      props.updateData(formPayload);
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
export default PurchaseProductItemForm;
