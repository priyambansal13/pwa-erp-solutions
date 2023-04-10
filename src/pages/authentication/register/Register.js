import React, { useEffect, useState } from "react";
import "./Register.scss";
import api from "../../../services/common-api";
import AuthWrapper from "../AuthWrapper";
import { Grid, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SubscriptionPlanModal from "./subscrptionCard";
import BigModalDialog from "../../../components/shared/Modal-Dialog/BigModalDialog";
import { Button, Card } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [organizationList, setOrganizationList] = useState(null);
  const [planList, setPlanList] = useState(null);
  const [subscriptionModal, setSubscriptionModal] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    getOrganizationList();
    getPlanList();
  }, []);

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const getOrganizationList = async () => {
    const response = await api.getOrganizations();
    setOrganizationList(response.data);
  };

  const getPlanList = async () => {
    const response = await api.getPlans();
    setPlanList(response.data);
  };

  const closeModal = () => {
    setSubscriptionModal(false);
  };

  const getOrganizationMenu = () => {
    const menuList =
      organizationList !== null && organizationList?.length > 0 ? (
        organizationList.map((organization) => {
          return (
            organization.email !== "adminOfficial@phineco.com" && (
              <option key={organization.id} value={organization.id}>
                {organization.name}
              </option>
            )
          );
        })
      ) : (
        <option key={"none"} value="">
          NONE
        </option>
      );

    organizationList !== null &&
      menuList.unshift(
        <option key={"select"} value="select">
          Select
        </option>
      );

    return menuList;
  };

  const addPlan = (plan) => {
    console.log(plan);
    setSelectedPlan(plan);
    setFormState({ ...formState, planId: plan.id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formState", formState);
    delete formState.confirmPassword;

    const res = await api.signup(formState);
    navigate("/login");

    console.log(res);
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
                      Name
                    </label>
                    <input
                      type="text"
                      id="form3Example1"
                      className="form-control"
                      required
                      name="name"
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
                <div className="col-md-6 mb-2">
                  <div className="form-outline">
                    <label className="form-label" for="form3Example4">
                      Address
                    </label>
                    <input
                      id="form3Example4"
                      className="form-control"
                      required
                      name="address"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-outline">
                    <label className="form-label" for="form3Example4">
                      Organization
                    </label>
                    <select
                      className="form-control"
                      required
                      onChange={handleChange}
                      name="organizationId"
                    >
                      {getOrganizationMenu()}
                    </select>
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
                      name="confirmPassword"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <Button
                  type="link"
                  style={{
                    fontWeight: "500",
                    justifyContent: "flex-end",
                    display: "flex",
                    marginRight: "15px",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                  required
                  onClick={() => {
                    setSubscriptionModal(true);
                  }}
                >
                  + Add Subsciption Plan
                </Button>
              </div>
              {selectedPlan !== null && (
                <div className="row mb-4">
                  <Card
                    title={
                      <b style={{ color: "Green" }}>{selectedPlan.title}</b>
                    }
                  >
                    <p>
                      <strong>Price:</strong> ${selectedPlan.price}/month
                    </p>
                    <p>
                      <strong>Features:</strong>
                    </p>
                    <ul>
                      <li key={`${selectedPlan.id}storage`}>
                        {selectedPlan.storage}
                      </li>
                      <li key={`${selectedPlan.id}customer`}>
                        {selectedPlan.customers}
                      </li>
                      <li key={`${selectedPlan.id}supplier`}>
                        {selectedPlan.suppliers}
                      </li>
                      <li key={`${selectedPlan.id}support`}>
                        {selectedPlan.support}
                      </li>
                    </ul>
                  </Card>
                </div>
              )}

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

        <BigModalDialog
          showModal={subscriptionModal}
          closeModal={closeModal}
          modalData={planList}
          submitData={addPlan}
          modalBody={SubscriptionPlanModal}
          // selectedDataForView={selectedSale}
          // viewType={viewType}
          width={1000}
        />
      </AuthWrapper>
    </>
  );
};

export default Register;
