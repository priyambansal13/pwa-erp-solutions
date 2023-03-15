import React, { useState } from "react";
import ModalDialogComponent from "../../components/shared/ModalDialog/ModalDialogComponent";
// import SideBar from "../../components/side-bar/SideBar";
import Users from "../../components/Users";
import "./adminDashboard.scss";
// import "../../components/side-bar/SideBar.scss";

const AdminDashboard = (props) => {
  const [minimize, setMinimize] = useState(false);
  const [show, setShow] = useState(false);

  const userDetails = localStorage.getItem("userDetails");

  const closeModal = () => {
    setShow(false);
  };
  const minimizeMenu = () => {
    console.log(minimize);
    setMinimize(!minimize);
  };
  return (
    <>
      <div class={`wrapper ${minimize ? "collapseMenu" : ""} `}>
        <div class="top_navbar">
          <div class="hamburger" onClick={minimizeMenu}>
            <div class="one"></div>
            <div class="two"></div>
            <div class="three"></div>
          </div>
          <div class="top_menu">
            <div class="logo">logo</div>
            <ul>
              <li>
                <span>
                  <i class="fas fa-search"></i>
                </span>
              </li>
              <li>
                <span>
                  <i class="fas fa-bell"></i>
                </span>
              </li>
              <li onClick={() => setShow(true)}>
                <span>
                  <i class="fas fa-user"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div class="sidebar">
          <ul>
            <li>
              <p>
                <span class="icon">
                  <i class="fas fa-book"></i>
                </span>
                <span class="title">Books</span>
              </p>
            </li>
            <li>
              <p>
                <span class="icon">
                  <i class="fas fa-file-video"></i>
                </span>
                <span class="title">Movies</span>
              </p>
            </li>
            <li>
              <p>
                <span class="icon">
                  <i class="fas fa-volleyball-ball"></i>
                </span>
                <span class="title">Sports</span>
              </p>
            </li>
            <li>
              <p class="active">
                <span class="icon">
                  <i class="fas fa-blog"></i>
                </span>
                <span class="title">Blogs</span>
              </p>
            </li>
            <li>
              <p>
                <span class="icon">
                  <i class="fas fa-leaf"></i>
                </span>
                <span class="title">Nature</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="main_container">
          <Users />
        </div>
      </div>
      <ModalDialogComponent
        show={show}
        userDetails={userDetails}
        closeModal={closeModal}
      />
    </>
  );
};

export default AdminDashboard;
