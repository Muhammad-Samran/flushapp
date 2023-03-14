import React, { useState, useRef, useCallback } from "react";
import "./Feed.scss";
import PostUserImg from "src/Assets/images/postUser.png";
import Layout from "src/Components/global/Dashboard/Layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faImage,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { ViewPost } from "./Post/view/ViewPost";
import { SharedPost } from "./Post/view/SharedPost";
import CreatePost from "./Post/create/CreatePost";
import useGetPost from "../../Hook/useGetPost";
import { Loading } from "src/Components/global/Loading/Loading";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
const Feed = () => {
  const [showCreateModel, setShowCreateModel] = useState(false);
  const createModelHandleClose = () => setShowCreateModel(false);

  const createModelHandleShow = () => {
    // console.log('i am  open ');
    setShowCreateModel(true);
  };
  const { authorizing, isAuthorized, userId } = useSelector(
    (state) => state.auth
  );

  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(5);
  const [resetPost, setResetPost] = useState(false);
  const { posts, hasMore, loading, error } = useGetPost(
    startPage,
    endPage,
    resetPost
  );
  const observer = useRef();
  const reloadPostListing = () => {
    setResetPost(true);
    setResetPost(false);
  };
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !(endPage > hasMore)) {
          setStartPage(endPage);
          setEndPage((prevEndPage) => prevEndPage + 5);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  if (authorizing) {
    return (
      // <Layout>
      <div className="d-flex justify-content-center vh-100 align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
      // </Layout>
    );
  }
  return (
    <>
      <Layout type="bothsidebar">
        <CreatePost
          show={showCreateModel}
          close={createModelHandleClose}
          reloadPosting={reloadPostListing}
        />
        <section className="">
          <div className="CreatePost db_color">
            <div className="d-flex align-items-center">
              <div className="p-2">
                <img src={PostUserImg} width="50" height="50" />
              </div>
              <div className="p-2 flex-fill">
                <div
                  className="db_color fs-18 t-c p-2  "
                  onClick={createModelHandleShow}
                >
                  Your thoughts with flush
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center px-4 py-2">
              <div className="d-flex align-items-center">
                <div>
                  <FontAwesomeIcon
                    icon={faImage}
                    className="fs-30"
                    style={{
                      color: "#70b5f9",
                    }}
                  />
                </div>
                <div className="px-3">Photo</div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <FontAwesomeIcon
                    icon={faVideo}
                    className="fs-30"
                    style={{
                      color: "#7fc15e",
                    }}
                  />
                </div>
                <div className="px-3">Video</div>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    className="fs-30"
                    style={{
                      color: "#e7a33e",
                    }}
                  />
                </div>
                <div className="px-3">Event</div>
              </div>
            </div>
          </div>
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              if (post?.shared_post_id != null)
                return (
                  <div ref={lastPostElementRef} key={index}>
                    <SharedPost
                      postDetail={post}
                      reloadPosting={reloadPostListing}
                    />
                  </div>
                );
              return (
                <div ref={lastPostElementRef} key={index}>
                  <ViewPost
                    postDetail={post}
                    reloadPosting={reloadPostListing}
                  />
                </div>
              );
            } else {
              if (post?.shared_post_id != null)
                return (
                  <SharedPost
                    postDetail={post}
                    key={index}
                    reloadPosting={reloadPostListing}
                  />
                );
              return (
                <ViewPost
                  key={index}
                  postDetail={post}
                  reloadPosting={reloadPostListing}
                />
              );
            }
          })}
          <div>{loading && <Loading />}</div>
          <div>{error && "Error"}</div>
        </section>
      </Layout>
    </>
  );
};
export default Feed;
