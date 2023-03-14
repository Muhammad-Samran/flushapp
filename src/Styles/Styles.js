import styled from "styled-components";
import { Link } from "react-router-dom";
export const Typography = styled.div`
  font-family: ${(props) =>
    props.heading ? '"Roboto Medium", sans-serif' : '"Roboto", sans-serif'};
  font-size: ${(props) => (props.heading ? "1.5rem" : "1rem")};
  font-weight: ${(props) => (props.heading ? "500" : "400")};
  color: ${(props) => (props.color ? "#000" : "#fff")};
`;
export const HeaderLinks = styled(Link)`
  font-family: "Roboto Medium", sans-serif !important;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  color: #3f464e !important;
  line-height: 1;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
`;
export const FooterLinks = styled(Link)`
  font-family: "Roboto Medium", sans-serif !important;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  color: #3f464e !important;
  line-height: 1;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
`;
export const GrayButton = styled.button`
  font-family: "Roboto", sans-serif !important;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  color: white;
  background-color: #3f464e;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  :hover {
    background-color: #696a6a;
  }
`;
export const LinkButton = styled(Link)`
  font-family: "Roboto", sans-serif;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  color: #3f464e;
  padding: 10px 20px;
  width: 100%;
  display: block;

  :hover {
    color: #1e2125;
    background-color: #e9ecef;
  }
  :focus {
    background-color: #04d76a;
  }
`;
