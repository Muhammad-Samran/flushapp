import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PortfolioImage from "../../../Assets/images/BusinessDummyImages/DummyPortfolio.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { Col, Row, Modal } from "react-bootstrap";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { getUserPortfolios } from "../../../Services/PersonalProfile/getProfileData";
import ProjectCard from "../../global/ProjectCard/ProjectCard";
import AddProject from "../AddProject/AddProjectContainer";
import ViewProject from "../ViewProject/ViewProject";
import EditProject from "../EditProject/EditProjectContainer";
import useData from "src/Hook/useData";
import Loader from "src/Components/UI/Loader/Loader";
const ProjectsList = [
  {
    image: PortfolioImage,
    title: "Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
  {
    image: PortfolioImage,
    title: "Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
  {
    image: PortfolioImage,
    title: "Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
  {
    image: PortfolioImage,
    title: "Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
];
function ProjectList(props) {
  const { businessId } = useParams();
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  // Get User Portfolios
  const [BusinessProjects, setProjects] = useState([]);
  const [ProjectViewData, setProjectViewData] = useState();
  const [EditProjectId, setEditProjectId] = useState("");
  const [loadingProjects, projects, error, refreshData] = useData(
    `business/project/?business_id=${businessId}`
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (editModal == false && addModal == false) {
      refreshData();
    }
  }, [addModal, editModal]);
  useEffect(() => {
    console.log(loadingProjects, projects, error);
  }, [loadingProjects, projects, error]);
  if (loadingProjects) {
    return <Loader/>;
  }
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
              <AddProject navigateTo={currentRoute} />
            </Modal.Body>
          </div>
        </Modal>
      )}
      {viewModal && (
        <Modal
          show={true}
          onHide={(e) => setViewModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="p-2">
            <Modal.Body>
              <ViewProject
                navigateTo={currentRoute}
                data={ProjectViewData}
                onEdit={(e) => {
                  setEditModal(true);
                  setViewModal(false);
                  setEditProjectId(1);
                }}
              />
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
              <EditProject
                navigateTo={currentRoute}
                projectId={EditProjectId}
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
            Projects
          </h1>
          {props.edit && (
            <Col className=" d-flex justify-content-end">
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
        {error ? (
          <h3>Something went wrong</h3>
        ) : (
          <ProjectItemContainer>
            {projects.data &&
              projects.data.length > 0 &&
              projects.data.map((item, index) => (
                <div
                // onClick={(e) => {
                //   setProjectViewData(item);
                //   setViewModal(true);
                // }}
                >
                  <ProjectCard
                    setEditModal={setEditModal}
                    setEditProjectId={setEditProjectId}
                    key={index}
                    image={item.project_photo[0].media_file}
                    title={item.project_title}
                    description={item.project_description}
                    completion_date={item.completion_date}
                    budget={item.project_budget}
                    location={item.project_location}
                    status={item.project_status}
                    project_id={item.project_id}
                    edit={props.edit}
                  />
                </div>
              ))}
          </ProjectItemContainer>
        )}
      </Projects>
    </div>
  );
}
const Projects = styled.div`
  position: relative;
  margin-top: 10px;
  padding: 0 15px;
`;
const ProjectItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
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
export default ProjectList;
