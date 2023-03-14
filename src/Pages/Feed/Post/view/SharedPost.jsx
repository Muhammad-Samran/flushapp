import React, { useState } from 'react';
import './ViewPost.scss';
import PostUserImg from 'src/Assets/images/postUser.png';
import PostImg from 'src/Assets/images/post.jpg';
import HeartSvg from 'src/Assets/svg/heart.svg';
import CommentSvg from 'src/Assets/svg/comment.svg';
import JustShareSvg from 'src/Assets/svg/justShare.svg';
import HeartFillSvg from 'src/Assets/svg/heartFill.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TimeAgo from 'react-timeago';
import { Formik } from 'formik';
import { abbreviateNumber } from 'js-abbreviation-number';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import {
  faCalendarDay,
  faCommentDots,
  faEllipsis,
  faImage,
  faShare,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { add, view } from '../../../../Services/AxiosConfig';
import SharePost from '../share/SharePost';
export const SharedPost = ({ postDetail, reloadPosting }) => {
  // SharePost  Model
  const [showShareModel, setShowShareModel] = useState(false);
  const shareModelHandleClose = () => setShowShareModel(false);

  const shareModelHandleShow = () => {
    // console.log('i am  open ');
    setShowShareModel(true);
  };

  const [isLikedByMe, setIsLikedByMe] = useState(
    postDetail?.is_liked ? postDetail.is_liked : false
  );
  const [totalLikes, setTotalLikes] = useState(postDetail.post_likes);
  const [totalComments, setTotalComments] = useState(postDetail.no_of_comments);
  const [commentListing, setCommentListing] = useState(null);
  const [createComment, setCreateComment] = useState(false);
  function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }
  const CreateCommentSchema = Yup.object().shape({
    comment_text: Yup.string()
      .min(2, 'Too Short!')
      .max(700, 'Too Long!')
      .required('Required')
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        'Invlaid Comment'
      ),
  });
  const getCommentListing = async () => {
    const createPostApi = await view(
      'user/commentlist/?post_id=' + postDetail.post_id
    )
      .then((rsp) => {
        // console.log('Commment Listing', rsp.data);
        setCommentListing(rsp.data.data.comments_list);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const CreateCommentHandler = async (values, setSubmitting) => {
    const createPostApi = await add(
      'user/followers/post/list/view/0/5/',
      values
    )
      .then((rsp) => {
        // console.log('Comment  Post', rsp);
        setTotalComments(rsp.data.data.No_of_comments);
        setCommentListing(rsp.data.data.comments_list);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <>
      <section>
        <SharePost
          show={showShareModel}
          close={shareModelHandleClose}
          PostDetail={postDetail}
          reloadPosting={reloadPosting}
        />
        <div className='db_color'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
              <div className='p-2'>
                <img
                  src={
                    validateUrl(postDetail.user_profile.profile_photo)
                      ? postDetail.user_profile.profile_photo
                      : PostUserImg
                  }
                  width='50'
                  height='50'
                />{' '}
              </div>
              <div className='p-2 '>
                <div className=' fs-18 pirmary-font t-c fw-bold '>
                  {postDetail.user_profile.first_name}{' '}
                  {postDetail.user_profile.last_name}
                </div>
                <div className=' fs-14 dt-c  '>
                  {postDetail.user_profile.job_title} |{' '}
                  {postDetail.user_profile.company_name}
                  Provider
                </div>
                <div className=' fs-14 dt-c  '>
                  Posted <TimeAgo date={postDetail.create_ts} />
                </div>
              </div>
            </div>
            <div className='d-flex align-items-center pe-2'>
              <div className='px-2'>
                <span className='PostStatus fs-12 navLink px-2 py-1 fw-bold'>
                  Shared
                </span>
              </div>
              <div className='px-2'>
                {' '}
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>
          </div>
          <div className='fs-16 dt-c px-4 py-2'>
            {postDetail.post_description}
          </div>
          <div className='px-4'>
            <hr />
          </div>
          <div className='px-2'>
            <div className='SharedContainer'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                  <div className='p-2'>
                    <img
                      src={
                        validateUrl(
                          postDetail.shared_post_profile.profile_photo
                        )
                          ? postDetail.shared_post_profile.profile_photo
                          : PostUserImg
                      }
                      width='40'
                      height='40'
                    />{' '}
                  </div>
                  <div className='p-2 '>
                    <div className=' fs-18 pirmary-font t-c fw-bold '>
                      {postDetail.shared_post_profile.first_name}{' '}
                      {postDetail.shared_post_profile.last_name}
                    </div>
                    <div className=' fs-14 dt-c  '>
                      {postDetail.shared_post_profile.job_title} |{' '}
                      {postDetail.shared_post_profile.company_name}
                      Provider
                    </div>
                    <div className=' fs-14 dt-c  '>
                      Posted <TimeAgo date={postDetail.create_ts} />
                    </div>
                  </div>
                </div>
                <div className='d-flex align-items-center pe-2'></div>
              </div>
              <div className='fs-16 dt-c p-2'>
                {postDetail.shared_post_data.post_description}
              </div>
              <div className='text-center'>
                <img
                  src={
                    validateUrl(postDetail.post_media)
                      ? postDetail.post_media
                      : PostImg
                  }
                  className='img-fluid'
                />{' '}
                {/* <img src={PostImg} className="img-fluid" /> */}
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-between p-2 fs-14 dt-c'>
            <div>
              {' '}
              {totalLikes > 0 && (
                <> {abbreviateNumber(totalLikes, 1)} like</>
              )}{' '}
            </div>
            <div>
              {totalComments > 0 && (
                <>{abbreviateNumber(totalComments, 1)} comment</>
              )}
            </div>
          </div>
          <div className='d-flex align-items-center justify-content-between px-4 pt-2 pb-3'>
            <div className='d-flex align-items-center '>
              <div
                onClick={(e) => {
                  const createPostApi = add('like/user/post/', {
                    user_post: postDetail.post_id,
                    is_liked: !isLikedByMe,
                  })
                    .then((rsp) => {
                      setTotalLikes(rsp.data.data.post_likes);
                      // console.log(rsp.data.data.post_likes, 'ewrty =sdfgdsfg');
                      setIsLikedByMe(!isLikedByMe);
                    })
                    .catch((err) => {
                      // console.log(err);
                    });
                }}
              >
                {isLikedByMe ? (
                  <img src={HeartFillSvg} width='24' height='21' />
                ) : (
                  <img src={HeartSvg} width='24' height='21' />
                )}
              </div>
              <div className='px-2 fs-18 h-c'>Like</div>
            </div>
            <div
              className='d-flex align-items-center '
              onClick={(e) => {
                getCommentListing();
                setCreateComment(!createComment);
              }}
            >
              <div>
                <img src={CommentSvg} width='24' height='21' />
              </div>
              <div className='px-2 fs-18 h-c'>Comments</div>
            </div>
            <div
              className='d-flex align-items-center '
              onClick={(e) => {
                setShowShareModel(!showShareModel);
              }}
            >
              <div>
                <img src={JustShareSvg} width='24' height='21' />
              </div>
              <div className='px-2 fs-18 h-c'>Share</div>
            </div>
          </div>
          {createComment && (
            <div classame='px-4 pt-2 pb-3'>
              <hr></hr>
              <p className='fs-14 dt-c p-2 fw-bold'>Commments</p>
              {commentListing &&
                commentListing.map((comment, index) => {
                  return (
                    <div className='d-flex ' key={index}>
                      <div className='p-2'>
                        <img
                          src={
                            validateUrl(
                              comment.commented_by_profile.profile_photo
                            )
                              ? comment.commented_by_profile.profile_photo
                              : PostUserImg
                          }
                          width='50'
                          height='50'
                        />
                      </div>
                      <div className='p-2 flex-fill'>
                        <div className='p-2 commentBg'>
                          <div className=' fs-18 pirmary-font t-c fw-bold '>
                            {comment.commented_by_profile.first_name}{' '}
                            {comment.commented_by_profile.last_name}
                          </div>
                          <div className=' fs-14 dt-c  '>
                            {comment.commented_by_profile.job_title} |{' '}
                            {comment.commented_by_profile.company_name}
                            Provider
                          </div>
                          <div className=' fs-14 dt-c  '>
                            Posted <TimeAgo date={comment.comment_timestamp} />
                          </div>
                          <div className='comment_description fs-16 dt-c pt-3 pe-3'>
                            {comment.comment_text} ...
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <Formik
                initialValues={{
                  comment_text: '',
                  post_id: postDetail.post_id,
                }}
                validationSchema={CreateCommentSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  CreateCommentHandler(values, setSubmitting);
                  resetForm({});
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
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className='px-2'>
                      <div className='py-2'>
                        <label>Your Comment</label>
                        <input
                          id='comment_text'
                          name='comment_text'
                          type='comment_text'
                          className='form-control'
                          onChange={handleChange}
                          value={values.comment_text}
                        />
                        <p className='ErrorMessage fs-14 '>
                          {errors.comment_text &&
                            touched.comment_text &&
                            errors.comment_text}
                        </p>
                      </div>
                      <div>
                        <Button
                          variant='secondary'
                          type='submit'
                          disabled={isSubmitting}
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
