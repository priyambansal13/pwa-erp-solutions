import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";

const SearchTextField = () => {
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  const [inputValue, setInputValue] = useState("");

  const handleAddCustomer = () => {
    if (inputValue.trim()) {
      setOptions([...options, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  const renderInput = (params) => (
    <TextField
      {...params}
      variant="outlined"
      placeholder="Search"
      InputProps={{
        ...params.InputProps,
        startAdornment: <SearchIcon />,
        endAdornment: (
          <div style={{ display: "flex", alignItems: "center" }}>
            {options.indexOf(inputValue.trim()) === -1 && (
              <span
                style={{ cursor: "pointer", color: "#1976d2" }}
                onClick={handleAddCustomer}
              >
                Add Customer
              </span>
            )}
          </div>
        ),
      }}
    />
  );

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      filterOptions={(options, { inputValue }) => {
        if (inputValue.trim()) {
          return options.filter(
            (option) =>
              option.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          );
        }
        return options;
      }}
      renderInput={renderInput}
    />
  );
};

export default SearchTextField;
