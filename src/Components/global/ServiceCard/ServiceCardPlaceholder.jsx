import React from "react";
import styled from "styled-components";
import { Row, Col, Placeholder } from "react-bootstrap";
function ServiceCardPlaceholder({}) {
  return (
    <DummyContainer>
      <DummyImage />
      <DummyContent>
        <Row className="align-items-center">
          <Col>
            <PortfolioTitle>
              <Placeholder animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
            </PortfolioTitle>
          </Col>
          <Col>
            <Placeholder xs={7} />
          </Col>
        </Row>

        <Placeholder animation="wave">
          <Placeholder xs={7} />
        </Placeholder>
        <Placeholder animation="wave">
          <Placeholder xs={7} />
        </Placeholder>
      </DummyContent>
    </DummyContainer>
  );
}

const DummyContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 300px; */
  border-radius: 20px;
  margin-top: 10px;
`;
const DummyContent = styled.div`
  padding: 20px;
  border: 2px solid #e1e1e1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top: transparent;
`;
const DummyImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #b4b3b3;
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
export default ServiceCardPlaceholder;
