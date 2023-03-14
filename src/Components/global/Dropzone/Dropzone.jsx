import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
export default function DropzoneUploader({ onUpload, onRemove }) {
  const getUploadParams = async ({ file, meta }) => {
    const body = new FormData();
    body.append("media_file", file);

    return {
      url: process.env.REACT_APP_FILE_UPLOAD,
      body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("rT")}`,
      },
    };
  };

  const handleChangeStatus = ({ meta, file, xhr }, status, files) => {
    // console.log(status, meta, file);
    // console.log(status);
    if (status === "removed") {
      onRemove(file);
    }
    //  console.log(status)
    if (status === "done") {
      // console.log("files===", files)
      const { media_file, resume_id } = JSON.parse(xhr.response).data;
      onUpload({ name: file.name, media_file, resume_id });
    }
  };

  const handleSubmit = (files, allFiles) => {
    // console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      axSize={2000000}
      styles={{
        submitButton: { display: "none" },
        inputLabel: {
          color: "#04d76a ",
        },
      }}
    />
  );
}
