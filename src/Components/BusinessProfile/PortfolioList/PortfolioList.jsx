import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PortfolioImage from "../../../Assets/images/personal_profile/Portfolio/Image1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { Col, Row, Modal } from "react-bootstrap";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { getUserPortfolios } from "../../../Services/PersonalProfile/getProfileData";
import PortfolioCard from "../../global/PortfolioCard/PortfolioCard";
import AddPortfolio from "../AddPortfolio/AddPortfolioContainer";
import ViewService from "../ViewService/ViewService";
import EditPortfolio from "../EditPortfolio/EditPortfolioContainer";

import Dummy1 from "../../../Assets/images/BusinessDummyImages/image1.jpg";
import Dummy2 from "../../../Assets/images/BusinessDummyImages/image2.jpg";
import Dummy3 from "../../../Assets/images/BusinessDummyImages/image3.jpg";
import Dummy4 from "../../../Assets/images/BusinessDummyImages/image4.jpg";
import useData from "src/Hook/useData";
import Loader from "src/Components/UI/Loader/Loader";
const ServicesData = [
  {
    image: Dummy1,
    title: "Cleaning",
    category: "Interior & Exterior Painting",
    startingPrice: 30,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
  {
    image: Dummy2,
    title: "Cleaning",
    category: "Interior & Exterior Painting",
    startingPrice: 30,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
  {
    image: Dummy3,
    title: "Cleaning",
    category: "Interior & Exterior Painting",
    startingPrice: 30,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
  {
    image: Dummy4,
    title: "Cleaning",
    category: "Interior & Exterior Painting",
    startingPrice: 30,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
];
function PortfolioList(props) {
  const { id, businessId } = useParams();
  const [
    loadingPortfolioList,
    portfolios,
    portfolioFetchError,
    refreshPortfolioList,
  ] = useData(`business/portfolio/?business_id=${businessId}
    
  `);
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  // Get User Portfolios
  const [BusinessProjects, setProjects] = useState([]);
  const [ProjectViewData, setProjectViewData] = useState();
  const [editPortfolioId, setEditPortfolioId] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (editModal == false && addModal == false) {
      refreshPortfolioList();
    }
  }, [addModal, editModal]);
  useEffect(() => {
    console.log(loadingPortfolioList, portfolios, portfolioFetchError);
  }, [loadingPortfolioList, portfolios, portfolioFetchError]);
  //   useEffect(() => {
  //     (async function () {
  //       try {
  //         const response = await getUserPortfolios(id);
  //         // console.log("Portfolios Data fetched");
  //         if (response instanceof Error) throw new Error("Invalid Response");
  //         // console.log(response);
  //         setUserPortfolios(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //   }, [navigate]);

  return (
    <div>
      {addModal && (
        <Modal
          show={true}
          onHide={(e) => setAddModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="p-2">
            <Modal.Body>
              <AddPortfolio navigateTo={currentRoute} />
            </Modal.Body>
          </div>
        </Modal>
      )}

      {editModal && (
        <Modal
          show={true}
          onHide={(e) => setEditModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="p-2">
            <Modal.Body>
              <EditPortfolio
                navigateTo={currentRoute}
                portfolioId={editPortfolioId}
                setEditModal={setEditModal}
              />
            </Modal.Body>
          </div>
        </Modal>
      )}
      <Projects id="portfolio">
        <Row className="align-items-center">
          {/* <Col xs={6} className="mt-3">
                <SectionHeading>Projects</SectionHeading>
                <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
              </Col> */}
          <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
            Portfolio
          </h1>
          {props.edit && (
            <Col className="mt-3 d-flex justify-content-end">
              <EditButtonInline onClick={(e) => setAddModal(true)}>
                Add{" "}
                <span>
                  <FontAwesomeIcon icon={faPen} />
                </span>
              </EditButtonInline>
              {/* {props.details ? null : (
                    <ViewAllButton
                      onClick={(e) => navigate(`/profile/${id}/details/portfolio`)}
                    >
                      View All/Edit
                    </ViewAllButton>
                  )} */}
            </Col>
          )}
        </Row>
        {loadingPortfolioList ? (
          <Loader/>
        ) : (
          <PortfolioItemContainer>
            {portfolios.data &&
              portfolios.data.length > 0 &&
              portfolios.data.map((item, index) => (
                <PortfolioCard
                  id={item.portfolio_id}
                  key={index}
                  image={item.portfolio_media_url[0].media_file}
                  title={item.portfolio_label}
                  description={item.portfolio_details}
                  setEditModal={setEditModal}
                  setEditPortfolioId={setEditPortfolioId}
                  edit={props.edit}
                />
              ))}
          </PortfolioItemContainer>
        )}
      </Projects>
    </div>
  );
}
const Projects = styled.div`
  position: relative;
  margin-top: 10px;
`;
const PortfolioItemContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  /* padding: 0 25px; */
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
