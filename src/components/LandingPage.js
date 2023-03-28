import React from "react";
import Plans from "./Plans";
import "../scss/style.scss";
import NavigationBar from "./NavigationBar";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
const LandingPage = () => {
  const load = false;
  return load === true ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <NavigationBar />
      <div class="hero-wrap">
        <div class="home-slider owl-carousel">
          <div
            class="slider-item"
            // style={{background:"url(images/bg_1.jpg);"}}
          >
            <div class="overlay"></div>
            <div class="container">
              <div class="row no-gutters slider-text align-items-center justify-content-center">
                <div class="col-md-8 ftco-animate">
                  <div class="text w-100 text-center">
                    <h2>We Business Grow</h2>
                    <h1 class="mb-4">
                      We Help You Businesses Innovate and Grow
                    </h1>
                    <p>
                      <span class="btn btn-white">Connect with us</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="slider-item"
            // style="background-image:url(images/bg_2.jpg);"
          >
            <div class="overlay"></div>
            <div class="container">
              <div class="row no-gutters slider-text align-items-center justify-content-center">
                <div class="col-md-8 ftco-animate">
                  <div class="text w-100 text-center">
                    <h2>We Support Business</h2>
                    <h1 class="mb-4">The Best Business Support</h1>
                    <p>
                      <span class="btn btn-white">Connect with us</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="slider-item"
            // style="background-image:url(images/bg_3.jpg);"
          >
            <div class="overlay"></div>
            <div class="container">
              <div class="row no-gutters slider-text align-items-center justify-content-center">
                <div class="col-md-8 ftco-animate">
                  <div class="text w-100 text-center">
                    <h2>We Give Advice</h2>
                    <h1 class="mb-4">Expert Financial Advice</h1>
                    <p>
                      <span class="btn btn-white">Connect with us</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="ftco-section ftco-no-pt bg-light">
        <div class="container">
          <div class="row d-flex no-gutters">
            <div class="col-md-6 d-flex">
              <div
                class="img img-video d-flex align-self-stretch align-items-center justify-content-center justify-content-md-center mb-4 mb-sm-0"
                // style="background-image:url(images/about.jpg);"
              ></div>
            </div>
            <div class="col-md-6 pl-md-5 py-md-5">
              <div class="heading-section pl-md-4 pt-md-5">
                <span class="subheading">Welcome to Accounting</span>
                <h2 class="mb-4">We Are the Best Accounting Agency</h2>
              </div>
              <div class="services-2 w-100 d-flex">
                <div class="icon d-flex align-items-center justify-content-center">
                  <span class="flaticon-wealth"></span>
                </div>
                <div class="text pl-4">
                  <h4>Market Analysis</h4>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia
                  </p>
                </div>
              </div>
              <div class="services-2 w-100 d-flex">
                <div class="icon d-flex align-items-center justify-content-center">
                  <span class="flaticon-accountant"></span>
                </div>
                <div class="text pl-4">
                  <h4>Accounting Advisor</h4>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia
                  </p>
                </div>
              </div>
              <div class="services-2 w-100 d-flex">
                <div class="icon d-flex align-items-center justify-content-center">
                  <span class="flaticon-teamwork"></span>
                </div>
                <div class="text pl-4">
                  <h4>General Consultancy</h4>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia
                  </p>
                </div>
              </div>
              <div class="services-2 w-100 d-flex">
                <div class="icon d-flex align-items-center justify-content-center">
                  <span class="flaticon-accounting"></span>
                </div>
                <div class="text pl-4">
                  <h4>Structured Assestment</h4>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="ftco-section bg-light ftco-no-pt">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-3 d-flex services align-self-stretch px-4 ftco-animate">
              <div class="d-block">
                <div class="icon d-flex mr-2">
                  <span class="flaticon-accounting-1"></span>
                </div>
                <div class="media-body">
                  <h3 class="heading">Accounting</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 d-flex services align-self-stretch px-4 ftco-animate">
              <div class="d-block">
                <div class="icon d-flex mr-2">
                  <span class="flaticon-tax"></span>
                </div>
                <div class="media-body">
                  <h3 class="heading">Tax, Compliance &amp; Payroll</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 d-flex services align-self-stretch px-4 ftco-animate">
              <div class="d-block">
                <div class="icon d-flex mr-2">
                  <span class="flaticon-loan"></span>
                </div>
                <div class="media-body">
                  <h3 class="heading">Financial Services</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 d-flex services align-self-stretch px-4 ftco-animate">
              <div class="d-block">
                <div class="icon d-flex mr-2">
                  <span class="flaticon-budget"></span>
                </div>
                <div class="media-body">
                  <h3 class="heading">Growth &amp; Funding Access</h3>
                  <p>
                    Even the all-powerful Pointing has no control about the
                    blind texts it is an almost unorthographic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="ftco-counter bg-light ftco-no-pt" id="section-counter">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
              <div class="block-18 text-center">
                <div class="text">
                  <strong class="number" data-number="50">
                    0
                  </strong>
                </div>
                <div class="text">
                  <span>Years of Experienced</span>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
              <div class="block-18 text-center">
                <div class="text">
                  <strong class="number" data-number="8500">
                    0
                  </strong>
                </div>
                <div class="text">
                  <span>Cases Completed</span>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
              <div class="block-18 text-center">
                <div class="text">
                  <strong class="number" data-number="20">
                    0
                  </strong>
                </div>
                <div class="text">
                  <span>Awards Won</span>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
              <div class="block-18 text-center">
                <div class="text">
                  <strong class="number" data-number="50">
                    0
                  </strong>
                </div>
                <div class="text">
                  <span>Expert Consultant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section class="ftco-section testimony-section bg-light">
        <div class="overlay"></div>
        <div class="container">
          <div class="row justify-content-center pb-5 mb-3">
            <div class="col-md-7 heading-section heading-section-white text-center ftco-animate">
              <span class="subheading">Testimonies</span>
              <h2>Happy Clients &amp; Feedbacks</h2>
            </div>
          </div>
          <div class="row ftco-animate">
            <div class="col-md-12">
              <div class="carousel-testimony owl-carousel ftco-owl">
                <div class="item">
                  <div class="testimony-wrap py-4">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="fa fa-quote-left"></span>
                    </div>
                    <div class="text">
                      <p class="mb-4">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <div class="d-flex align-items-center">
                        <div
                          class="user-img"
                          // style="background-image: url(images/person_1.jpg)"
                        ></div>
                        <div class="pl-3">
                          <p class="name">Roger Scott</p>
                          <span class="position">Marketing Manager</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="testimony-wrap py-4">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="fa fa-quote-left"></span>
                    </div>
                    <div class="text">
                      <p class="mb-4">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <div class="d-flex align-items-center">
                        <div
                          class="user-img"
                          // style="background-image: url(images/person_2.jpg)"
                        ></div>
                        <div class="pl-3">
                          <p class="name">Roger Scott</p>
                          <span class="position">Marketing Manager</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="testimony-wrap py-4">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="fa fa-quote-left"></span>
                    </div>
                    <div class="text">
                      <p class="mb-4">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <div class="d-flex align-items-center">
                        <div
                          class="user-img"
                          // style="background-image: url(images/person_3.jpg)"
                        ></div>
                        <div class="pl-3">
                          <p class="name">Roger Scott</p>
                          <span class="position">Marketing Manager</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="testimony-wrap py-4">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="fa fa-quote-left"></span>
                    </div>
                    <div class="text">
                      <p class="mb-4">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <div class="d-flex align-items-center">
                        <div
                          class="user-img"
                          // style="background-image: url(images/person_1.jpg)"
                        ></div>
                        <div class="pl-3">
                          <p class="name">Roger Scott</p>
                          <span class="position">Marketing Manager</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="testimony-wrap py-4">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="fa fa-quote-left"></span>
                    </div>
                    <div class="text">
                      <p class="mb-4">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <div class="d-flex align-items-center">
                        <div
                          class="user-img"
                          // style="background-image: url(images/person_2.jpg)"
                        ></div>
                        <div class="pl-3">
                          <p class="name">Roger Scott</p>
                          <span class="position">Marketing Manager</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section class="ftco-section ftco-no-pt bg-light ftco-faqs">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="img-faqs w-100">
                <div
                  class="img mb-4 mb-sm-0"
                  style="background-image:url(images/about-2.jpg);"
                ></div>
                <div
                  class="img img-2 mb-4 mb-sm-0"
                  style="background-image:url(images/about-1.jpg);"
                ></div>
              </div>
            </div>
            <div class="col-lg-6 pl-lg-5">
              <div class="heading-section mb-5 mt-5 mt-lg-0">
                <span class="subheading">FAQs</span>
                <h2 class="mb-3">Frequently Asks Questions</h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
              <div
                id="accordion"
                class="myaccordion w-100"
                aria-multiselectable="true"
              >
                <div class="card">
                  <div class="card-header p-0" id="headingOne">
                    <h2 class="mb-0">
                      <button
                        href="#collapseOne"
                        class="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link"
                        data-parent="#accordion"
                        data-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <p class="mb-0">How to fixed a problem?</p>
                        <i class="fa" aria-hidden="true"></i>
                      </button>
                    </h2>
                  </div>
                  <div
                    class="collapse show"
                    id="collapseOne"
                    role="tabpanel"
                    aria-labelledby="headingOne"
                  >
                    <div class="card-body py-3 px-0">
                      <ol>
                        <li>Far far away, behind the word mountains</li>
                        <li>Consonantia, there live the blind texts</li>
                        <li>
                          When she reached the first hills of the Italic
                          Mountains
                        </li>
                        <li>
                          Bookmarksgrove, the headline of Alphabet Village
                        </li>
                        <li>Separated they live in Bookmarksgrove right</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header p-0" id="headingTwo" role="tab">
                    <h2 class="mb-0">
                      <button
                        href="#collapseTwo"
                        class="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link"
                        data-parent="#accordion"
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <p class="mb-0">How to manage your business loans?</p>
                        <i class="fa" aria-hidden="true"></i>
                      </button>
                    </h2>
                  </div>
                  <div
                    class="collapse"
                    id="collapseTwo"
                    role="tabpanel"
                    aria-labelledby="headingTwo"
                  >
                    <div class="card-body py-3 px-0">
                      <ol>
                        <li>Far far away, behind the word mountains</li>
                        <li>Consonantia, there live the blind texts</li>
                        <li>
                          When she reached the first hills of the Italic
                          Mountains
                        </li>
                        <li>
                          Bookmarksgrove, the headline of Alphabet Village
                        </li>
                        <li>Separated they live in Bookmarksgrove right</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header p-0" id="headingThree" role="tab">
                    <h2 class="mb-0">
                      <button
                        href="#collapseThree"
                        class="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link"
                        data-parent="#accordion"
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <p class="mb-0">How to grow your investments funds?</p>
                        <i class="fa" aria-hidden="true"></i>
                      </button>
                    </h2>
                  </div>
                  <div
                    class="collapse"
                    id="collapseThree"
                    role="tabpanel"
                    aria-labelledby="headingTwo"
                  >
                    <div class="card-body py-3 px-0">
                      <ol>
                        <li>Far far away, behind the word mountains</li>
                        <li>Consonantia, there live the blind texts</li>
                        <li>
                          When she reached the first hills of the Italic
                          Mountains
                        </li>
                        <li>
                          Bookmarksgrove, the headline of Alphabet Village
                        </li>
                        <li>Separated they live in Bookmarksgrove right</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header p-0" id="headingFour" role="tab">
                    <h2 class="mb-0">
                      <button
                        href="#collapseFour"
                        class="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link"
                        data-parent="#accordion"
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        <p class="mb-0">
                          What are those requirements for businesses?
                        </p>
                        <i class="fa" aria-hidden="true"></i>
                      </button>
                    </h2>
                  </div>
                  <div
                    class="collapse"
                    id="collapseFour"
                    role="tabpanel"
                    aria-labelledby="headingTwo"
                  >
                    <div class="card-body py-3 px-0">
                      <p>
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove right at
                        the coast of the Semantics, a large language ocean.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center pb-5 mb-3">
            <div class="col-md-7 heading-section text-center ftco-animate">
              <span class="subheading">News &amp; Blog</span>
              <h2>Latest news from our blog</h2>
            </div>
          </div>
          <div class="row d-flex">
            <div class="col-md-4 d-flex ftco-animate">
              <div class="blog-entry align-self-stretch">
                <a
                  href="blog-single.html"
                  class="block-20 rounded"
                  style="background-image: url('images/image_1.jpg');"
                ></a>
                <div class="text p-4">
                  <div class="meta mb-2">
                    <div>
                      <a href="#">March 31, 2020</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" class="meta-chat">
                        <span class="fa fa-comment"></span> 3
                      </a>
                    </div>
                  </div>
                  <h3 class="heading">
                    <a href="#">
                      Even the all-powerful Pointing has no control about the
                      blind texts
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div class="col-md-4 d-flex ftco-animate">
              <div class="blog-entry align-self-stretch">
                <a
                  href="blog-single.html"
                  class="block-20 rounded"
                  style="background-image: url('images/image_2.jpg');"
                ></a>
                <div class="text p-4">
                  <div class="meta mb-2">
                    <div>
                      <a href="#">March 31, 2020</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" class="meta-chat">
                        <span class="fa fa-comment"></span> 3
                      </a>
                    </div>
                  </div>
                  <h3 class="heading">
                    <a href="#">
                      Even the all-powerful Pointing has no control about the
                      blind texts
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div class="col-md-4 d-flex ftco-animate">
              <div class="blog-entry align-self-stretch">
                <a
                  href="blog-single.html"
                  class="block-20 rounded"
                  style="background-image: url('images/image_3.jpg');"
                ></a>
                <div class="text p-4">
                  <div class="meta mb-2">
                    <div>
                      <a href="#">March 31, 2020</a>
                    </div>
                    <div>
                      <a href="#">Admin</a>
                    </div>
                    <div>
                      <a href="#" class="meta-chat">
                        <span class="fa fa-comment"></span> 3
                      </a>
                    </div>
                  </div>
                  <h3 class="heading">
                    <a href="#">
                      Even the all-powerful Pointing has no control about the
                      blind texts
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section class="ftco-section ftco-no-pb ftco-no-pt bg-secondary">
        <div class="container py-5">
          <div class="row">
            <div class="col-md-7 d-flex align-items-center">
              <h2 class="mb-3 mb-sm-0" style={{ color: "black", font: "22px" }}>
                Sign Up for Your Free 1st Accounting Consultation
              </h2>
            </div>
            <div class="col-md-5 d-flex align-items-center">
              <form action="#" class="subscribe-form">
                <div class="form-group d-flex">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter email address"
                  />
                  <input type="submit" value="Subscribe" class="submit px-3" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Plans />

      <footer class="footer">
        <div class="container-fluid px-lg-5">
          <div class="row">
            <div class="col-md-9 py-5">
              <div class="row">
                <div class="col-md-4 mb-md-0 mb-4">
                  <h2 class="footer-heading">About us</h2>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                  {/* <ul class="ftco-footer-social p-0">
                    <li class="ftco-animate">
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Twitter"
                      >
                        <span class="fa fa-twitter"></span>
                      </a>
                    </li>
                    <li class="ftco-animate">
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Facebook"
                      >
                        <span class="fa fa-facebook"></span>
                      </a>
                    </li>
                    <li class="ftco-animate">
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Instagram"
                      >
                        <span class="fa fa-instagram"></span>
                      </a>
                    </li>
                  </ul> */}
                </div>
                <div class="col-md-8">
                  <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-10">
                      <div class="row">
                        <div class="col-md-4 mb-md-0 mb-4">
                          <h2 class="footer-heading">Services</h2>
                          <ul class="list-unstyled">
                            <li>
                              <span class="py-1 d-block">Market Analysis</span>
                            </li>
                            <li>
                              <span class="py-1 d-block">
                                Accounting Advisor
                              </span>
                            </li>
                            <li>
                              <span class="py-1 d-block">
                                General Consultancy
                              </span>
                            </li>
                            <li>
                              <span class="py-1 d-block">
                                Structured Assestment
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-4 mb-md-0 mb-4">
                          <h2 class="footer-heading">Discover</h2>
                          <ul class="list-unstyled">
                            <li>
                              <span class="py-1 d-block">About us</span>
                            </li>
                            <li>
                              <span class="py-1 d-block">Contract us</span>
                            </li>
                            <li>
                              <span class="py-1 d-block">
                                Terms &amp; Conditions
                              </span>
                            </li>
                            <li>
                              <span class="py-1 d-block">Policies</span>
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-4 mb-md-0 mb-4">
                          <h2 class="footer-heading">Resources</h2>
                          <ul class="list-unstyled">
                            <li>
                              <span class="py-1 d-block">Security</span>
                            </li>
                            <li>
                              <span class="py-1 d-block">Global</span>
                            </li>
                            <li>
                              <span class="py-1 d-block">Charts</span>
                            </li>
                            <li>
                              <span class="py-1 d-block">Privacy</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-md-5">
                <div class="col-md-12">
                  {/* <p class="copyright"><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
          Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a>
    <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p> */}
                </div>
              </div>
            </div>
            <div class="col-md-3 py-md-5 py-4 aside-stretch-right pl-lg-5">
              <h2 class="footer-heading">Free consultation</h2>
              <form action="#" class="form-consultation">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Subject"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="3"
                    class="form-control"
                    placeholder="Message"
                  ></textarea>
                </div>
                <div class="form-group">
                  <button type="submit" class="form-control submit px-3">
                    Send A Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>

      {/* <div id="ftco-loader" class="show fullscreen">
        <svg class="circular" width="48px" height="48px">
          <circle
            class="path-bg"
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke-width="4"
            stroke="#eeeeee"
          />
          <circle
            class="path"
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke-width="4"
            stroke-miterlimit="10"
            stroke="#F96D00"
          />
        </svg>
      </div> */}
    </>
  );
};

export default LandingPage;
