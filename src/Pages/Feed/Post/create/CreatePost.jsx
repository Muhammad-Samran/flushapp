import React, { useState, useEffect } from "react";
import "./CreatePost.scss";
import { Button, Modal, Placeholder } from "react-bootstrap";
import PostUserImg from "src/Assets/images/postUser.png";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { add } from "../../../../Services/AxiosConfig";
const CreatePost = ({ show, close, reloadPosting }) => {
  const userDeatil = {
    name: "Joseph S. Gomez",
    img: PostUserImg,
    job: " Robel LLC | Painting Service Provider",
  };
  const [uploadImage, setuploadImage] = useState(null);
  const [uploadImageUrl, setuploadImageUrl] = useState(null);

  const CreatePostHandler = async (values, setSubmitting) => {
    let submitData = new FormData();
    submitData.append("media_file", uploadImage);
    const apiRsp = await add(process.env.REACT_APP_FILE_UPLOAD, submitData)
      .then((rsp) => {
        let media_link = rsp.data.data.media_file;
        let formikData = {
          ...values,
          post_media: media_link,
          post_tags: "6e94ecb0-7cc8-4575-8f83-0d6e7912fa88",
        };
        const createPostApi = add("user/add/post/", formikData)
          .then((rsp) => {
            setuploadImageUrl(null);
            reloadPosting();
          })
          .catch((err) => {
            // console.log(err);
          });
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <>
      <section>
        <Modal
          show={show}
          onHide={close}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Formik
            initialValues={{
              post_description: "",
              post_media: null,
              shared_post_id: null,
              post_tags: "coupons",
              is_event: false,
            }}
            validationSchema={""}
            onSubmit={(values, { setSubmitting }) => {
              CreatePostHandler(values, setSubmitting);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex align-items-center">
                    <div>
                      <img src={userDeatil.img} />
                    </div>
                    <div className="p-2">
                      <div className=" fs-20  dt-c fw-bold">
                        {userDeatil.name}
                      </div>
                      <div className="fs-14 dst-c ">{userDeatil.job}</div>
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="post_description"
                      className="form-control border-0"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.post_description}
                      placeholder="Describe yourself here..."
                      rows={5}
                    ></textarea>
                    {errors.post_description &&
                      touched.post_description &&
                      errors.post_description}
                  </div>
                  <div className="ImagePreview">
                    {uploadImageUrl && uploadImageUrl != "" && (
                      <img src={uploadImageUrl} className="img-fluid" />
                    )}
                  </div>

                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center flex-fill px-3">
                      <div className="pe-2 position-relative" title="Add Image">
                        <input
                          className=""
                          type="file"
                          id="formFile"
                          accept="image/*"
                          onChange={(e) => {
                            setuploadImage(e.target.files[0]);
                            setuploadImageUrl(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                        />
                        <FontAwesomeIcon icon={faImage} className="fs-30" />
                      </div>
                      <div className="pe-2 position-relative" title="Add Video">
                        <input
                          className=""
                          type="file"
                          id="formFile"
                          accept="video/*"
                        />
                        <FontAwesomeIcon
                          icon={faVideo}
                          className="fs-30"
                          // style={{
                          //   color: "#7fc15e",
                          // }}
                        />
                      </div>
                      <div className="pe-2" title="Add Discounts">
                        Discounts
                      </div>
                      <div className="pe-2" title="Add Coupons">
                        Coupons
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="secondary"
                        type="submit"
                        disabled={isSubmitting}
                        onClick={close}
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </form>
            )}
          </Formik>
        </Modal>
      </section>
    </>
  );
};

export default CreatePost;
