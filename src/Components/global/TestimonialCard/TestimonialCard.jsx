import React from "react";
import styled from "styled-components";
import Quotes from "../../../Assets/svg/quotes.svg";
function TestimonialCard() {
  return (
    <TestimonialCardDiv>
      <img src={Quotes} alt="quotes" />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt sed
        incidunt rem beatae magni minima facilis libero illo magnam laudantium a
        nostrum molestias doloribus, atque hic voluptatum mollitia quo, quidem
        excepturi tempore expedita impedit quas! Dolores illum deserunt maiores
        labore optio similique vel, ullam dolore architecto delectus quod veniam
        magnam?
      </p>
      <TestimonialAuthor>
        by <span>Sasha Ho</span>
      </TestimonialAuthor>
    </TestimonialCardDiv>
  );
}
const TestimonialCardDiv = styled.div`
  padding: 20px;
  border: 1px solid rgba(4, 215, 106, 0.5);
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 20px;
  p {
    font-family: "Roboto Italic", sans-serif !important;
    font-size: clamp(14px, 1vw, 16px);
    color: #666666;
    margin-top: 15px;
  }
`;
const TestimonialAuthor = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: clamp(14px, 1.5vw, 16px);
  span {
    font-weight: 600;
  }
`;
export default TestimonialCard;
