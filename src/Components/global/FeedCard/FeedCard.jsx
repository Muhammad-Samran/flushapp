import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ProfileImage from "../../../Assets/images/personal_profile/ProfileImage.jpg";
import {
  faEllipsis,
  faCommentDots,
  faPaperPlane,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import HeartEmpty from "../../../Assets/svg/heart.svg";
import Share from "../../../Assets/svg/share.svg";
import SendChat from "../../../Assets/svg/send.svg";
function FeedCard() {
  return (
    <FeedCardContainer>
      <Ellipsis>
        <FontAwesomeIcon icon={faEllipsis} />
      </Ellipsis>
      <div className="d-flex flex-row ">
        <ProfileImageContainer />

        <ProfleDetails>
          <h4>John Smith</h4>
          <p>Posted 17 days ago</p>
        </ProfleDetails>
      </div>
      <PostContent>
        <div className="pt-2 px-5">
          {" "}
          <PostImageContainer bg={ProfileImage}></PostImageContainer>
        </div>

        <PostText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda
          similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum
          hic, voluptatem dolore ullam voluptatibus?
        </PostText>
      </PostContent>
      <PostLinks>
        <PostLink>
          <FontAwesomeIcon icon={faCommentDots} size="lg" />
        </PostLink>
        <PostLink>
          <img src={HeartEmpty} alt="heart" />
        </PostLink>
        <PostLink>
          <FontAwesomeIcon icon={faShare} size="lg" />
        </PostLink>
        <PostLink>
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </PostLink>
      </PostLinks>
    </FeedCardContainer>
  );
}
const PostLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const PostLink = styled.div`
  cursor: pointer;
  display: inline-block;
  background-color: #f4f1f0;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PostContent = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #f4f1f0;
  border-radius: 10px;
`;
const PostText = styled.div`
  text-align: justify;
  margin: 10px 20px;
  font-family: "Roboto", sans-serif;
  font-size: clamp(14px, 1vw, 16px);
  line-height: 1.6;
  color: #5c5c5c;
`;
const PostImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-image: ${(props) =>
    props.bg ? `url(${ProfileImage})` : "#f4f1f0"};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  overflow: hidden;
`;
const ProfleDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 10px;
  h4 {
    font-family: "Poppins Semi Bold", sans-serif;
    font-size: clamp(14px, 1vw, 16px);
    font-weight: 500;
    color: #3f464e;
  }
  p {
    font-family: "Roboto", sans-serif;
    font-size: clamp(11px, 1vw, 12px);
    color: #999999;
  }
`;
const ProfileImageContainer = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  background-image: url(${ProfileImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const FeedCardContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 20px;
  border: 1px solid #04d76a;
  border-radius: 15px;
`;
const Ellipsis = styled.div`
  position: absolute;
  right: 10px;
  top: 20px;
  cursor: pointer;
`;
export default FeedCard;
