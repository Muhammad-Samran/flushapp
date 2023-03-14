import React from "react";
import Layout from "../../Components/global/Dashboard/Layouts/Layout";
import Loader from "../../Components/UI/Loader/Loader";
import ServicesList from "./ServicesList";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ServicesResult from "./ServicesResult/ServicesResultContainer";
import ContactForBooking from "./ContactForBooking/ContactForBooking";
import ManageBookings from "./ManageServiceBookings/ManageBookings/ManageBookingsContainer";
import ManageServices from "./ManageServiceBookings/ManageServices";
import ServicesDetailPage from "../ServicesDetailPage/ServicesDetailPage";
import ArchiveService from "./ArchiveServices/ArchiveService";
import BookedServices from "./BookedServices/BookedServices";
function ServicesRouter() {
  const { authorizing, isAuthorized } = useSelector((state) => state.auth);
  if (authorizing) {
    return <Loader />;
  }
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout type="leftsidebar">
      <Routes>
        <Route path="/" element={<ServicesList />} />
        <Route path="/:serviceCategoryId" element={<ServicesResult />} />
        <Route path="/:serviceId/booking" element={<ContactForBooking />} />
        <Route path="/:serviceId/detail" element={<ServicesDetailPage />} />
        {/* Route for Managing Services */}
        <Route path="/manage" element={<ManageServices />} />

        {/* Route for Archive Services */}
        <Route path="/archive" element={<ArchiveService />} />
        
        {/* Route for Booked Services */}
        <Route path="/booked" element={<BookedServices />} />

        {/* Route for Managing  */}
        <Route
          path="/bookings/manage/:serviceId"
          element={<ManageBookings />}
        />
      </Routes>
    </Layout>
  );
}

export default ServicesRouter;
