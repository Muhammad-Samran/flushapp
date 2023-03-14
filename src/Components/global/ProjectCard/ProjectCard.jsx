import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
function ProjectCard({
  image,
  title,
  description,
  completion_date,
  budget,
  location,
  status,
  setEditModal,
  setEditProjectId,
  project_id,
  edit,
}) {
  return (
    <PortfolioCardContainer>
      {edit === true && (
        <EditButton
          onClick={(e) => {
            setEditProjectId(project_id);
            setEditModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </EditButton>
      )}

      <Row>
        <Col md={6} className="px-0">
          <PortfolioImage image={image}></PortfolioImage>
        </Col>
        <Col md={6} className="px-0">
          <PortfolioContent>
            <PortfolioTitle>
              <h3 className="text-start">{title}</h3>
            </PortfolioTitle>

            <div className="d-flex w-100">
              <span className="w-50">
                <Price>
                  Budget: <span> ${budget}</span>
                </Price>
              </span>
              <ListItem className="w-50">{status}</ListItem>
            </div>
            <div className="d-flex  mt-2 w-100">
              <span className="w-50">
                <GrayText>{location}</GrayText>
              </span>
              <ListItem className="w-50">
                <GreenText>{completion_date}</GreenText>
              </ListItem>
            </div>

            <PortfolioDescription>{description}</PortfolioDescription>
          </PortfolioContent>
        </Col>
      </Row>
      {/* <div className="d-flex flex-column flex-md-row">
        <div className=" w-100 w-md-50">
         
        </div>

      </div> */}
    </PortfolioCardContainer>
  );
}
const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  &:hover {
    background-color: #04d78c;
    color: #fff;
  }
`;
const GreenText = styled.span`
  color: #06c864;
  font-family: "Roboto", sans-serif !important;
  font-size: clamp(14px, 0.8vw, 16px) !important;
`;
const GrayText = styled.span`
  color: #999999;
  font-size: clamp(14px, 0.8vw, 16px) !important;
`;

const ListItem = styled.li`
  color: #999999;
  font-size: clamp(14px, 0.8vw, 16px) !important;
`;
const Price = styled.p`
  font-family: "Roboto Medium", sans-serif !important;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  /* text-align: right; */
  color: #3f464e;
  display: inline-block;
  span {
    color: #06c864;
    font-family: "Roboto", sans-serif !important;
  }
`;

const PortfolioCardContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  /* max-width: 300px; */
  border-radius: 20px;
  position: relative;
  margin-top: 10px;
`;
const PortfolioContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 30px;
  border: 2px solid #e1e1e1;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-left: transparent;
  background-color: white;
  @media screen and (max-width: 768px) {
    border-bottom-left-radius: 20px;
    border-top-right-radius: 0px;
    border-top: transparent;
  }
`;
const PortfolioImage = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  height: 100%;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color: red; */
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  @media screen and (max-width: 768px) {
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0px;
  }
`;
const PortfolioTitle = styled.div`
  font-family: "Circular Std", sans-serif;
  font-size: clamp(20px, 1vw, 24px) !important;
  margin: 0;
  color: #3f464e;
  white-space: nowrap;
  text-align: center;
  @media screen and (min-width: 768px) {
    text-align: start;
  }
`;
const PortfolioDescription = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: clamp(11px, 1vw, 14px);
  color: #666666;
  margin-top: 10px;
  letter-spacing: 0.5px;
`;
export default ProjectCard;
