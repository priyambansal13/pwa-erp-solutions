import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Users from "./Users";
import NavigationBar from "./NavigationBar";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        {/* {[false].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Brand href="#">React Progressive Web App</Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Offcanvas
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link>
                      <Link to="/pwa-erp-solutions/home">Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/pwa-erp-solutions/about">About</Link>
                      {/* <Link to="/about">About</Link> 
                    </Nav.Link>
                    <NavDropdown
                      title="Dropdown"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item>
                        <Link to="/pwa-erp-solutions/users">Users</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/pwa-erp-solutions/about">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))} */}

        <Routes>
          <Route path="/pwa-erp-solutions/" element={<About />}></Route>
          <Route path="/pwa-erp-solutions/about" element={<Home />}></Route>
          <Route path="/pwa-erp-solutions/users" element={<Users />}></Route>
          <Route path="/pwa-erp-solutions/login" element={<Login />}></Route>
          <Route
            path="/pwa-erp-solutions/register"
            element={<Register />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
