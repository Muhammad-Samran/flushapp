import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { getUserPortfolios } from "../../../Services/PersonalProfile/getProfileData";
import PortfolioCard from "../../global/PortfolioCard/PortfolioCard";
function PortfolioList(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  // Get User Portfolios
  const [userPortfolios, setUserPortfolios] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    (async function () {
      try {
        const response = await getUserPortfolios(id);
        // console.log("Portfolios Data fetched");
        if (response instanceof Error) throw new Error("Invalid Response");
        // console.log(response);
        setUserPortfolios(response.data);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, [navigate]);
  return (
    <div>
      {props.children}
      <Portfolio id="portfolio">
        <Row className="align-items-center">
          <Col xs={6} className="mt-3">
            <SectionHeading>Portfolio</SectionHeading>
            <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
          </Col>
          {props.edit && (
            <Col xs={6} className="mt-3 d-flex justify-content-end">
              <EditButtonInline
                onClick={(e) => navigate(`${props.onAddNavigate}`)}
              >
                Add{" "}
                <span>
                  <FontAwesomeIcon icon={faPen} />
                </span>
              </EditButtonInline>
              {props.details ? null : (
                <ViewAllButton
                  onClick={(e) => navigate(`/profile/${id}/details/portfolio`)}
                >
                  View All/Edit
                </ViewAllButton>
              )}
            </Col>
          )}
        </Row>
        <PortfolioItemsContainer>
          {userPortfolios.map((item, index) => (
            <Link to={`/profile/${id}/details/portfolio/${item.portfolio_id}`}>
              <PortfolioCard
                key={index}
                image={
                  item.portfolio_media_url &&
                  item.portfolio_media_url.length > 0
                    ? item.portfolio_media_url[0].media_file
                    : null
                }
                title={item.portfolio_label}
                description={item.portfolio_details}
              />
            </Link>
          ))}
        </PortfolioItemsContainer>
      </Portfolio>
    </div>
  );
}
const Portfolio = styled.div`
  position: relative;
  margin-top: 40px;
`;
const PortfolioItemsContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 30px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;
const ViewAllButton = styled.button`
  background-image: linear-gradient(135deg, #04d78c, #3f464e);
  border-radius: 10px;
  outline: none;
  border: none;
  width: 125px;
  font-size: clamp(14px, 1.5vw, 16px);
  font-family: "Roboto Medium", sans-serif;
  padding: 10px;
  color: #f4f1f0;
  margin-left: 10px;
  float: right;
`;
const EditButtonInline = styled.button`
  float: right;
  background-color: #f4f1f0;
  color: #3f464e;
  border: none;
  padding: 10px 10px;
  border-radius: 10px;
`;
const SectionHeading = styled.h2`
  font-family: "Poppins Semi Bold", sans-serif;
  color: #3f464e;
  position: relative;
  font-size: clamp(19px, 12vw, 30px) !important;
`;
const SectionHeadingBottomBorder = styled.div`
  height: 2px;
  background-color: #04d76a;
  width: 50px;
`;
export default PortfolioList;
