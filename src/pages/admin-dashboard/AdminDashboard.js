import React from "react";
import "./adminDashboard.scss";

const AdminDashboard = (props) => {
  // const [minimize, setMinimize] = useState(false);
  // const [show, setShow] = useState(false);

  const userDetails = localStorage.getItem("userDetails");

  // const closeModal = () => {
  //   setShow(false);
  // };
  // const minimizeMenu = () => {
  //   console.log(minimize);
  //   setMinimize(!minimize);
  // };
  return (
    <>
      <div>Dashboard Page{userDetails}</div>
    </>
  );
};

export default AdminDashboard;
