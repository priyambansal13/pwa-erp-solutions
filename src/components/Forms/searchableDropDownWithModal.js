import * as React from "react";
import TextField from "@mui/material/TextField";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export default function SearchableDropDownWithModal(props) {
  const [value, setValue] = React.useState(null);

  const [dialogValue, setDialogValue] = React.useState({
    name: "",
  });

  const onChange = (e, newValue) => {
    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        setDialogValue({
          name: newValue,
        });
        props.getSelectedItemDetails({ type: "new", dialogValue });
      });
    } else if (newValue && newValue.inputValue) {
      setValue({
        name: newValue.inputValue,
      });
      props.getSelectedItemDetails({
        type: "new",
        dialogValue: newValue.inputValue,
      });
    } else {
      setValue(newValue);
      props.getSelectedItemDetails({ type: "old", dialogValue: newValue });
    }
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          onChange(event, newValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.name
          );
          if (params.inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={props.data}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: "100%" }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Product"
            required
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
      {/* <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new Product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any product in our list? Please, add it!
            </DialogContentText>

            <ProductForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog> */}
    </React.Fragment>
  );
}
