import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [appState, setAppState] = useState({
    isLoggedIn: false,
    user: null,
    loading: false,
  });
  const [formState, setFormState] = useState({});
  const [loginData, setLoginData] = useState({});

  // useEffect(() => {
  //   console.log("login");
  //   (async () => {
  //     setAppState({ ...appState, loading: true });
  //     // let accessToken = localStorage.getItem("accessToken");
  //     // if (accessToken) {
  //     try {
  //       const res = await api.getProtected();
  //       console.log(res.data);
  //       setAppState({
  //         ...appState,
  //         isLoggedIn: true,
  //         user: res.data.user,
  //         loading: false,
  //       });
  //       setFormState({ ...formState });
  //     } catch (error) {
  //       console.error(error);
  //       alert(error.response.data.error);
  //       setAppState({ ...appState, loading: false });
  //     }
  //     // }
  //   })();
  //   // eslint-disable-next-line
  // }, [loginData]);

  useEffect(() => {
    console.log();
  }, [loginData]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      setAppState({ ...appState, loading: true });

      // eslint-disable-next-line
      switch (e.target.name) {
        case "login":
          res = await api.login(formState);
          break;
      }
      let loginData = res.data;
      localStorage.setItem("accessToken", loginData.accessToken);
      localStorage.setItem("refreshToken", loginData.refreshToken);
      localStorage.setItem("userId", loginData.id);
      localStorage.setItem("userName", loginData.username);
      setLoginData(loginData);

      navigate("/pwa-erp-solutions/dashboard");
    } catch (error) {
      console.error(error);
      setAppState({ ...appState, loading: false });
      alert(error.response.data.error);
    }
  };

  const handleLogout = async () => {
    await api.getProtected({
      // name: "test",
      // address: "string",
      // phoneNumber: "9876543210",
      // email: "test@gmail.com",
      // gstNumber: "07CBSPA0000AB1Z",
      // status: "string",
      // roles: [
      //   {
      //     id: 1,
      //   },
      // ],

      name: "sacvfewf",
      description: "stcadsfing",
    });
    // try {
    //   setAppState({ ...appState, loading: true });
    //   let refreshToken = localStorage.getItem("refreshToken");
    //   localStorage.removeItem("accessToken");
    //   localStorage.removeItem("refreshToken");
    //   await api.logout(refreshToken);
    //   window.location.reload();
    // } catch (error) {
    //   console.error(error);
    //   setAppState({ ...appState, loading: false });
    //   alert(error.response.data.error);
    // }
  };
  return (
    <>
      <section class="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <div
                class="card"
                //   style={{ borderRadius: "1rem" }}
              >
                <div class="row g-0">
                  <div class="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                      alt="login form"
                      class="img-fluid"
                      //   style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>

                  <div class="col-md-6 col-lg-7 d-flex align-items-center">
                    <div class="card-body p-4 p-lg-5 text-black">
                      {appState.loading && (
                        <div className={`show user-info`}>
                          <p>Logged in user:</p>
                          <h4>
                            {appState.isLoggedIn && appState.user.username}
                          </h4>
                          <button onClick={handleLogout}>Log Out</button>
                        </div>
                      )}
                      <form>
                        <div class="d-flex align-items-center mb-3 pb-1">
                          <i
                            class="fas fa-cubes fa-2x me-3"
                            // style={{ color: "#ff6219" }}
                          ></i>
                          <span class="h1 fw-bold mb-0">Logo</span>
                        </div>

                        <h5
                          class="fw-normal mb-3 pb-3"
                          //   style="letter-spacing: 1px;"
                        >
                          Sign into your account
                        </h5>

                        <div class="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            name="username"
                            class="form-control form-control-lg"
                            onChange={handleChange}
                          />
                          <label class="form-label" for="form2Example17">
                            Email address
                          </label>
                        </div>

                        <div class="form-outline mb-4">
                          <input
                            type="password"
                            name="password"
                            id="form2Example27"
                            class="form-control form-control-lg"
                            onChange={handleChange}
                          />
                          <label class="form-label" for="form2Example27">
                            Password
                          </label>
                        </div>

                        <div class="pt-1 mb-4">
                          <button
                            class="btn btn-dark btn-lg btn-block"
                            type="button"
                            name="login"
                            onClick={handleSubmit}
                          >
                            Login
                          </button>
                        </div>

                        <a class="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p
                          class="mb-5 pb-lg-2"
                          // style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <Link
                            to="/pwa-erp-solutions/register"

                            //   style={{ color: "#393f81" }}
                          >
                            Register here
                          </Link>
                        </p>
                        <a href="#!" class="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" class="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>

                    {/* {!appState.loading && (
                      <div className={`show user-info`}>
                        <p>Logged in user:</p>
                        <h4>{appState.isLoggedIn && appState.user.username}</h4>
                        <button onClick={handleLogout}>Log Out</button>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
