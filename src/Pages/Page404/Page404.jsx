import React from "react";
import { ReactComponent as Logo } from "src/Assets/svg/logo.svg";
import { ReactComponent as Image404 } from "src/Assets/svg/404.svg";
import "./Page404.scss";
import { Link, useNavigate } from "react-router-dom";

const Page404 = ({ auth }) => {
  const history = useNavigate();
  return (
    <div className="page-404">
      <div className="text-center mt-5">
        <Logo className="mt-5" />
        <h1 className="c2 primary-font oops my-2">oops!!</h1>
        <p className="c3 secondary-font fs-24 mb-5">
          your required page not found
        </p>
        <Image404 />
        <div className="actions d-flex align-items-center justify-content-center gap-3 mt-5">
          {auth && (
            <span
              to="/"
              className="back pe-pointer secondary-font-medium fs-18 c1 px-3 py-2"
              onClick={() => history(-1)}
            >
              Back
            </span>
          )}
          <Link
            to="/"
            className="btn-green2 secondary-font-medium fs-18 text-white h-auto w-auto px-4 py-2"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
