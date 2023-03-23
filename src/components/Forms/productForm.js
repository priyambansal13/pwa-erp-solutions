import React, { useEffect, useState } from "react";
import { Grid, Stack, TextField, MenuItem, FormControl } from "@mui/material";

const ProductForm = () => {
  const [formState, setFormState] = useState({});
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);
  return (
    <>
      <form style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <FormControl sx={{ width: "50%" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Product Name"
                  InputProps={{
                    readOnly: false,
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={false}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "50%" }}>
                <TextField
                  id="outlined-required"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  select // tell TextField to render select
                  label="Unit"
                  required
                >
                  <MenuItem key={1} value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem key={2} value="kg">
                    Kilogram
                  </MenuItem>
                  <MenuItem key={3} value="l">
                    Litre
                  </MenuItem>
                  <MenuItem key={4} value="gm">
                    Grams
                  </MenuItem>
                  <MenuItem key={5} value="ml">
                    Mililitre
                  </MenuItem>
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
                  InputLabelProps={{ shrink: true }}
                  select
                  label="Organization"
                  required
                >
                  <MenuItem key={1} value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem key={2} value="A">
                    Haldiram
                  </MenuItem>
                  <MenuItem key={3} value="B">
                    Brijwasi
                  </MenuItem>
                  <MenuItem key={4} value="C">
                    Tim Horton
                  </MenuItem>
                  <MenuItem key={5} value="D">
                    Dunkin & Donuts
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
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default ProductForm;
