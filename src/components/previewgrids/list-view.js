import React from "react";
import { List, Button } from "antd";
import { Add } from "@mui/icons-material";

// const data = [
//   "Racing car sprays burning fuel into crowd.",
//   "Japanese princess to wed commoner.",
//   "Australian walks 100km after outback crash.",
//   "Man charged over missing wedding girl.",
//   "Los Angeles battles huge wildfires.",
// ];

const ListView = ({ buttonTitle, data }) => {
  console.log(data);
  return (
    <>
      <List
        size="large"
        header={
          <>
            <span style={{ color: "#1677ff", fontSize: "20px" }}>
              <strong>{buttonTitle}</strong>
            </span>
            <Button
              type="primary"
              icon={<Add />}
              size={20}
              style={{ marginRight: "10px", float: "right" }}
              // onClick={onAddButtonClick}
            />
          </>
        }
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>{item.invoiceNumber}</span>
              <span>{item.name}</span>
              <span>{item.itemsCount}</span>
              <span>{item.totalAmount}</span>
              <span>{item.date}</span>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default ListView;
