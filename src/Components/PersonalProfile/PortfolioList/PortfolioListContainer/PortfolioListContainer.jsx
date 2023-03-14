import React from "react";
import PortfolioListView from "../PortfolioList";
import AddPortfolio from "../../AddPortfolio/AddPortfolio";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import ViewPortfolio from "../../ViewPortfolio/ViewPortfolio";
import EditPortfolio from "../../EditPortfolio/EditPortfolio";
import { Modal, Button } from "react-bootstrap";
function PortfolioListContainer(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const ModalData = (props) => {
    return (
      <Modal
        show={true}
        onHide={(e) => navigate(props.navigateTo)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="p-4">{props.children}</div>
        </Modal.Body>
      </Modal>
    );
  };
  return (
    <Routes>
      <Route
        path=""
        exact
        element={
          <PortfolioListView
            onAddNavigate={props.onAddNavigate}
            edit={props.edit}
          />
        }
      />

      <Route
        exact
        path="add"
        element={
          <ModalData navigateTo={`/profile/${id}/details/portfolio`}>
            <AddPortfolio navigateTo={`/profile/${id}/details/portfolio`} />
          </ModalData>
        }
      />
      <Route
        exact
        path="edit"
        element={
          <ModalData navigateTo={`/profile/${id}/details/portfolio`}>
            <EditPortfolio navigateTo={`/profile/${id}/details/portfolio`} />
          </ModalData>
        }
      />
      {/* <Route path=":portfolioId" element={<h2>portfolio</h2>} /> */}
      <Route
        path=":portfolioId"
        element={
          <PortfolioListView>
            <ModalData navigateTo={`/profile/${id}/details/portfolio`}>
              <ViewPortfolio />
            </ModalData>
          </PortfolioListView>
        }
      />
      <Route
        path=":portfolioId/edit"
        element={
          // <h2>tEST</h2>
          <PortfolioListView>
            <ModalData navigateTo={`/profile/${id}/details/portfolio`}>
              <EditPortfolio navigateTo={`/profile/${id}/details/portfolio`} />
            </ModalData>
          </PortfolioListView>
        }
      />
    </Routes>
  );
}

export default PortfolioListContainer;
