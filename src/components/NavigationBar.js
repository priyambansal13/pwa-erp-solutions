import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <div class="wrap">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="bg-wrap">
                <div class="row">
                  <div class="col-md-6 d-flex align-items-center">
                    <p class="mb-0 phone pl-md-2">
                      <span class="fa fa-phone mr-1"></span> +00 1234 567
                      <span class="fa fa-paper-plane mr-1"></span>{" "}
                      youremail@email.com
                    </p>
                  </div>
                  {/* <div class="col-md-6 d-flex justify-content-md-end">
                    <div class="social-media">
                      <p class="mb-0 d-flex">
                        <a
                          href="#"
                          class="d-flex align-items-center justify-content-center"
                        >
                          <span class="fa fa-facebook">
                            <i class="sr-only">Facebook</i>
                          </span>
                        </a>
                        <a
                          href="#"
                          class="d-flex align-items-center justify-content-center"
                        >
                          <span class="fa fa-twitter">
                            <i class="sr-only">Twitter</i>
                          </span>
                        </a>
                        <a
                          href="#"
                          class="d-flex align-items-center justify-content-center"
                        >
                          <span class="fa fa-instagram">
                            <i class="sr-only">Instagram</i>
                          </span>
                        </a>
                        <a
                          href="#"
                          class="d-flex align-items-center justify-content-center"
                        >
                          <span class="fa fa-dribbble">
                            <i class="sr-only">Dribbble</i>
                          </span>
                        </a>
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div class="container">
          <a class="navbar-brand" href="/">
            Accounting
          </a>
          <form action="#" class="searchform order-sm-start order-lg-last">
            <div class="form-group d-flex">
              <Link to="/login" class="form-control pl-3">
                Login{" "}
              </Link>
              {/* <a  placeholder="" class="form-control pl-3">
                
              </button> */}
            </div>
          </form>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="fa fa-bars"></span> Menu
          </button>
          <div class="collapse navbar-collapse" id="ftco-nav">
            <ul class="navbar-nav m-auto">
              {/* <li class="nav-item active">
                <Link to="/pwa-erp-solutions" class="nav-link">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/pwa-erp-solutions/about" class="nav-link">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/pwa-erp-solutions/users" class="nav-link">
                  Users
                </Link>
              </li> */}
              {/* <li class="nav-item">
                <a href="cases.html" class="nav-link">
                  Case Study
                </a>
              </li>
              <li class="nav-item">
                <a href="blog.html" class="nav-link">
                  Blog
                </a>
              </li>
              <li class="nav-item">
                <a href="contact.html" class="nav-link">
                  Contact
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
