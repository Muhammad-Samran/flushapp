import React, {useState} from 'react';
import { Container, Form,Row,Col } from 'react-bootstrap';
import TrendingBusinessesCard from 'src/Components/global/TrendingBusinessesCard/TrendingBusinessesCard';
import data from "./demoGridData.json";
import Select from 'react-select';
import Layout from 'src/Components/global/Dashboard/Layouts/Layout';

const Rating = [
    { value: 'full_time', label: '4 star' },
    { value: 'part_time', label: '5 star' },
  ]
  const Distance = [
    { value: 'less_then_year', label: 'Less then a KM' },
    { value: 'between', label: 'Between 1 to 3 KM' },
    { value: 'greater', label: 'More than 3 KM' }
  ]
  const Size = [
    { value: 'today', label: 'Short term' },
    { value: 'yesturday', label: 'Long term' },
  ]
  const customStyles = {
    dropdownIndicator: base => ({
      ...base,
      color: "#06C864" // Custom colour
    })
  };

function TrendingBusinessesPage({dataLimit = 12}) {

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
      if(currentPage-1 === 0){
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
        <div className="header-title marBot t-space">
                <span>Trending Businesses</span>
            </div>
        <div className="Filter t-m-b">
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    
                    <div className="label t-space">
                        <span>Filter by:</span>
                    </div>
                    <div className="fields">
                    <Row>
                    <Col lg={4} md={6}>
                        <Select styles={customStyles} components={{ IndicatorSeparator:() => null }} options={Rating} placeholder="Rating"/>
                    </Col>
                    <Col lg={4} md={6}>
                        <Select styles={customStyles} components={{ IndicatorSeparator:() => null }} options={Distance} placeholder="Distance"/>
                    </Col>
                    <Col lg={4} md={6}>
                        <Select styles={customStyles} components={{ IndicatorSeparator:() => null }} options={Size} placeholder="Size of Job"/>
                    </Col>
                    </Row>
                    </div>

                
            </Form.Group>
            </Form>
          </div>
            

                <TrendingBusinessesCard
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

export default TrendingBusinessesPage