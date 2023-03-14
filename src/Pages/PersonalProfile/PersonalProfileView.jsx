// ID Component to display the personal profile of a user
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import BgImage from "../../Assets/images/personal_profile/TopBanner.jpg";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-multi-carousel";
import Cleaning from "src/Assets/images/cleaning.png";
import Electrican from "src/Assets/images/elect.png";
import Package from "src/Assets/images/package.png";
import Painter from "src/Assets/images/painter.png";
import EducationList from "../../Components/PersonalProfile/EducationList/EducationList";
import PortfolioList from "../../Components/PersonalProfile/PortfolioList/PortfolioListContainer/PortfolioListContainer";
import { useSelector } from "react-redux";
import DummyImage from "../../Assets/images/personal_profile/default_image.png";
import "./PersonalProfileView.scss";
import {
  faCoffee,
  faLocationDot,
  faUsers,
  faCheck,
  faPhone,
  faShareNodes,
  faPlus,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import FeedCard from "../../Components/global/FeedCard/FeedCard";
import PortfolioImage from "../../Assets/images/personal_profile/Portfolio/Image1.jpg";
import ExperienceList from "../../Components/PersonalProfile/ExperienceList/ExperienceList";
import TestimonialCard from "../../Components/global/TestimonialCard/TestimonialCard";
import {
  getUserProfile,
  getUserBio,
  getUserPortfolios,
  getUserSkills,
} from "src/Services/PersonalProfile/getProfileData";
const NavbarList = [
  { title: "About", link: "#about" },
  { title: "Feed", link: "#feed" },

  { title: "Portfolio", link: "#portfolio" },
  { title: "Experience", link: "#experience" },
  { title: "Education", link: "#education" },
  { title: "Testimonials", link: "#testimonials" },
];
const TestimonialsData = [
  {
    author: "Sasha Ho",
    test: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate amet accusantium ipsa delectus impedit laudantium nostrum cum quasi. Expedita, cumque.",
    rating: 4,
  },
  {
    author: "Sasha Ho",
    test: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate amet accusantium ipsa delectus impedit laudantium nostrum cum quasi. Expedita, cumque.",
    rating: 4,
  },
  {
    author: "Sasha Ho",
    test: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate amet accusantium ipsa delectus impedit laudantium nostrum cum quasi. Expedita, cumque.",
    rating: 4,
  },
];
const PortfolioItems = [
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
  {
    image: PortfolioImage,
    title: "Cleaning",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
];
function PersonalProfileView(props) {
  // Get Profile Data
  const [profileData, setProfileData] = useState({});
  const userId = useSelector((state) => state.auth.userId);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const services = [
    { img: Painter, title: "Painter" },
    { img: Electrican, title: "Electrican" },
    { img: Package, title: "Logistics " },
    { img: Cleaning, title: "Building Cleaning" },
    { img: Painter, title: "Painter" },
    { img: Electrican, title: "Electrican" },
    { img: Package, title: "Logistics " },
    { img: Cleaning, title: "Building Cleaning" },
  ];
  const skills = [
    { label: "Wall Painting" },
    { label: "Wall Painting" },
    { label: "Wall Painting" },
    { label: "Wall Painting" },
    { label: "Wall Painting" },
    { label: "Wall Painting" },
    { label: "Wall Painting" },
    { label: "Wall Painting" },
    { label: "Wall Painting" },
    { label: "Wall Painting" },
  ];

  useEffect(() => {
    (async function () {
      try {
        const response = await getUserProfile(id);
        // console.log("Profile Data fetched");
        if (response instanceof Error) throw new Error("Invalid Response");

        setProfileData(response.data);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, [navigate]);
  // Get User Bio
  const [userBio, setUserBio] = useState({});
  useEffect(() => {
    (async function () {
      try {
        const response = await getUserBio();
        // console.log("Bio Data fetched");
        if (response instanceof Error) throw new Error("Invalid Response");

        setUserBio(response.data);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, [navigate]);

  // Get User Skills
  const [userSkills, setUserSkills] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await getUserSkills(id);

        // console.log("Skills Data fetched");
        if (response instanceof Error) throw new Error("Invalid Response");
        // console.log(response);
        setUserSkills(response.data);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, [navigate, id]);

  return (
    <div>
      {/* Modal */}
      {props.children}
      {/* Top Banner Start */}
      <TopBanner>
        <Container className="d-flex justify-content-end align-items-end h-100">
          <ul className="secondary-font-medium p-0">
            <TopBannerButton bg="#04d76a" color="#F4F1F0">
              <TopBannerIcon>
                <FontAwesomeIcon icon={faCheck} />
              </TopBannerIcon>

              <span>Friend</span>
            </TopBannerButton>
            <TopBannerButton>
              <TopBannerIcon>
                <FontAwesomeIcon icon={faPhone} />
              </TopBannerIcon>
              <span>Contact</span>
            </TopBannerButton>
            <TopBannerButton>
              <TopBannerIcon>
                <FontAwesomeIcon icon={faShareNodes} />
              </TopBannerIcon>
              <span>Share</span>
            </TopBannerButton>
            <TopBannerButton>
              <span>More</span>
            </TopBannerButton>
          </ul>
        </Container>
      </TopBanner>
      {/* Top Banner End */}
      <Container>
        {/* Profile Details Start */}
        <ProfileDetails id="about">
          <ProfileDetailsImage>
            <img
              style={{ objectFit: "cover" }}
              src={profileData.profile_photo || DummyImage}
              alt="Profile"
            />
          </ProfileDetailsImage>
          <ProfileDetailsInfo>
            <h2>{`${profileData.first_name || " "} ${
              profileData.last_name || " "
            }`}</h2>
            {/* <p>
              <span>Painting</span>
              <span>Renovation</span>
              <span>Rebuild</span>
            </p> */}
            {profileData?.physical_address?.formatted_address && (
              <ExtraDetails>
                <span className="d-flex flex-row">
                  <Icon>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </Icon>

                  <span>{profileData.physical_address.formatted_address}</span>
                </span>
              </ExtraDetails>
            )}

            {/* <ExtraDetails>
              <span className="d-flex flex-row">
                <Icon>
                  <FontAwesomeIcon icon={faUsers} />
                </Icon>
                <span>Syracuse 13202, NY</span>
              </span>
            </ExtraDetails> */}
          </ProfileDetailsInfo>
          {props.edit && (
            <EditButton
              data-id="editBio"
              onClick={(e) => navigate(`/profile/${id}/` + "editBio")}
            >
              Edit{" "}
              <span>
                <FontAwesomeIcon icon={faPen} />
              </span>
            </EditButton>
          )}
        </ProfileDetails>
        {/* Profile Details End */}
        {/* Profle Nav Start */}
        <Nav>
          {NavbarList.map((item, index) => (
            <NavItem key={index}>
              <NavLink href={item.link}>{item.title}</NavLink>
            </NavItem>
          ))}
        </Nav>
        {/* Profile Nav End */}
        {/* Profile About Start */}
        <About>
          <Row className="align-items-center">
            <Col lg={6} className="">
              <AboutIMage src={BgImage} alt="Profile"></AboutIMage>
            </Col>
            <Col lg={6} className="">
              <AboutContent>
                <SectionHeading>About {profileData.first_name}</SectionHeading>
                <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
                <p>{userBio?.about}</p>
              </AboutContent>
            </Col>
          </Row>
        </About>
        {/* Profile About End */}

        {/* Overview Start */}
        <Overview>
          <Row className="align-items-center">
            <Col xs={6} className="mt-3">
              <SectionHeading>Overview</SectionHeading>
              <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
            </Col>
            <Col xs={6} className="mt-3">
              <button>
                <span className="me-1">Read More</span>
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </button>
            </Col>
          </Row>
          <Row className=" align-items-center mt-4">
            <Col xs={6} lg={4}>
              <OverviewComponents>
                <h4>Email:</h4>
                <p>jspiegel@yourmail.com</p>
              </OverviewComponents>
            </Col>
            <Col xs={6} lg={4}>
              <OverviewComponents>
                <h4>Website:</h4>
                <p>daydreamsagency.com</p>
              </OverviewComponents>
            </Col>
            <Col lxs={6} g={4}>
              <OverviewComponents>
                <h4>Phone:</h4>
                <p>(044) 555 - 4369 - 8957</p>
              </OverviewComponents>
            </Col>
          </Row>
        </Overview>
        {/* Overview End */}
        {/* Feeds Section Start */}
        <Feed>
          {" "}
          <Row className="align-items-center">
            <Col xs={6} className="mt-3">
              <SectionHeading>Feed</SectionHeading>
              <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
            </Col>
            <Col xs={6} className="mt-3">
              <ViewAllButton>View All</ViewAllButton>
            </Col>
          </Row>
          <div id="feedList" className="mt-4">
            <Carousel
              draggable={true}
              swipeable={true}
              responsive={{
                superLargeDesktop: {
                  // the naming can be any, depends on you.
                  breakpoint: { max: 4000, min: 3000 },
                  items: 2,
                },
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 2,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 1,
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                },
              }}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              showDots={false}
              infinite={true}
            >
              {services.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 d-flex flex-column justify-content-center"
                  >
                    <FeedCard />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </Feed>
        {/* Feeds Section End */}
        {/* Portfolio Section Start */}
        <PortfolioList
          onAddNavigate={`/profile/${id}/addPortfolio`}
          edit={props.edit}
        />
        {/* Portfolio Section End */}
        {/* Skills Section Start */}
        <Skills>
          <Row className="align-items-center">
            <Col xs={6} className="mt-3">
              <SectionHeading>Skills</SectionHeading>
              <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
            </Col>
            {props.edit && (
              <Col xs={6} className="mt-3 d-flex justify-content-end">
                <EditButtonInline
                  data-id="editBio"
                  onClick={(e) => navigate(`/profile/${id}/editSkills`)}
                >
                  Edit{" "}
                  <span>
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                </EditButtonInline>
                {/* <ViewAllButton>View All</ViewAllButton> */}
              </Col>
            )}
          </Row>
          <div className="mt-4 ">
            {userSkills &&
              userSkills.map((item, index) => (
                <button>{item.skill_label}</button>
              ))}
          </div>
        </Skills>
        {/* Skills Section End */}
        {/* Experience Section Start */}
        <ExperienceList
          onAddNavigate={`/profile/${id}/addWork`}
          edit={props.edit}
        />
        {/* Experience Section End */}
        {/* Education Section Start */}
        <EducationList
          onAddNavigate={`/profile/${id}/addEducation`}
          edit={props.edit}
        />
        {/* Education Section End */}
        {/* Testimonials Section Start */}
        <Testimonials>
          <Row className="align-items-center">
            <Col xs={6} className="mt-3">
              <SectionHeading>Testimonials</SectionHeading>
              <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
            </Col>
            <Col xs={6} className="mt-3">
              <ViewAllButton>View All</ViewAllButton>
            </Col>
          </Row>
          <div className="mt-3">
            <Carousel
              draggable={true}
              swipeable={true}
              responsive={{
                superLargeDesktop: {
                  // the naming can be any, depends on you.
                  breakpoint: { max: 4000, min: 3000 },
                  items: 2,
                },
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 2,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2,
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                },
              }}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              showDots={false}
              infinite={true}
            >
              {TestimonialsData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="p-4 d-flex flex-column justify-content-center"
                  >
                    <TestimonialCard />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </Testimonials>
        {/* Testimonials Section End */}
      </Container>
    </div>
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
const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: ${(props) => (props.right ? props.right : 0)};
  background-color: #f4f1f0;
  color: #3f464e;
  border: none;
  padding: 10px 10px;
  border-radius: 10px;
`;
const Testimonials = styled.div``;
const Skills = styled.div`
  margin-top: 40px;
  button {
    font-family: "Roboto", sans-serif;
    font-size: clamp(14px, 1.5vw, 16px);
    background: #f4f1f0;
    color: #3f464e;
    border: none;
    padding: 10px 10px;
    border-radius: 10px;
    margin-top: 10px;
    margin-right: 10px;
    line-height: 1;
  }
`;

// Feeds Styles
const Feed = styled.div`
  margin-top: 40px;
`;
// Overview Styles
const Overview = styled.div`
  padding: 50px 0 20px;
  button {
    background: #f4f1f0;
    color: #3f464e;
    border: none;
    padding: 10px 10px;
    border-radius: 10px;
    float: right;
    span {
      /* padding: 0 5px; */
    }
  }
`;
const OverviewComponents = styled.div`
  padding-right: 20px;
  @media (max-width: 768px) {
    padding-right: 0;
  }
  h4 {
    font-size: clamp(14px, 1vw, 16px);
    font-family: "Roboto Medium", sans-serif;
    color: #3f464e;
  }
  p {
    font-family: "Roboto", sans-serif;
    font-size: clamp(14px, 1vw, 16px);
    color: #666666;
  }
`;
// About Section Styles
const About = styled.div`
  padding: 50px 0 20px;
  border-bottom: 1px solid #e1e1e1;
`;
const AboutIMage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
  height: 300px;
  @media (max-width: 768px) {
    /* height: 300px; */
  }
`;
const SectionHeading = styled.h2`
  font-family: "Poppins Semi Bold", sans-serif;
  color: #3f464e;
  position: relative;
  font-size: clamp(19px, 12vw, 30px) !important;
  margin-top: 10px;
`;
const SectionHeadingBottomBorder = styled.div`
  height: 2px;
  background-color: #04d76a;
  width: 50px;
`;
const AboutContent = styled.div`
  /* h2 {
    font-family: "Poppins Semi Bold", sans-serif;
    color: #3f464e;
    position: relative;
    font-size: clamp(22px, 12vw, 32px) !important;
  } */
  /* div {
    height: 2px;
    background-color: #04d76a;
    width: 50px;
  } */
  p {
    margin-top: 20px;
    font-family: "Roboto", sans-serif;
    font-size: clamp(14px, 1vw, 16px);
    color: #666666;
    line-height: 1.6;
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
// Profile Nav Styles
const Nav = styled.nav`
  margin-top: 20px;
  border: 1px solid #04d76a;
  padding: 10px;
  font-size: clamp(14px, 1vw, 16px);
  font-family: "Roboto Medium", sans-serif;
  border-radius: 10px;
`;
const NavItem = styled.li`
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
  padding: 5px;
`;
const NavLink = styled.a`
  padding: 12px;
  color: #3f464e;
  font-weight: 600;
  text-decoration: none;
  border-radius: 5px;
  /* background: #04d76a; */
  &:hover {
    background: #04d76a;
    color: #f4f1f0;
  }
`;

// Profile Details styles
const ProfileDetails = styled.div`
  display: flex;
  justify-content: start;
  position: relative;
`;
const ProfileDetailsImage = styled.div`
  width: 200px;
  border: 6px solid white;
  position: relative;
  top: -50px;
  height: 200px;
  background-color: #f4f1f0;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 768px) {
    top: 0;
    min-width: 100px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
const ProfileDetailsInfo = styled.div`
  /* width: 70%; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  /* align-items: center; */
  padding: 30px 20px 0px;
  @media (max-width: 768px) {
    padding: 10px 0 0 0;
  }
  h2 {
    font-size: 30px;
    font-weight: bold;
    color: #3f464e;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 0.5rem;
  }
  span {
    margin-right: 10px;
    font-family: "Roboto", sans-serif;
  }
`;
const Icon = styled.span`
  color: #04d78c;
  width: 20px;
  display: flex;
  justify-content: center;
`;
const ExtraDetails = styled.div`
  font-size: clamp(14px, 1vw, 16px);
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    display: block;
    margin: 2px 0;
  }
`;

// Top Banner Styles
const TopBanner = styled.div`
  background-image: url(${BgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 400px;
  @media (max-width: 768px) {
    height: 150px;
  }
  /* display: flex;
  justify-content: end;
  align-items: end; */
`;
const TopBannerButton = styled.button`
  color: ${(props) => (props.color ? props.color : "#3F464E")};
  background-image: ${(props) =>
    props.bg
      ? `linear-gradient(
    135deg, #04D78C, 
      #3F464E
    );`
      : "F4F1F0"};
  border-radius: 10px;
  outline: none;
  border: none;
  font-size: 14px;
  padding: 5px 10px;
  margin: 5px 5px;
`;
const TopBannerIcon = styled.span`
  margin-right: 5px;
  /* color: ${(props) => (props.color ? props.color : "#3F464E")}; */
`;
export default PersonalProfileView;
