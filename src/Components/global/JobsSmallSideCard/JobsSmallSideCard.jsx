import React from "react";
import './JobsSmallSideCard.css'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function JobsSmallSideCard() {
    const navigate = useNavigate();

    const usePathname = () => {
        const location = useLocation();
        return location.pathname;
      }
    return(
        <>
        <div className="sidecard-main">
            <div className="sidecard-header">
                <h2>Jobs</h2>
            </div>
            <div className="sidecard-body">
                <span className="sidecard-span1" 
                style={{fontWeight: usePathname() === '/jobs'? 'bold':'normal', cursor: 'pointer'}}
                onClick={()=>{
                    navigate('/jobs')
                }}>All Jobs</span><br/>
                <span className="sidecard-span2"
                style={{fontWeight: usePathname() === '/jobs/saved'? 'bold':'normal', cursor: 'pointer'}}
                onClick={()=>{
                    navigate('/jobs/saved')
                }}>Saved</span><br/>
                <span className="sidecard-span3"
                style={{fontWeight: usePathname() === '/jobs/applied'? 'bold':'normal', cursor: 'pointer'}}
                onClick={()=>{
                    navigate('/jobs/applied')
                }}>Applied</span>
            </div>
        </div>
        </>
    )
}

export default JobsSmallSideCard