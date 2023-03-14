import styled from "styled-components";
import { Link } from "react-router-dom";
export const H1 = styled.h1`
  font-family: "Circular Std", sans-serif;
  font-size: clamp(18px, 1.5vw, 20px) !important;
`;
export const H2 = styled.h2`
  font-family: "Poppins Semi Bold", sans-serif;
`;

export const H4 = styled.h4`
  font-family: "Roboto Medium", sans-serif;
  font-size: clamp(14px, 1vw, 16px) !important;
`;
export const P = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: clamp(14px, 1vw, 16px) !important;
`;
export const ColorPrimary = styled.span`
  color: #04d76a;
`;
export const BgPrimary = styled.span`
  background-color: #04d76a;
`;
export const SectionHeading = styled.h2`
  font-family: "Circular Std", sans-serif;
  font-size: clamp(20px, 1.6vw, 24px) !important;
  font-weight: 500;
  color: #3f464e;
  margin: 0;
`;
export const ViewAllLink = styled(Link)`
  color: #06c864;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  font-family: "Roboto", sans-serif;
  text-align: right;
`;
export const HeadingFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const BreakLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #e1e1e1;
  margin: 10px 0;
`;
export const DeleteBtn = styled.button`
  background-color: #d53221;
  padding: 5px 10px;
  font-family: "Roboto Medium", sans-serif;
  font-size: clamp(12px, 0.9vw, 14px) !important;
  color: white;
  border: none;
  border-radius: 5px;
  :hover {
    cursor: pointer;
    background-color: #c12c1f;
  }
  :active {
    transform: scale(0.95);
  }
`;
