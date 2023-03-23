import React, { useState } from "react";
import "./Register.scss";
import api from "../../../services/api";
import AuthWrapper from "../AuthWrapper";
import { Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  const [formState, setFormState] = useState({});

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("formState", formState);

    formState["organization"] = { id: 1 };
    formState["plan"] = { id: 1 };
    e.preventDefault();
    try {
      let res;
      // setAppState({ ...appState, loading: true });
      //const { username, password } = formState;
      // eslint-disable-next-line
      switch (e.target.name) {
        case "SignUp":
          res = await api.signup(formState);
          break;
      }
      console.log(res.data);
      // localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);

      // window.location.reload();
    } catch (error) {
      console.error(error);
      // setAppState({ ...appState, loading: false });
      alert(error.response.data.error);
    }
  };
  return (
    <>
      <AuthWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ mb: { xs: -0.5, sm: 0.5 } }}
            >
              <Typography variant="h3">Sign up</Typography>
              <Typography
                component={Link}
                to="/login"
                variant="body1"
                sx={{ textDecoration: "none" }}
                color="primary"
              >
                Already have an account?
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <form>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="form-outline">
                    <label className="form-label" for="form3Example1">
                      First name
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className="form-control"
                      required
                      name="firstName"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-outline">
                    <label className="form-label" for="form3Example2">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="form3Example2"
                      className="form-control"
                      name="lastName"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="form-outline">
                    <label className="form-label" for="form3Example1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="form3Example1"
                      className="form-control"
                      required
                      name="phoneNumber"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-outline ">
                    <label className="form-label" for="form3Example3">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      required
                      name="username"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="form-outline">
                    <label className="form-label" for="form3Example4">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      required
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-outline ">
                    <label className="form-label" for="form3Example4">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      required
                      // onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="form-check d-flex mb-4 mt-4 ">
                    <label className="form-check-label" for="form2Example33">
                      Is GST Registered?{" "}
                    </label>
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example33"
                      checked
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <label className="form-label" for="form3Example2">
                      GST Number
                    </label>
                    <input
                      type="text"
                      id="form3Example2"
                      className="form-control"
                      required={true}
                      name="gstNumber"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-2">
                  <div className="form-outline">
                    <div class="plan ">
                      <div class="details">
                        <span class="price price-red">Rs 199</span>

                        <h1 class="plan-title">Monthly</h1>
                      </div>
                      <p class="plan-description">
                        Services available for 1 Month !
                      </p>
                      <button class="btn select">Select plan</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="form-outline">
                    <div class="plan ">
                      <div class="details">
                        <span class="price price-red">Rs 399</span>

                        <h1 class="plan-title">Quaterly</h1>
                      </div>
                      <p class="plan-description">
                        Services available for 3 Months !
                      </p>
                      <button class="btn select">Select plan</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="form-outline">
                    <div class="plan ">
                      <div class="details">
                        <span class="price price-red">Rs 1099</span>

                        <h1 class="plan-title">Yearly</h1>
                      </div>
                      <p class="plan-description">
                        Services available for 12 Months!
                      </p>
                      <button class="btn select">Select plan</button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                name="SignUp"
                className="btn btn-primary btn-block mb-4"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </form>
            {/* </div>
              </div>
            </div> */}
          </Grid>
        </Grid>
      </AuthWrapper>
    </>
  );
};

export default Register;
