import React from 'react';
import JobCard from './JobCard';

const JobList = (props) => {
    return(
        <div className="card-container">
            {
                props.jobs.map((book, i) => {
                    return <JobCard key={i} />
                })
            }

        </div>
    )
}

export default JobList