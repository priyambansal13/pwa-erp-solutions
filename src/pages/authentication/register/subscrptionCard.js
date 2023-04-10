import React, { useEffect, useState } from "react";
import "./Register.scss";

const SubscriptionPlanModal = ({ closeModal, modalData, submitData }) => {
  const planData = [
    {
      id: "1",
      title: "Basic",
      price: 4.99,

      storage: "10 GB",
      customers: "10",
      suppliers: "10",
      support: "Email Support",
    },
    {
      id: "2",
      title: "Pro",
      price: 9.99,
      storage: "25 GB",
      customers: "50",
      suppliers: "50",
      support: "Email and phone Support",
    },
    {
      id: "3",
      title: "Premium",
      price: 19.99,

      storage: "100 GB",
      customers: "Unlimited",
      suppliers: "Unlimited",
      support: "Email and phone Support",
    },
  ];
  // eslint-disable-next-line
  const [planList, setPlanList] = useState(planData || null);

  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    console.log(modalData);
  }, [modalData]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = () => {
    // TODO: Implement subscription logic
    console.log(`Subscribing to plan ${selectedPlan}`);
    submitData(selectedPlan);
    setSelectedPlan(null);
    closeModal();
  };

  return (
    // <div className={`modal ${show ? "show" : ""}`}>

    <div className="subscription-plan">
      <div className="modal-header">
        <h5 className="modal-title">Select a Subscription Plan</h5>
        <button
          type="button"
          className="btn-close"
          onClick={closeModal}
        ></button>
      </div>
      <div className="modal-body">
        <div className="row">
          {planList !== null &&
            planList.length > 0 &&
            planList.map((plan) => {
              return (
                <div className="col-md-4 mb-4">
                  <div
                    className={`card ${
                      selectedPlan?.title === plan.title ? "selected" : ""
                    }`}
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{plan.title}</h5>
                      <p className="card-text">${plan.price}/month</p>
                      <ul>
                        <li>{plan.storage} Storage</li>
                        <li>{plan.customer} Customer</li>
                        <li>{plan.supplier} Supplier</li>
                        <li>{plan.support}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          {/* <div className="col-md-4 mb-4">
            <div
              className={`card ${selectedPlan === "pro" ? "selected" : ""}`}
              onClick={() => handleSelectPlan("pro")}
            >
              <div className="card-body">
                <h5 className="card-title">Pro</h5>
                <p className="card-text">$9.99/month</p>
                <ul>
                  <li>50GB Storage</li>
                  <li>50 Customer</li>
                  <li>50 Supplier</li>
                  <li>Phone and Email Support</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className={`card ${selectedPlan === "premium" ? "selected" : ""}`}
              onClick={() => handleSelectPlan("premium")}
            >
              <div className="card-body">
                <h5 className="card-title">Premium</h5>
                <p className="card-text">$19.99/month</p>
                <ul>
                  <li>100GB Storage</li>
                  <li>Unlimited Customer</li>
                  <li>Unlimited Supplier</li>
                  <li>Phone and Email Support</li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!selectedPlan}
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
    </div>

    // </div>
  );
};

export default SubscriptionPlanModal;
