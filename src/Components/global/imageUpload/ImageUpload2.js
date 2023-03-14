import React, { useEffect, useState } from "react";
import FileUpload from "../../../Assets/images/auth/fileUpload.png";
import { FileUploadStyle, ProgressBar } from "./Style";
import axios from "axios";

const ImageUpload2 = ({ imgURL, setFieldValue, status = 0, text = 'Image' }) => {
  const [percentage, setPercentage] = useState(0);
  const baseURL = process.env.REACT_APP_API_URL;

  const uploadHandler2 = (e) => {
    setPercentage(0)
    let tempData = e.target.files[0];
    let data = new FormData();
    data.append("image_file", tempData);

    const config = () => {
      let config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);

          if (percent <= 100) {
            setPercentage(percent);
          }
        },
      };
      return config;
    };

    return axios
      .post(`${baseURL}core/user/upload/media/storage/`, data, config())
      .then((res) => {
        if(imgURL) {
          imgURL(res.data.profile_url.image_file);
        }
        if(setFieldValue) {
          setFieldValue(res.data.profile_url.image_file)
          // console.log("Upload2", res.data.profile_url.image_file);
        }
        return res.data;
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    setPercentage(status)
  }, [status])
  return (
    <>
      <FileUploadStyle />
      <div>
        <label htmlFor="fileUpload2" className="d-block">
          <div className="file-upload-2 text-center">
            <img
              src={FileUpload}
              alt="file upload"
              className="img-fluid pt-4"
            />
            <h3 className="secondary-font fs-16 c1 pt-3 px-4 mb-0">
              Upload your {text}
            </h3>
            <div className="w-25 mx-auto d-flex gap-2">
              <ProgressBar percentage={percentage} className="progress_bar">
                <div />
              </ProgressBar>
              {percentage}%
            </div>
          </div>
        </label>
        <input
          hidden
          id="fileUpload2"
          type="file"
          onChange={(e) => uploadHandler2(e)}
        />
      </div>
    </>
  );
};

export default ImageUpload2;
