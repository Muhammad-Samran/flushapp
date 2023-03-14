import React from "react";
import ServiceResultUI from "./ServiceResultUI";
import useData from "src/Hook/useData";
import { useParams } from "react-router-dom";
import Loader from "src/Components/UI/Loader/Loader";
function ServiceResultContainer() {
  const { serviceCategoryId } = useParams();
  const [loading, services] = useData(
    `search/service/services?service_category_id=${serviceCategoryId}&`
  );
  if (loading) {
    return <Loader />;
  }
  // console.log(services);
  if (services && services.success === true) {
    if (services.data && services.data.length > 0) {
      return <ServiceResultUI services={services.data} />;
    } else {
      return (
        <div style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          border:"1px solid #E1E1E1",
          borderRadius:"10px",
          height:"100px",
          marginTop:"10px"
        }}>
          <h2>No Services Found</h2>
        </div>
        
      )
    }
  } else {
    return <></>;
  }
}

export default ServiceResultContainer;
