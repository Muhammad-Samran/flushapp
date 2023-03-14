import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DummyBanner from "../../Assets/images/personal_profile/TopBanner.jpg";
import DummyImage from "../../Assets/images/personal_profile/default_image.png";
import TestimonialCard from "src/Components/global/TestimonialCard/TestimonialCard";
import DummyLogo from "../../Assets/images/BusinessDummyImages/Logo.jpg";
import Carousel from "react-multi-carousel";
import JobsList from "../../Components/BusinessProfile/JobsList/JobsList";
import useData from "../../Hook/useData";
import SocialIcons from "src/Components/UI/SocialIcons/SocialIcons";
import { P, H4 } from "../../Styles";
import {
  faCoffee,
  faLocationDot,
  faUsers,
  faCheck,
  faPhone,
  faShareNodes,
  faPlus,
  faPen,
  faIdCard,
  faStar as FillStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as EmptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
import ServiceList from "../../Components/BusinessProfile/ServiceList/ServiceList";
import PortflioList from "../../Components/BusinessProfile/PortfolioList/PortfolioList";
import ProjectList from "../../Components/BusinessProfile/ProjectList/ProjectsList";
import Rating from "react-rating";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/UI/Loader/Loader";
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

function BusinessProfile() {
  const navigate = useNavigate()
  const { businessId } = useParams();
  const [loadingProfile, profileData, profileDataError, refreshProfile] =
    useData(`fetch/business/?b_id=${businessId}`);
  const [businessProfile, setBusinessProfile] = useState({});
  useEffect(() => {
    // console.log(loadingProfile, profileData, profileDataError);
    if (profileData.data) {
      setBusinessProfile(profileData.data);
    }
  }, [loadingProfile, profileData, profileDataError]);
  if (loadingProfile) {
    return <Loader />;
  }
  if (profileDataError) {
    return (
      <Container>
        <h2>something went wrong</h2>
      </Container>
    );
  }
  // console.log("businessProfile",businessProfile)
  return (
    <>
      <TopBanner bg={businessProfile.business_banner}>
        <Container className="d-flex justify-content-end align-items-end h-100">
          <ul className="secondary-font-medium p-0 d-flex flex-column flex-lg-row ">
            <TopBannerButton bg="#04d76a" color="#F4F1F0">
              <TopBannerIcon>
                <FontAwesomeIcon icon={faCheck} />
              </TopBannerIcon>

              <span>Following</span>
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
      <Container>
        {/* Profile Details Start */}
        <ProfileDetails id="about">
          <ProfileDetailsImage>
            <img
              style={{ objectFit: "cover" }}
              src={
                businessProfile.business_logo
                  ? businessProfile.business_logo
                  : DummyLogo
              }
              alt="Profile"
            />
          </ProfileDetailsImage>
          <div className="subTitle-business-profile">
          <ProfileDetailsInfo>
            <h2 className=" fs-30">{businessProfile.business_name}</h2>
            
            <div className=" text-center text-lg-start">
              <span className="me-1">Painting</span>

              <Dot className="me-1">&#8226;</Dot>

              <span className="me-1">Renovation</span>

              <Dot className="me-1">&#8226;</Dot>

              <span className="me-1">Rebuild</span>
            </div>

            {/* {profileData?.physical_address && ( */}
            <ExtraDetails>
              <span className="d-flex flex-row align-items-center me-4">
                <Icon className="me-1">
                  <FontAwesomeIcon icon={faLocationDot} />
                </Icon>

                <span>{businessProfile.serving_locations[0].formatted_address}</span>
              </span>
              {/* <span className="d-flex flex-row align-items-center me-4">
                <Icon className="me-1">
                  <FontAwesomeIcon icon={faUsers} />
                </Icon>

                <span>0 Followers</span>
              </span> */}
              {/* <span className="d-flex flex-row align-items-center me-4">
                <Icon className="me-1">
                  <FontAwesomeIcon icon={faIdCard} />
                </Icon>

                <span> License No. LP1234567</span>
              </span> */}
            </ExtraDetails>
          </ProfileDetailsInfo>
          <div className="create-job-button">
                <button className="rating-btn1"
                onClick={() =>  navigate(`/create-job`)}
                >
                    <span>
                  Create a Job
                  </span>
                </button>
              </div>
          </div>
        </ProfileDetails>
        <Row className="mt-3 text-center text-md-start">
          <Col md={6} lg={3} className="py-2">
            <H4>Phone:</H4>
            <P>
              {businessProfile.business_phone
                ? businessProfile.business_phone
                : "-"}
            </P>
          </Col>
          <Col md={6} lg={3} className="py-2">
            <H4>Email:</H4>
            <P>
              {businessProfile.business_email
                ? businessProfile.business_email
                : "-"}
            </P>
          </Col>
          <Col md={6} lg={3} className="py-2">
            <H4>Website:</H4>
            <P>{businessProfile.web_link ? businessProfile.web_link : "-"}</P>
          </Col>
          <Col md={6} lg={3} className="py-2">
            <H4>Connect with us on:</H4>
            <SocialIcons links={businessProfile.social_media_links} />
          </Col>
        </Row>
        {/* Profile About Start */}
        <About>
          <Row className="align-items-center">
            <Col lg={6} className="">
              <AboutIMage src={DummyBanner} alt="Profile"></AboutIMage>
            </Col>
            <Col lg={6} className="">
              <AboutContent>
                <SectionHeading>
                  {` What we provide you in ${businessProfile.business_name}`}
                </SectionHeading>
                <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
                <p>{businessProfile.summary ? businessProfile.summary : ""}</p>
              </AboutContent>
            </Col>
          </Row>
        </About>
        {/* Profile About End */}
        <SectionContainer>
          {/* <Row className="d-flex flex-wrap justify-content-between align-items-center">
            <Col className="" md={6}>
              <Heading>Cal Pack Featured Service</Heading>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-end mt-2 mt-md-0"
              md={6}
            >
              <ViewAllButton>View All Services</ViewAllButton>
            </Col>
          </Row> */}
          <div>
            <ServiceList />
          </div>
        </SectionContainer>
      </Container>
      {/* <SectionContainer>
        <Overview>
          <Container>
            <Row className="d-flex flex-wrap justify-content-between align-items-center">
              <Col className="" md={6}>
                <Heading>{`${businessProfile.business_name} Overview`}</Heading>
              </Col>
              <Col
                className="d-flex justify-content-center justify-content-md-end mt-2 mt-md-0"
                md={6}
              >
                <ViewAllButton>MoreDetails</ViewAllButton>
              </Col>
            </Row>
            <Row className="mt-3 text-center text-md-start">
              <Col md={6} lg={3} className="py-2">
                <h4>Company</h4>
                <p>Cal Pack Moving & Storage Services</p>
              </Col>
              <Col md={6} lg={3} className="py-2">
                <h4>Phone:</h4>
                <p>(044) 555 - 4369 - 8957</p>
              </Col>
              <Col md={6} lg={3} className="py-2">
                <h4>Email:</h4>
                <p>calpack@email.com</p>
              </Col>
              <Col md={6} lg={3} className="py-2">
                <h4>Website:</h4>
                <p>daydreamsagency.com</p>
              </Col>
            </Row>
          </Container>
        </Overview>
      </SectionContainer> */}
      <SectionContainer>
        <Container>
          <Testimonials>
            <Row className="align-items-center">
              <Col xs={6} className="mt-3">
                <SectionHeading>Testimonials</SectionHeading>
                <SectionHeadingBottomBorder></SectionHeadingBottomBorder>
              </Col>
              {/* <Col xs={6} className="mt-3">
                <ViewAllButton>View All</ViewAllButton>
              </Col> */}
            </Row>
            <div className="mt-3 businessTestimonialsCarousel">
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
        </Container>
      </SectionContainer>
      {/* Portfolio List */}
      <PortfolioContainer>
        <Container>
          <SectionContainer>
            {/* <Row className="d-flex flex-wrap justify-content-between align-items-center">
              <Col className="" md={6}>
                <Heading>Explore Portfolio</Heading>
              </Col>
              <Col
                className="d-flex justify-content-center justify-content-md-end mt-2 mt-md-0"
                md={6}
              >
                <ViewAllButton>View More Portfolio</ViewAllButton>
              </Col>
            </Row> */}
            <div>
              <PortflioList />
            </div>
          </SectionContainer>
        </Container>
      </PortfolioContainer>
      {/* Projects Section */}
      <SectionContainer>
        <Container>
          {/* <Row className="d-flex flex-wrap justify-content-between align-items-center">
            <Col className="" md={6}>
              <Heading>Projects we have Done</Heading>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-md-end mt-2 mt-md-0"
              md={6}
            >
              <ViewAllButton>View All Projects</ViewAllButton>
            </Col>
          </Row> */}
          <div>
            <ProjectList />
          </div>
        </Container>
      </SectionContainer>
      {/* Jobs */}
      <SectionContainer>
        <Container>
          <JobListHeading>
            More than <span>200,000 companies </span>sponsorship with us so you
            can Apply for Job Offer
          </JobListHeading>
          <JobsList />
          <div className="d-flex justify-content-center mt-3">
            <ViewAllButton>See All Listing</ViewAllButton>
          </div>
        </Container>
      </SectionContainer>
      <SectionContainer>
        <Container>
          <RateExperience>
            <div className="d-flex justify-content-start mb-2">
              <h3 className="me-2">Rate Your Experience</h3>
              {/* textarea experience input */}
              <Rating
                fullSymbol={
                  <FillStarContainer>
                    <FontAwesomeIcon icon={FillStar} size="xl" />
                  </FillStarContainer>
                }
                emptySymbol={
                  <EmptyStarContainer>
                    <FontAwesomeIcon icon={EmptyStar} size="xl" />
                  </EmptyStarContainer>
                }
                initialValue={0}
                // onChange={(value) => console.log(value)}
              />
            </div>

            <textarea
              placeholder="Your thoughts "
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <SubmitDiv>
              <button>Submit Now</button>
            </SubmitDiv>
          </RateExperience>
        </Container>
      </SectionContainer>
    </>
  );
}
const EmptyStarContainer = styled.span`
  color: gray;
`;
const FillStarContainer = styled.span`
  color: #febf00;
`;
const SubmitDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  button {
    background-image: linear-gradient(135deg, #04d78c, #3f464e);
    border-radius: 10px;
    outline: none;
    border: none;
    width: 125px;
    font-size: clamp(14px, 1.5vw, 16px);
    font-family: "Roboto Medium", sans-serif;
    padding: 10px;
    color: #f4f1f0;
  }
`;
const RateExperience = styled.div`
  h3 {
    font-family: "Circular Std", sans-serif;
    font-size: clamp(22px, 1.5vw, 30px) !important;
    color: #3f464e;
    @media screen and (max-width: 768px) {
      text-align: center;
    }
  }
  textarea {
    font-family: "Roboto", sans-serif;
    font-size: clamp(14px, 1.5vw, 16px);
    padding: 20px;
    border-radius: 20px;
  }
`;
const JobListHeading = styled.h2`
  font-family: "Circular Std", sans-serif;
  font-size: clamp(22px, 1.5vw, 30px) !important;
  color: #3f464e;
  text-align: center;
  /* margin-top: 60px;
  margin-bottom: 2rem; */
  max-width: 560px;
  margin: 50px auto 20px;
  span {
    color: #04d76a;
  }
`;
const PortfolioContainer = styled.div`
  background: #f0fcf6;
  padding: 30px 0;
`;
const Overview = styled.div`
  background: #f0fcf6;
  padding: 30px 0;
  h4 {
    font-size: clamp(14px, 1vw, 16px);
    font-family: "Roboto Medium", sans-serif;
    color: #3f464e;
  }
  p {
    font-family: "Roboto", sans-serif;
    font-size: clamp(14px, 1.5vw, 16px);
    color: #666666;
  }
`;
const Heading = styled.h3`
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
const SectionContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;
const Dot = styled.span`
  display: inline-block;
`;
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
  @media screen and (max-width: 768px) {
    top: -150px;
  }
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

// About Section Styles
const About = styled.div`
  padding: 50px 0 20px;
  border-bottom: 1px solid #e1e1e1;
`;
const AboutIMage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
  aspect-ratio: 1.3;
  @media (max-width: 768px) {
    /* height: 300px; */
  }
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
const AboutContent = styled.div`
  padding: 20px;
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
  background-color: #cdf4e0;
  color: #3f464e;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 20px;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  &:hover {
    border: 2px solid #04d76a;
  }
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
  color: #3f464e;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  padding: 30px 20px 0px;
  @media (max-width: 768px) {
    padding: 10px 0 0 0;
    align-items: center;
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
    /* margin-right: 10px; */
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
  /* margin-top: 10px; */
  @media (max-width: 768px) {
    display: block;
    margin: 2px 0;
  }
`;

// Top Banner Styles
const TopBanner = styled.div`
  background-image: ${(props) =>
    props.bg ? `url(${props.bg})` : ` url(${DummyBanner})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 400px;
  @media (max-width: 768px) {
    height: 210px;
    padding: 5px;
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
  padding: 8px 15px;
  margin: 5px 5px;
`;
const TopBannerIcon = styled.span`
  margin-right: 5px;
  /* color: ${(props) => (props.color ? props.color : "#3F464E")}; */
`;

export default BusinessProfile;
