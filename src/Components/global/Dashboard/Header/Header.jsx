import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Header.scss";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  FormControl,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import Flushlogo from "src/Assets/images/Logo.png";
import MyAccountImg from "src/Assets/images/my_account.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCaretDown,
  faEnvelope,
  faHome,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { HeaderLinks, GrayButton, LinkButton } from "../../../../Styles/Styles";
import { useSelector, useDispatch } from "react-redux";
const DashBoardHeader = () => {
  let { userDetail, userId } = useSelector((state) => state.auth);
  function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }
  const user_businesses = useSelector(
    (state) => state.auth?.userDetail?.business_list
  );
  return (
    <>
      <section>
        <Navbar
          collapseOnSelect
          expand="xl"
          bg="light"
          className="BgCustomer"
          variant="light"
        >
          <Container>
            <Link to="/feed">
              <Navbar.Brand>
                {" "}
                <img src={Flushlogo} />
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="align-items-center"
            >
              <Nav className="ms-auto align-items-center">
                <NavDropdown
                  title="Services"
                  id="basic-nav-dropdown"
                  className="h-c"
                >
                  <NavDropdown.Item>
                    <HeaderLinks className="p-0" to="/services">
                      All Services
                    </HeaderLinks>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <HeaderLinks className="p-0" to="/services/booked">
                      Booked Services
                    </HeaderLinks>
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <HeaderLinks to="/services"> Services</HeaderLinks> */}
                {user_businesses && (
                  <>
                    {/* <HeaderLinks to="/jobs"> Jobs </HeaderLinks> */}
                    <NavDropdown
                      title="Jobs"
                      id="basic-nav-dropdown"
                      className="h-c"
                    >
                      <NavDropdown.Item>
                        <HeaderLinks className="p-0" to="/jobs">
                          All Jobs
                        </HeaderLinks>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <HeaderLinks className="p-0" to="/jobs/saved">
                          Saved Jobs
                        </HeaderLinks>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <HeaderLinks className="p-0" to="/jobs/applied">
                          Applied Jobs
                        </HeaderLinks>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}

                <HeaderLinks to="/marketplace"> Events</HeaderLinks>
                <HeaderLinks to="/marketplace"> Community</HeaderLinks>
                <HeaderLinks to="/marketplace"> About Us</HeaderLinks>
                <HeaderLinks to="/marketplace"> Contact Us</HeaderLinks>
              </Nav>
              <FullWidthBtn className=" d-flex justify-content-center">
                <Link to="/create-business/step1">
                  <GrayButton>Create a Business</GrayButton>
                </Link>
              </FullWidthBtn>

              <Nav className="flex-shrink-0">
                <Nav.Link href="#deets">
                  <div className="d-flex justify-content-content flex-column ">
                    <FontAwesomeIcon icon={faHome} />
                    <p className="fs-12 m-0 text-center text-lg-start">Home</p>
                  </div>
                </Nav.Link>
                <Nav.Link href="#deets">
                  <div className="d-flex justify-content-content flex-column ">
                    <FontAwesomeIcon icon={faBell} />
                    <p className="fs-12 m-0 text-center text-lg-start">
                      Alerts
                    </p>
                  </div>
                </Nav.Link>
                <Nav.Link href="#deets">
                  <div className="d-flex justify-content-content flex-column ">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p className="fs-12 m-0 text-center text-lg-start">Inbox</p>
                  </div>
                </Nav.Link>
                <Dropdown align="end" className="d-flex">
                  <Dropdown.Toggle className="BgCustomer" id="dropdown-basic">
                    <img
                      src={
                        validateUrl(userDetail?.profile_photo)
                          ? userDetail?.profile_photo
                          : MyAccountImg
                      }
                      width="30"
                      height="30"
                      alt="profile"
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropDownMenu fs-16">
                    <div className="dropDownHeader">
                      <p className="dropDowncenter">{`${userDetail?.first_name} ${userDetail?.last_name}`}</p>
                    </div>

                    {/* <Dropdown.Divider /> */}
                    <Dropdown.Header className="fs-16 fw-bold">
                      Account{' '}
                      <FontAwesomeIcon
                        icon={faCaretDown}
                      />
                    </Dropdown.Header>

                    <Dropdown.Item>
                      <LinkButton to={`/profile/${userId}`}>
                        My Profile{" "}
                      </LinkButton>
                    </Dropdown.Item>

                    {user_businesses && user_businesses.length > 0 && (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Header className="fs-16 fw-bold">
                          My Businesses{" "}
                        </Dropdown.Header>
                        <Dropdown.Item>
                          <LinkButton
                            to={`/business/${user_businesses[0].business_profile_id}`}
                          >
                            View {user_businesses[0].business_name}
                          </LinkButton>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <LinkButton
                            to={`/business/${user_businesses[0].business_profile_id}/edit`}
                          >
                            Edit {user_businesses[0].business_name}
                          </LinkButton>
                        </Dropdown.Item>
                      </>
                    )}

                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-2" style={{
                      textAlign: 'center',
                      padding: '10px',
                      color: 'var(--primary-color)'
                    }}>
                      Sign Out
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>
    </>
  );
};
const FullWidthBtn = styled.div`
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
export default DashBoardHeader;
