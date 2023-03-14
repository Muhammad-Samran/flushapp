import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "./UploadResumePopUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import AxiosConfig from "src/Services/AxiosConfig";
import DummyImage from "../../../Assets/images/upload.png";

function UploadResumePopUp(props) {
  const [tempLink, setTempLink] = useState();
  const [isPdf, setIsPdf] = useState();
  const [fileName, setFileName] = useState();
  const [uploadImage, setuploadImage] = useState(null);

  let imageLink;

  const onFileChange = async (e, setFieldValue) => {
    // console.log("image data", e.target.files[0]);
    setuploadImage(e.target.files[0]);
    let img_src = await URL.createObjectURL(e.target.files[0]);
    // console.log("img_src",img_src);
    setTempLink(img_src);
    setFileName(e.target.files[0].name);
    // console.log("include", e.target.files[0].name.includes(".pdf"));
    if (e.target.files[0].name.includes(".pdf")) {
      setIsPdf(true);
    } else {
      setIsPdf(false);
    }
  };
  const fileUploadAPI = async () => {
    try {
      // console.log("uploadImage", uploadImage);
      const submitImage = new FormData();
      submitImage.append("media_file", uploadImage);

      const { data } = await AxiosConfig.post(
        process.env.REACT_APP_FILE_UPLOAD,
        submitImage
      );
      imageLink = data.data.media_file;

      await applyAPI(imageLink)

      // console.log("this is return link of file", imageLink);
    } catch (error) {
      // console.log("error", error);
    }
  };
  const applyAPI = async (imageLink) => {
    try {
      // console.log("props.JobId",props.JobId)
      // console.log("imageLink",imageLink)
      const payload = {
        job_post: props.JobId,
        applicant_resume: imageLink
      }

      const { data } = await AxiosConfig.post("job/apply/service/", payload);

      // console.log("this is return", data);
      props.showToast(true, "applied");
      // await props.applyStatus(props.JobId)
      await props.getDetailAPIData(props.JobId)
    } catch (error) {
      console.log("error", error);
      props.showToast(false, "applied");
    }
  }

  return (
    <>
      <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton />

        <Modal.Body>
          <div className="upload-main">
            {/* <div className="upload-title"></div> */}
            <h2>
              are you sure to apply with default profile or want to upoad resume
            </h2>
            <i style={{ padding: "10px" }}>{tempLink ? fileName : null}</i>
            <div>
              {isPdf ? (
                <ProfileImage>
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    style={{
                      color: "#37d1aa",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </ProfileImage>
              ) : (
                <ProfileImage>
                  <img
                    style={{ objectFit: "cover" }}
                    src={tempLink ? tempLink : DummyImage}
                    width={100}
                    height={100}
                    alt="ll"
                  />
                </ProfileImage>
              )}

              <div className="upload-popup-buttons">
                <ImageUploadBtn>
                  Upload Resume
                  <input
                    style={{ objectFit: "cover" }}
                    className=""
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileChange(e)}
                  />
                </ImageUploadBtn>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <button
                  className="upload-btn"
                  onClick={async () => {
                    await fileUploadAPI();
                    await props.setShow(false);
                  }}
                >
                  <span>Continue</span>
                </button>
                </div>
              </div>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const ProfileImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  height: 100px;
  border-radius: 20px;
  overflow: hidden;
`;

const ImageUploadBtn = styled.button`

  background-color: #f4f1f0;
  margin-right: 20px;
  margin-top: 20px;
  color: #3f464e;
  border: none;
  padding: 10px 10px;
  border-radius: 10px;
  margin-left: 10px;
  top: -10px;
  cursor: pointer;
  position: relative;
`;

export default UploadResumePopUp;
