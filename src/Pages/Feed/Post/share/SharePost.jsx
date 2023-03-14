import React, { useState, useEffect } from 'react';
import './SharePost.scss';
import { Button, Modal, Placeholder } from 'react-bootstrap';
import PostUserImg from 'src/Assets/images/postUser.png';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { add } from '../../../../Services/AxiosConfig';
import { ViewPost } from '../view/ViewPost';
import * as Yup from 'yup';

const SharePost = ({ show, close, PostDetail, reloadPosting }) => {
  const userDeatil = {
    name: 'Joseph S. Gomez',
    img: PostUserImg,
    job: ' Robel LLC | Painting Service Provider',
  };
  const [uploadImage, setuploadImage] = useState(null);
  const [uploadImageUrl, setuploadImageUrl] = useState(null);

  const CreatePostHandler = async (values, setSubmitting) => {
    const createPostApi = add('user/add/post/', values)
      .then((rsp) => {
        reloadPosting();
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const CreatePostSchema = Yup.object().shape({
    post_description: Yup.string()
      .min(2, 'Too Short!')
      .max(700, 'Too Long!')
      .required('Required'),
  });
  return (
    <>
      <section>
        <Modal
          show={show}
          onHide={close}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Formik
            initialValues={{
              post_description: '',
              post_media: null,
              shared_post_id: PostDetail.post_id,
              post_tags: 'coupons',
              is_event: false,
            }}
            validationSchema={CreatePostSchema}
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
                  <Modal.Title>Share Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className='d-flex align-items-center'>
                    <div>
                      <img src={userDeatil.img} />
                    </div>
                    <div className='p-2'>
                      <div className=' fs-20  dt-c fw-bold'>
                        {userDeatil.name}
                      </div>
                      <div className='fs-14 dst-c '>{userDeatil.job}</div>
                    </div>
                  </div>
                  <div>
                    <textarea
                      name='post_description'
                      className='form-control border-0'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.post_description}
                      placeholder='Describe yourself here...'
                      rows={5}
                    ></textarea>
                    {errors.post_description &&
                      touched.post_description &&
                      errors.post_description}
                  </div>
                  <ViewPost postDetail={PostDetail} />

                  <hr />
                  <div className='d-flex justify-content-end align-items-center'>
                    <div>
                      <Button
                        variant='secondary'
                        type='submit'
                        disabled={isSubmitting}
                        onClick={close}
                      >
                        Share Post
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

export default SharePost;
