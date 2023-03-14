import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import About from "../../Components/BusinessProfile/EditAbout/EditAbout";
import Portfolio from "../../Components/BusinessProfile/PortfolioList/PortfolioList";
import Services from "../../Components/BusinessProfile/ServiceList/ServiceList";
import Projects from "../../Components/BusinessProfile/ProjectList/ProjectsList";
import "./BusinessEdit.css";
import { Link, useParams, useLocation } from "react-router-dom";
function BusinessEdit() {
  const { businessId } = useParams();
  const { pathname } = useLocation();
  const baseRoute = `/business/${businessId}/edit/`;
  return (
    <Container>
      <Row>
        <Col md={2}>
          <SidebarList>
            <Link to={baseRoute + "about"}>
              <li
                className={`${
                  pathname === baseRoute + "about" || pathname === baseRoute
                    ? "selectedListItem"
                    : null
                }`}
              >
                Edit About
              </li>
            </Link>
            <Link to={baseRoute + "services"}>
              <li
                className={`${
                  pathname === baseRoute + "services"
                    ? "selectedListItem"
                    : null
                }`}
              >
                Edit Services
              </li>
            </Link>
            <Link to={baseRoute + "projects"}>
              <li
                className={`${
                  pathname === baseRoute + "projects"
                    ? "selectedListItem"
                    : null
                }`}
              >
                Edit Projects
              </li>
            </Link>
            <Link to={baseRoute + "portfolio"}>
              <li
                className={`${
                  pathname === baseRoute + "portfolio"
                    ? "selectedListItem"
                    : null
                }`}
              >
                Edit Portfolio
              </li>
            </Link>
            <Link to={baseRoute + "Jobs"}>
              <li>Edit Jobs</li>
            </Link>
          </SidebarList>
        </Col>
        <Col>
          <Routes>
            <Route path="" element={<About />} />
            <Route path="about" element={<About />} />
            <Route path="portfolio" element={<Portfolio edit={true} />} />
            <Route path="projects" element={<Projects edit={true} />} />
            <Route path="services" element={<Services edit={true} />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}
const SidebarList = styled.ul`
  list-style: none;
  padding: 15px 0;
  background-color: #cbcaca7d;
  color: #212529;
  border-radius: 20px;
  a {
    color: #212529;
  }
  li {
    padding: 10px 20px;
  }
  li:hover {
    background-color: #04d76a;
    color: white;
    cursor: pointer;
  }
`;

export default BusinessEdit;
