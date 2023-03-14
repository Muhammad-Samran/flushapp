import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Footer.css";
import Flushlogo from "src/Assets/images/Logo.png";
import { FooterLinks } from "../../../Styles/Styles";
const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer">
        <Container>
          <div className="d-sm-flex  justify-content-between align-items-center">
            <div>
              {" "}
              <img src={Flushlogo} />{" "}
            </div>
            <div>
              <FooterLinks to="/"> About</FooterLinks>
              <FooterLinks to="/"> Accessibility</FooterLinks>
              <FooterLinks to="/"> User Agreement</FooterLinks>
              <FooterLinks to="/"> Privacy Policy</FooterLinks>
              <FooterLinks to="/"> Cookies Policy</FooterLinks>
              <FooterLinks to="/"> Copyright</FooterLinks>
              <FooterLinks to="/"> Brand Policy</FooterLinks>
              <FooterLinks to="/"> Community Policy</FooterLinks>

              {/* <ul className="list-inline m-0 footer-pad">
                <li className="list-inline-item  footer-line-height">About</li>
                <li className="list-inline-item  footer-line-height">Accessibility</li>
                <li className="list-inline-item  footer-line-height">User Agreement</li>
                <li className="list-inline-item  footer-line-height">Privacy Policy</li>
                <li className="list-inline-item  footer-line-height">Cookies Policy</li>
                <li className="list-inline-item  footer-line-height">Copyright</li>
                <li className="list-inline-item  footer-line-height">Brand Policy</li>
                <li className="list-inline-item  footer-line-height">Community Policy</li>
              </ul> */}
            </div>
            {/* <div>
              <select className="lng-border">
                <option>Language</option>
                <option>Spnish</option>
                <option>English</option>
              </select>
            </div> */}
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
