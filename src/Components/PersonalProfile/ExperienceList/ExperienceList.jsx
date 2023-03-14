import React, { useEffect } from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import ExperienceListItem from "./ExperienceListItem/ExperienceListItem";
import { useNavigate, useParams } from "react-router-dom";
import { getWorkExperience } from "../../../Services/PersonalProfile/getProfileData";
// const ExperienceListData = [
//   {
//     title: "Developer",
//     company: "Pixarsart",
//     employment_type: "Full-time",
//     company_location: "Lahore",
//     start_date: "Mar 2020",
//     end_date: "Present",
//     duration: "2yrs",
//     image: "https://picsum.photos/200/300",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut rerum asperiores maxime corrupti architecto quidem, sit numquam accusamus cupiditate ad quis, neque dolor necessitatibus natus placeat nemo voluptate molestias commodi!",
//   },
//   {
//     title: "Developer",
//     company: "Pixarsart",
//     employment_type: "Full-time",
//     company_location: "Lahore",
//     start_date: "Mar 2020",
//     end_date: "Present",
//     duration: "2yrs",
//     image: "https://picsum.photos/200/300",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut rerum asperiores maxime corrupti architecto quidem, sit numquam accusamus cupiditate ad quis, neque dolor necessitatibus natus placeat nemo voluptate molestias commodi!",
//   },
//   {
//     title: "Developer",
//     company: "Pixarsart",
//     employment_type: "Full-time",
//     company_location: "Lahore",
//     start_date: "Mar 2020",
//     end_date: "Present",
//     duration: "2yrs",
//     image: "https://picsum.photos/200/300",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut rerum asperiores maxime corrupti architecto quidem, sit numquam accusamus cupiditate ad quis, neque dolor necessitatibus natus placeat nemo voluptate molestias commodi!",
//   },
// ];
function ExperienceList(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [experienceList, setExperienceList] = React.useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    (async function () {
      try {
        const response = await getWorkExperience(id);
        // console.log("Bio Data fetched");
        if (response instanceof Error) throw new Error("Invalid Response");

        setExperienceList(response.data);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, [navigate]);
  return (
    <ExperienceListStyle id="experience">
      {" "}
      <Row className="align-items-center">
        <Col xs={6} className="mt-3">
          <SectionHeading>Experience</SectionHeading>
          <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
        </Col>
        {props.edit && (
          <Col xs={6} className="mt-3 d-flex justify-content-end">
            <EditButtonInline
              onClick={(e) => navigate(`${props.onAddNavigate}`)}
            >
              Add{" "}
              <span>
                <FontAwesomeIcon icon={faPen} />
              </span>
            </EditButtonInline>
            {props.details ? null : (
              <ViewAllButton
                onClick={(e) => navigate(`/profile/${id}/details/experience`)}
              >
                View All/Edit
              </ViewAllButton>
            )}
          </Col>
        )}

        {experienceList && experienceList.length > 0 && (
          <div className="mt-4">
            {experienceList.map((item, index) => (
              <ExperienceListItem
                key={index}
                data={item}
                itemEdit={props.itemEdit}
              />
            ))}
          </div>
        )}
      </Row>
    </ExperienceListStyle>
  );
}
const EditButtonInline = styled.button`
  float: right;
  background-color: #f4f1f0;
  color: #3f464e;
  border: none;
  padding: 10px 10px;
  border-radius: 10px;
`;
const ExperienceListStyle = styled.div`
  margin-top: 20px;
  /* button {
    background-color: white;
    color: #3f464e;
    border: none;
    padding: 10px 10px;
    border-radius: 10px;
    float: right;
  }
  button:hover {
    background-color: #f4f1f0;
  } */
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
const ViewAllButton = styled.button`
  background-image: linear-gradient(135deg, #04d78c, #3f464e);
  border-radius: 10px;
  outline: none;
  border: none;
  width: 125px;
  font-size: clamp(14px, 1.5vw, 16px);
  font-family: "Roboto Medium", sans-serif;
  padding: 10px;
  color: #f4f1f0 !important;
  margin-left: 10px;
  float: right;
`;
export default ExperienceList;
