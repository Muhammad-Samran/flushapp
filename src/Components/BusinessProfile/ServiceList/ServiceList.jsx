import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PortfolioImage from "../../../Assets/images/personal_profile/Portfolio/Image1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { Col, Row, Modal } from "react-bootstrap";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ServiceCard from "../../global/ServiceCard/ServiceCard";
import AddService from "../AddService/AddServiceContainer";
import ViewService from "../ViewService/ViewService";
import EditService from "../EditService/EditServiceContainer";
import BookService from "../../global/BookService/BookService";
import useData from "../../../Hook/useData";
import Loader from "src/Components/UI/Loader/Loader";

function ServiceList(props) {
  const { id, businessId } = useParams();

  const [loadingServices, services, error, refreshData] = useData(
    `business/single/service/?b_id=${businessId}`
  );
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  // Get User Portfolios
  const [BusinessProjects, setProjects] = useState([]);
  const [ProjectViewData, setProjectViewData] = useState();
  const [EditServiceId, setEditServiceId] = useState("");
  const [bookServiceModal, setBookServiceModal] = useState(false);
  useEffect(() => {
    refreshData();
  }, [addModal, viewModal, editModal]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (loadingServices) {
    return (<Loader/>);
  }
  // if (error) {
  //   return <h1>Something went wrong</h1>;
  // }
  return (
    <div>
      {addModal && (
        <Modal
          show={true}
          onHide={(e) => {
            setAddModal(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="p-2">
            <Modal.Body>
              <AddService navigateTo={currentRoute} />
            </Modal.Body>
          </div>
        </Modal>
      )}
      {bookServiceModal && (
        <Modal
          show={true}
          onHide={(e) => {
            setBookServiceModal(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="p-2">
            <Modal.Body>
              <BookService navigateTo={currentRoute} />
            </Modal.Body>
          </div>
        </Modal>
      )}
      {viewModal && (
        <Modal
          show={true}
          onHide={(e) => {
            setViewModal(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="p-2">
            <Modal.Body>
              <ViewService
                navigateTo={currentRoute}
                data={ProjectViewData}
                onEdit={(e) => {
                  setEditModal(true);
                  setViewModal(false);
                  setEditServiceId(1);
                }}
              />
            </Modal.Body>
          </div>
        </Modal>
      )}
      {editModal && (
        <Modal
          show={true}
          onHide={(e) => {
            setEditModal(false);
            refreshData();
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="p-2">
            <Modal.Body>
              <EditService
                setEditModal={setEditModal}
                navigateTo={currentRoute}
                serviceId={EditServiceId}
              />
            </Modal.Body>
          </div>
        </Modal>
      )}
      <Services id="services">
        <Row className="align-items-center">
          {/* <Col xs={6} className="mt-3">
            <SectionHeading>Services</SectionHeading>
            <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
          </Col> */}
          <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
            Services
          </h1>
          {props.edit && (
            <Col className="mt-1 d-flex justify-content-end">
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
        <ServiceItemContainer>
          {services.data &&
            services.data.map((item, index) => (
              <div
              // onClick={(e) => {
              //   setProjectViewData(item);
              //   setViewModal(true);
              // }}
              >
                <ServiceCard
                  setBookServiceModal={setBookServiceModal}
                  setEditModal={setEditModal}
                  serviceId={item.service_id}
                  setEditServiceId={setEditServiceId}
                  key={index}
                  image={item.service_image[0].media_file}
                  title={item.service_title}
                  description={item.service_description}
                  category={item.service_category}
                  startingPrice={item.service_price}
                  edit={props.edit}
                />
              </div>
            ))}
        </ServiceItemContainer>
      </Services>
    </div>
  );
}
const Services = styled.div`
  position: relative;
  margin-top: 10px;
`;
const ServiceItemContainer = styled.div`
  /* margin-top: 30px; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
export default ServiceList;
