import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import defaultCompanyImage from '../../../../Assets/images/personal_profile/default_company_image.png';
import convertDateFormat from 'src/Services/convertDateFormat';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
export default function ExperienceListItem(props) {
  const navigate = useNavigate();
  const { id, experienceId } = useParams();
  const {
    title,
    image,
    company_name,
    employment_type,
    description,
    start_date,
    end_date,
    is_expired,
    work_history_id,
  } = props.data;
  const getDate = (date) => {
    const newDate = convertDateFormat(date);

    return `${newDate.month} ${newDate.year}`;
  };
  return (
    <ExperienctItemDiv>
      <div className='d-flex flex-row gap-2 position-relative'>
        <div>
          <ImageContainer image={image} />
        </div>
        <div>
          <Position>{title}</Position>
          <div className='d-flex '>
            <CompanyndType>{company_name}</CompanyndType>
            <CenterDot>
              <span></span>
            </CenterDot>
            <CompanyndType>{employment_type}</CompanyndType>
          </div>
          <div className='mt-1'>
            <Duration>{`${getDate(start_date)} - ${
              end_date ? getDate(end_date) : 'Present'
            }`}</Duration>
          </div>
          <div>
            <Description>{description}</Description>
          </div>
        </div>
        {props.itemEdit && (
          <div className='position-absolute end-0'>
            <EditBtutton
              onClick={(e) =>
                navigate(
                  `${
                    props.onAddNavigate ||
                    `/profile/${id}/details/experience/edit/${work_history_id}`
                  }`
                )
              }
            >
              <span className='me-1'>Edit</span>
              <span>
                <FontAwesomeIcon icon={faPen} />
              </span>
            </EditBtutton>
          </div>
        )}
      </div>
    </ExperienctItemDiv>
  );
}
const EditBtutton = styled.button`
  background-color: #f4f1f0;
  color: #3f464e;
  border: none;
  padding: 10px 10px;
  border-radius: 10px;
`;
const ExperienctItemDiv = styled.div`
  padding: 20px 0;
`;
const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  background-image: ${(props) =>
    props.image ? `url(${props.image})` : `url(${defaultCompanyImage})`};
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
  font-size: clamp(14px, 1vw, 16px);
  color: #3f464e;
`;
const Description = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(12px, 1vw, 14px);
  color: black;
`;
