import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
function ImageCard({ src, onDelete, name }) {
  return (
    <ImageCardContainer>
      <ImageContainer>
        <img src={src} />
      </ImageContainer>

      <DeleteDiv onClick={(e) => onDelete(name)}>
        <FontAwesomeIcon icon={faXmark} />
      </DeleteDiv>
    </ImageCardContainer>
  );
}
const ImageCardContainer = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10px;
`;
const ImageContainer = styled.div`
  width: 100px;
  height: 50px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const DeleteDiv = styled.div`
  width: 40px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #b82929;
    color: white;
  }
  :active {
    background-color: #7c1c1c;
    color: white;
  }
`;
export default ImageCard;
