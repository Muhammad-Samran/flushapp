import React, {useState} from 'react';
import { Container} from 'react-bootstrap';
import data from "./demoGridData.json";
import Layout from 'src/Components/global/Dashboard/Layouts/Layout';
import CommunityCard from 'src/Components/global/CommunityCard/CommunityCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function CommunityPage({dataLimit = 12}) {

    const pages = Math.round(data.length / dataLimit);
    const [currentPage, setCurrentPage] = useState(1);
  
    function goToNextPage() {
      // console.log("total page Number", pages)
      // console.log("current page number", currentPage+1)
      if(currentPage+1 > pages) {
        return
      }
      else {
        setCurrentPage((page) => page + 1);
      }
    }
  
    function goToPreviousPage() {
      // console.log("current page on previous", currentPage-1)
      if(currentPage-1 == 0){
        return
      }
      else {
        setCurrentPage((page) => page - 1);
      }
    }
  
    function changePage(event) {
      const pageNumber = Number(event.target.text);
      // console.log("page Number", pageNumber)
      if(pageNumber){
          setCurrentPage(pageNumber);
      }
      else {
          return
      }
    }
  
    const getPaginatedData = () => {
      const startIndex = currentPage * dataLimit - dataLimit;
      const endIndex = startIndex + dataLimit;
      return data.slice(startIndex, endIndex);
    };

    return(
        <>
        <Layout type="leftsidebar">   
          <Container className='py-5'>
            <div className='com-top'>
              <div className="header-title marBot t-space">
                <span>Community</span>
              </div>
              <div className="add-com">
              <span style={{ marginRight: "10px" }} className='icon-circle'>
                        <FontAwesomeIcon 
                        icon={faPlus}
                        style={{ color: "#06C864" }}
                        />
                        </span>
                <span>Create Community</span>
              </div>
            </div>
            <CommunityCard
                pages={pages}
                currentPage={currentPage}
                changePage={changePage}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                getData={getPaginatedData()}
            />
          </Container>
        </Layout>
        </>
    )
}

export default CommunityPage