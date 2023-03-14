import React from "react";
import DashBoardFooter from "src/Components/global/Footer/Footer";
import DashBoardHeader from "../Header/Header";
import DashBoardLeftSidebar from "../LeftSidebar/LeftSidebar";
import DashboardRightSidebar from "../RightSidebar/RightSidebar";
import { Container, Row, Col } from "react-bootstrap";
const Layout = ({ children, type = "plain" }) => {
  if (type == "plain")
    return (
      <>
        <section>
          <DashBoardHeader />
          {children}
          <DashBoardFooter />
        </section>
      </>
    );
  if (type == "leftsidebar")
    return (
      <>
        <section>
          <DashBoardHeader />
          <section>
            <Container>
              <Row>
                <Col lg={3} md={4} className=" d-none d-sm-none d-md-block">
                  <DashBoardLeftSidebar />
                </Col>
                <Col lg={9} md={8}>
                  {children}
                </Col>
              </Row>
            </Container>
          </section>
          <DashBoardFooter />
        </section>
      </>
    );
  if (type == "bothsidebar")
    return (
      <>
        <section>
          <DashBoardHeader />
          <section>
            <Container>
              <Row>
                <Col lg={3} md={4} className=" d-none d-sm-none d-md-block">
                  <DashBoardLeftSidebar />
                </Col>
                <Col lg={6} md={8}>
                  {children}
                </Col>
                <Col lg={3} className="d-none d-md-none d-lg-block">
                  <DashboardRightSidebar />
                </Col>
              </Row>
            </Container>
          </section>
          <DashBoardFooter />
        </section>
      </>
    );
};

export default Layout;
