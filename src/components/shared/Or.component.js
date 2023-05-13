import { Divider } from "@mui/material";
import React from "react";
// import { Divider, Typography } from "antd";

// const { Text } = Typography;

export default function OrDivider() {
  return (
    <Divider sx={{ borderBottomWidth: 5 }}>OR</Divider>
    // <div
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     width: "45%",
    //     whiteSpace: "nowrap",
    //   }}
    // >
    //   <Divider
    //     style={{
    //       flexGrow: 1,
    //       height: 1,
    //       borderBottomColor: "#999999",
    //       borderBottomWidth: 2,
    //       dashed: true,
    //     }}
    //   />
    //   <Text style={{ margin: "10px", fontWeight: "bold" }}>OR</Text>
    //   <Divider
    //     style={{
    //       flexGrow: 1,
    //       height: 1,
    //       borderBottomColor: "#999999",
    //       borderBottomWidth: 2,
    //       dashed: true,
    //     }}
    //   />
    // </div>
  );
}
