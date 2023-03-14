import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
function ServiceCard({
  image,
  title,
  category,
  description,
  setEditModal,
  setBookServiceModal,
  serviceId,
  setEditServiceId,
  edit,
}) {
  return (
    <PortfolioCardContainer>
      <PortfolioImage image={image}>
        {edit === true && (
          <EditButton
            onClick={(e) => {
              setEditModal(true);
              setEditServiceId(serviceId);
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </EditButton>
        )}
      </PortfolioImage>
      <PortfolioContent>
        <Row className="align-items-center">
          <Col>
            <PortfolioTitle>
              <h3 className="text-start">{title}</h3>
            </PortfolioTitle>
          </Col>
          <Col>
            <Price>
              <span>Starting from </span>$300
            </Price>
          </Col>
        </Row>

        <PortfolioCategory>{category}</PortfolioCategory>
        <PortfolioDescription>{description}</PortfolioDescription>
        <BookButton onClick={(e) => setBookServiceModal(true)}>
          Book Now
        </BookButton>
      </PortfolioContent>
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
const Price = styled.p`
  font-family: "Roboto Medium", sans-serif !important;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  text-align: right;
  span {
    color: #06c864;
    font-family: "Roboto", sans-serif !important;
  }
`;
const BookButton = styled.button`
  background-color: #06c864;
  font-family: "Roboto Medium", sans-serif;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;
const PortfolioCategory = styled.div`
  font-family: "Roboto Medium", sans-serif;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  color: #3f464e;
  margin-top: 10px;
`;
const PortfolioCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 300px; */
  border-radius: 20px;
  margin-top: 10px;
`;
const PortfolioContent = styled.div`
  padding: 20px;
  border: 2px solid #e1e1e1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top: transparent;
`;
const PortfolioImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-image: ${(props) => `url(${props.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color: red; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
const PortfolioTitle = styled.div`
  font-family: "Circular Std", sans-serif;
  font-size: clamp(22px, 1.6vw, 32px) !important;
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
  margin-top: 5px;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
`;
export default ServiceCard;
