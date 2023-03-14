import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import convertDateFormat from 'src/Services/convertDateFormat';
import defaultEducationImage from '../../../../Assets/images/personal_profile/defaultEducationImage.png';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
export default function EducationListItem(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    core_edu_cert_id,
    title,
    institute,
    employment_type,
    company_location,
    enrolled_in,
    graduated_in,
    duration,
    file_urls,
    is_expired,
    description,
  } = props.data;
  const getDate = (date) => {
    const newDate = convertDateFormat(date);

    return `${newDate.month} ${newDate.year}`;
  };
  return (
    <EducationListStyle>
      <div className='d-flex flex-row gap-3 position-relative '>
        <div>
          <ImageContainer
            image={file_urls.length > 0 ? file_urls[0].media_file : null}
          />
        </div>
        <div>
          <Position>{institute}</Position>
          <div className='d-flex '>
            <CompanyndType>{title}</CompanyndType>
          </div>
          <div className='mt-1'>
            <Duration>{`${getDate(enrolled_in)} - ${
              graduated_in ? getDate(graduated_in) : 'Present'
            }`}</Duration>
          </div>
          <div>
            <Description>{description}</Description>
          </div>
        </div>
        {props.itemEdit && (
          <div className='position-absolute end-0'>
            <button
              onClick={(e) =>
                navigate(
                  `${
                    props.onAddNavigate ||
                    `/profile/${id}/details/education/edit/${core_edu_cert_id}`
                  }`
                )
              }
            >
              <span className='me-1'>Edit</span>
              <span>
                <FontAwesomeIcon icon={faPen} />
              </span>
            </button>
          </div>
        )}
      </div>
    </EducationListStyle>
  );
}
const EducationListStyle = styled.div`
  padding: 20px 0;
`;
const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  background-image: ${(props) =>
    props.image ? `url(${props.image})` : `url(${defaultEducationImage})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Position = styled.h4`
  font-family: 'Poppins Semi Bold', sans-serif;
  font-size: clamp(14px, 1vw, 16px);
  font-weight: 500;
  color: black;
`;
const CenterDot = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: black;
  }
`;
const CompanyndType = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(14px, 1.5vw, 16px);
  color: black;
  margin: 0;
`;
const Duration = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(12px, 1vw, 14px);
  color: #3f464e;
`;
const Description = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(12px, 1vw, 14px);
  color: black;
`;
